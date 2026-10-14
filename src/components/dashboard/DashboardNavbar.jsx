import { useAuth } from "@/hooks/useAuth";
import {
  Bell,
  Search,
  UserCircle2,
} from "lucide-react";

export default function DashboardNavbar() {
  const { user } = useAuth();

  return (
    <header className="flex min-h-16 items-center justify-between gap-3 border-b bg-white px-4 py-3 sm:h-20 sm:px-6 lg:px-8">

      <div className="relative min-w-0 flex-1 sm:max-w-80">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          placeholder="Search..."
          className="w-full min-w-0 rounded-lg border py-2.5 pl-10 pr-2 text-sm sm:rounded-xl sm:py-3 sm:pl-11 sm:pr-4 sm:text-base"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-5">

        <button className="shrink-0 rounded-lg bg-gray-100 p-2 sm:rounded-xl sm:p-3" type="button" aria-label="Notifications">
          <Bell size={20} />
        </button>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">

          <UserCircle2
            size={32}
            className="shrink-0 text-primary sm:h-10.5 sm:w-10.5"
          />

          <div className="min-w-0">
            <h4 className="max-w-20 truncate text-sm font-semibold sm:max-w-none sm:text-base">
              {user?.name || "User"}
            </h4>

            <p className="text-xs capitalize text-gray-500 sm:text-sm">
              {user?.role || "Guest"}
            </p>
          </div>

        </div>

      </div>
    </header>
  );
}