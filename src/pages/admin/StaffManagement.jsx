import { useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { addStaff, getStaff, updateStaff } from "@/services/staff.service";

const roles = ["manager", "receptionist", "housekeeping", "staff"];
const initialForm = { name: "", email: "", password: "", phone: "", role: "receptionist" };

function parseStaff(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    async function loadStaff() {
      try {
        setStaff(parseStaff(await getStaff()));
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load staff profiles.");
      } finally {
        setLoading(false);
      }
    }

    loadStaff();
  }, []);

  const activeStaff = staff.filter((member) => member.isActive !== false);
  const visibleStaff = staff.filter((member) =>
    `${member.name} ${member.email} ${member.role}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  async function submitStaff(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const created = await addStaff(form);
      const member = created?.data ?? created;
      setStaff((current) => [member, ...current]);
      setForm(initialForm);
      setShowForm(false);
      setNotice(`${member.name} was added to staff.`);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to create staff account.");
    } finally {
      setSaving(false);
    }
  }

  async function updateMember(member, updates) {
    setError("");
    setNotice("");
    try {
      const response = await updateStaff(member._id, updates);
      const updated = response?.data ?? response;
      setStaff((current) => current.map((item) => item._id === member._id ? { ...item, ...updated } : item));
      setNotice(`${member.name}'s staff profile was updated.`);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update staff profile.");
    }
  }

  return (
    <div className="min-w-0 space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">People</p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">Staff profiles</h1>
          <p className="mt-2 text-sm text-gray-600">Manage staff accounts and access levels.</p>
        </div>
        <button type="button" onClick={() => { setShowForm(!showForm); setError(""); setNotice(""); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0F3D3E] px-4 py-2 text-sm font-semibold text-white">
          {showForm ? <X size={17} /> : <Plus size={17} />}{showForm ? "Close form" : "Add staff"}
        </button>
      </header>

      {notice && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800" role="status">{notice}</p>}
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

      {showForm && (
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 font-semibold text-gray-900">New staff account</h2>
          <form onSubmit={submitStaff} className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Full name<input required name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Email<input required type="email" name="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Temporary password<input required type="password" name="password" autoComplete="new-password" minLength="8" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Phone<input type="tel" name="phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Access level<select name="role" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal">{roles.map((role) => <option key={role} value={role}>{role[0].toUpperCase() + role.slice(1)}</option>)}</select></label>
            <div className="flex items-end"><button type="submit" disabled={saving} className="min-h-11 rounded-lg bg-[#0F3D3E] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Creating..." : "Create account"}</button></div>
          </form>
        </section>
      )}

      <section className="grid gap-4 sm:grid-cols-2" aria-label="Staff summary">
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Total staff</p><p className="mt-1 text-2xl font-semibold">{staff.length}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Active accounts</p><p className="mt-1 text-2xl font-semibold">{activeStaff.length}</p></div>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div><h2 className="font-semibold text-gray-900">Team members</h2><p className="mt-1 text-sm text-gray-500">{visibleStaff.length} profiles</p></div>
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} /><input type="search" aria-label="Search staff" placeholder="Search name or role" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm sm:w-72" /></div>
        </div>
        {loading ? <p className="p-6 text-sm text-gray-600" role="status">Loading staff...</p> : visibleStaff.length === 0 ? (
          <div className="px-5 py-12 text-center"><p className="font-medium text-gray-800">No staff profiles</p><p className="mt-1 text-sm text-gray-500">Create an account to give a team member access.</p></div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full min-w-140 text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-4 py-3 font-medium">Name</th><th className="px-4 py-3 font-medium">Contact</th><th className="px-4 py-3 font-medium">Access</th><th className="px-4 py-3 font-medium">Account</th><th className="px-4 py-3 font-medium">Actions</th></tr></thead>
            <tbody>{visibleStaff.map((member) => (
              <tr key={member._id} className="border-t border-gray-100">
                <td className="px-4 py-4 font-medium text-gray-900">{member.name}</td>
                <td className="px-4 py-4 text-gray-600"><p>{member.email}</p><p className="mt-1 text-xs">{member.phone || "No phone"}</p></td>
                <td className="px-4 py-4"><select aria-label={`Access level for ${member.name}`} value={member.role} onChange={(event) => updateMember(member, { role: event.target.value })} className="rounded-lg border border-gray-300 px-2 py-2 text-xs">{roles.map((role) => <option key={role} value={role}>{role}</option>)}</select></td>
                <td className="px-4 py-4 text-gray-600">{member.isActive === false ? "Inactive" : "Active"}</td>
                <td className="px-4 py-4"><button type="button" onClick={() => updateMember(member, { isActive: member.isActive === false })} className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700">{member.isActive === false ? "Activate" : "Deactivate"}</button></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </section>
    </div>
  );
}