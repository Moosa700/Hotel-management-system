import { useEffect, useState } from "react";
import { Search, ShieldCheck, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { changeUserRole, getUsers, toggleUserStatus } from "@/services/user.service";

const availableRoles = ["admin", "manager", "receptionist", "housekeeping", "staff", "customer"];

function parseUsers(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

export default function UsersManagement() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setUsers(parseUsers(await getUsers()));
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load user accounts.");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const activeCount = users.filter((item) => item.isActive !== false).length;
  const adminCount = users.filter((item) => item.role === "admin" && item.isActive !== false).length;
  const currentUserId = currentUser?._id || currentUser?.id;
  const visibleUsers = users.filter((item) => {
    const matchesRole = roleFilter === "all" || item.role === roleFilter;
    const matchesQuery = `${item.name} ${item.email} ${item.role}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesRole && matchesQuery;
  });

  async function changeRole(item, role) {
    setBusyId(item._id);
    setError("");
    setNotice("");
    try {
      const updated = await changeUserRole(item._id, role);
      setUsers((current) => current.map((user) => user._id === item._id ? { ...user, ...updated } : user));
      setNotice(`${item.name}'s role was updated.`);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to change user role.");
    } finally {
      setBusyId("");
    }
  }

  async function toggleStatus(item) {
    setBusyId(item._id);
    setError("");
    setNotice("");
    try {
      const updated = await toggleUserStatus(item._id);
      setUsers((current) => current.map((user) => user._id === item._id ? { ...user, ...updated } : user));
      setNotice(`${item.name}'s account is now ${updated.isActive ? "active" : "inactive"}.`);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update account status.");
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="min-w-0 space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">Access control</p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">Users & permissions</h1>
        <p className="mt-2 text-sm text-gray-600">Assign the least-privilege role each account needs.</p>
      </header>

      {notice && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800" role="status">{notice}</p>}
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

      <section className="grid gap-4 sm:grid-cols-3" aria-label="User summary">
        <div className="rounded-xl border border-gray-200 bg-white p-4"><Users className="mb-3 text-sky-700" size={25} /><p className="text-sm text-gray-500">All accounts</p><p className="mt-1 text-2xl font-semibold">{users.length}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><ShieldCheck className="mb-3 text-emerald-700" size={25} /><p className="text-sm text-gray-500">Active accounts</p><p className="mt-1 text-2xl font-semibold">{activeCount}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><ShieldCheck className="mb-3 text-amber-600" size={25} /><p className="text-sm text-gray-500">Active admins</p><p className="mt-1 text-2xl font-semibold">{adminCount}</p></div>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div><h2 className="font-semibold text-gray-900">Accounts</h2><p className="mt-1 text-sm text-gray-500">{visibleUsers.length} users</p></div>
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_170px]">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} /><input type="search" aria-label="Search users" placeholder="Search name or email" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm" /></div>
            <select aria-label="Filter users by role" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="all">All roles</option>{availableRoles.map((role) => <option key={role} value={role}>{role}</option>)}</select>
          </div>
        </div>
        {loading ? <p className="p-6 text-sm text-gray-600" role="status">Loading users...</p> : visibleUsers.length === 0 ? (
          <div className="px-5 py-12 text-center"><p className="font-medium text-gray-800">No users found</p><p className="mt-1 text-sm text-gray-500">Try another search or role filter.</p></div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full min-w-160 text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-4 py-3 font-medium">User</th><th className="px-4 py-3 font-medium">Role</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Created</th><th className="px-4 py-3 font-medium">Actions</th></tr></thead>
            <tbody>{visibleUsers.map((item) => {
              const isCurrent = item._id === currentUserId || item.id === currentUserId;
              const isLastAdmin = item.role === "admin" && item.isActive !== false && adminCount <= 1;
              return <tr key={item._id || item.id} className="border-t border-gray-100">
                <td className="px-4 py-4"><p className="font-medium text-gray-900">{item.name}</p><p className="mt-1 text-xs text-gray-500">{item.email}</p></td>
                <td className="px-4 py-4"><select aria-label={`Role for ${item.name}`} disabled={busyId === item._id || (item.role === "admin" && isLastAdmin)} value={item.role} onChange={(event) => changeRole(item, event.target.value)} className="rounded-lg border border-gray-300 px-2 py-2 text-xs">{availableRoles.map((role) => <option key={role} value={role}>{role}</option>)}</select></td>
                <td className="px-4 py-4 text-gray-600">{item.isActive === false ? "Inactive" : "Active"}</td>
                <td className="px-4 py-4 text-gray-600">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—"}</td>
                <td className="px-4 py-4"><button type="button" disabled={busyId === item._id || isCurrent || isLastAdmin} onClick={() => toggleStatus(item)} className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-50">{item.isActive === false ? "Activate" : "Deactivate"}</button></td>
              </tr>;
            })}</tbody>
          </table></div>
        )}
      </section>
    </div>
  );
}