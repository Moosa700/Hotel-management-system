import { Navigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export default function RoleRoute({
  children,
  roles = [],
  role,
}) {
  const { user, loading } = useAuth();
  const allowedRoles = roles.length ? roles : role ? [role] : [];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const userRole = user.role === "customer"
    ? "user"
    : ["manager", "receptionist", "housekeeping"].includes(user.role)
      ? "staff"
      : user.role;

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
}