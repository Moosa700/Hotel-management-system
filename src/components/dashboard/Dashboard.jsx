import { useAuth } from "@/hooks/useAuth";

import AdminDashboard from "./AdminDashboard";
import StaffDashboard from "./StaffDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  switch (user?.role) {
    case "admin":
      return <AdminDashboard />;

    case "staff":
      return <StaffDashboard />;

    default:
      return <UserDashboard />;
  }
}