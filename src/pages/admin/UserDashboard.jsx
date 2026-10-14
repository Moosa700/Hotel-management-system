import UpcomingBookings from "@/components/user/UpcomingBookings";
import BookingHistory from "@/components/user/BookingHistory";
import UserProfile from "@/components/user/UserProfile";
import InvoiceCard from "@/components/user/InvoiceCard";

export default function UserDashboard() {
  return (
    <div className="space-y-8">

      <div className="grid gap-8 lg:grid-cols-3">

        <div className="lg:col-span-2">

          <UpcomingBookings />

          <div className="mt-8">
            <BookingHistory />
          </div>

        </div>

        <div className="space-y-8">
          <UserProfile />
          <InvoiceCard />
        </div>

      </div>

    </div>
  );
}