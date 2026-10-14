import {
  BedDouble,
  CalendarDays,
  DollarSign,
  Users,
} from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import OccupancyChart from "@/components/dashboard/OccupancyChart";
import RecentBookings from "@/components/dashboard/RecentBookings";
import NotificationPanel from "@/components/dashboard/NotificationPanel";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      <DashboardHeader />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Revenue"
          value="$48,250"
          icon={DollarSign}
          color="bg-emerald-500"
          change="+18%"
        />

        <StatsCard
          title="Bookings"
          value="356"
          icon={CalendarDays}
          color="bg-blue-500"
          change="+12%"
        />

        <StatsCard
          title="Guests"
          value="812"
          icon={Users}
          color="bg-violet-500"
          change="+15%"
        />

        <StatsCard
          title="Rooms"
          value="125"
          icon={BedDouble}
          color="bg-orange-500"
          change="+6%"
        />

      </div>

      <div className="grid gap-8 xl:grid-cols-3">

        <div className="space-y-8 xl:col-span-2">
          <RevenueChart />

          <RecentBookings />
        </div>

        <div className="space-y-8">
          <OccupancyChart />

          <NotificationPanel />
        </div>

      </div>

    </div>
  );
}