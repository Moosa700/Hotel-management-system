import {
  LayoutDashboard,
  BedDouble,
  CalendarDays,
  Users,
  UserCog,
  Settings,
  CreditCard,
  Wrench,
  ClipboardList,
  LogOut,
  LogIn,
  BarChart3,
  MessageSquare,
  ConciergeBell,
} from "lucide-react";

import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard/admin",
    roles: ["admin"],
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard/staff",
    roles: ["staff"],
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard/user",
    roles: ["user"],
  },

  {
    title: "Rooms",
    icon: BedDouble,
    to: "/dashboard/admin/rooms",
    roles: ["admin"],
  },
  {
    title: "Bookings",
    icon: CalendarDays,
    to: "/dashboard/admin/bookings",
    roles: ["admin"],
  },
  {
    title: "Guests",
    icon: Users,
    to: "/dashboard/admin/guests",
    roles: ["admin"],
  },
  {
    title: "Guests",
    icon: Users,
    to: "/dashboard/staff/guests",
    roles: ["staff"],
  },
  {
    title: "Staff",
    icon: UserCog,
    to: "/dashboard/admin/staff",
    roles: ["admin"],
  },
  {
    title: "Users",
    icon: UserCog,
    to: "/dashboard/admin/users",
    roles: ["admin"],
  },
  {
    title: "Reports",
    icon: BarChart3,
    to: "/dashboard/admin/reports",
    roles: ["admin"],
  },
  {
    title: "Feedback",
    icon: MessageSquare,
    to: "/dashboard/admin/feedback",
    roles: ["admin"],
  },
  {
    title: "Arrivals",
    icon: LogIn,
    to: "/dashboard/staff/checkin",
    roles: ["staff"],
  },
  {
    title: "Departures",
    icon: LogOut,
    to: "/dashboard/staff/checkout",
    roles: ["staff"],
  },
  {
    title: "Housekeeping",
    icon: ClipboardList,
    to: "/dashboard/staff/housekeeping",
    roles: ["staff"],
  },
  {
    title: "Maintenance",
    icon: Wrench,
    to: "/dashboard/staff/maintenance",
    roles: ["staff"],
  },
  {
    title: "Payments",
    icon: CreditCard,
    to: "/dashboard/admin/payments",
    roles: ["admin"],
  },
  {
    title: "Settings",
    icon: Settings,
    to: "/dashboard/admin/settings",
    roles: ["admin"],
  },
  {
    title: "Booking History",
    icon: CalendarDays,
    to: "/dashboard/user/bookings",
    roles: ["user"],
  },
  {
    title: "Upcoming",
    icon: CalendarDays,
    to: "/dashboard/user/upcoming",
    roles: ["user"],
  },
  {
    title: "Profile",
    icon: Users,
    to: "/dashboard/user/profile",
    roles: ["user"],
  },
  {
    title: "Invoices",
    icon: CreditCard,
    to: "/dashboard/user/invoices",
    roles: ["user"],
  },
  {
    title: "Services",
    icon: ConciergeBell,
    to: "/dashboard/user/services",
    roles: ["user"],
  },
];

export default function DashboardSidebar() {
  const location = useLocation();

  const { user, logoutUser } = useAuth();
  const currentRole = user?.role === "customer"
    ? "user"
    : ["manager", "receptionist", "housekeeping"].includes(user?.role)
      ? "staff"
      : user?.role;

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className="hidden h-screen w-72 bg-slate-900 text-white lg:flex lg:flex-col">
      <div className="border-b border-slate-700 p-8">
        <h1 className="text-3xl font-bold">LuxuryStay</h1>

        <p className="mt-2 text-sm text-slate-400">
          Hotel Management
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-5">
        {menu
          .filter((item) => item.roles.includes(currentRole))
          .map((item) => {
            const Icon = item.icon;

            const active = location.pathname === item.to;

            return (
              <Link
                key={item.title + item.to}
                to={item.to}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 transition ${
                  active
                    ? "bg-primary text-white"
                    : "hover:bg-slate-800"
                }`}
              >
                <Icon size={22} />
                {item.title}
              </Link>
            );
          })}
      </nav>

      <div className="border-t border-slate-700 p-5">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-xl bg-red-600 px-5 py-4 text-white transition hover:bg-red-700"
        >
          <LogOut size={22} />
          Logout
        </button>
      </div>
    </aside>
  );
}