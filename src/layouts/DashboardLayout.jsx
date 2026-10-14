import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="flex min-h-screen min-w-0 bg-slate-100">

      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col">

        <DashboardNavbar />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}