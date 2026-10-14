import { Outlet } from "@tanstack/react-router";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <DashboardSidebar />

      <div className="flex flex-1 flex-col">

        <DashboardNavbar />

        <main className="flex-1 p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}