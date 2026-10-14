import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";

import App from "@/App";

// ───────── Layouts ─────────
import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// ───────── Auth Guards ─────────
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

// ───────── Public Pages ─────────
import Home from "@/pages/public/Home";
import Rooms from "@/pages/public/Rooms";
import RoomDetails from "@/pages/public/RoomDetails";
import Booking from "@/pages/public/Booking";
import About from "@/pages/public/About";
import Contact from "@/pages/public/Contact";
import Services from "@/pages/public/Services";

// ───────── Auth Pages ─────────
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// ───────── Admin Pages ─────────
import AdminDashboard from "@/pages/admin/AdminDashboard";
import RoomsManagement from "@/pages/admin/RoomsManagement";
import BookingsManagement from "@/pages/admin/BookingsManagement";
import Guests from "@/pages/admin/Guests";
import StaffManagement from "@/pages/admin/StaffManagement";
import UsersManagement from "@/pages/admin/UsersManagement";
import PaymentsManagement from "@/pages/admin/PaymentsManagement";
import Reports from "@/pages/admin/Reports";
import Billing from "@/pages/admin/Billing";
import Feedback from "@/pages/admin/Feedback";
import Settings from "@/pages/admin/Settings";

// ───────── Staff Pages ─────────
import StaffDashboard from "@/pages/staff/Dashboard";
import Reservations from "@/pages/staff/Reservations";
import StaffGuests from "@/pages/staff/Guests";
import CheckIn from "@/pages/staff/CheckIn";
import CheckOut from "@/pages/staff/CheckOut";
import Housekeeping from "@/pages/staff/Housekeeping";
import Maintenance from "@/pages/staff/Maintenance";
import StaffProfile from "@/pages/staff/Profile";

// ───────── User Pages ─────────
import UserDashboard from "@/pages/user/Dashboard";
import MyBookings from "@/pages/user/MyBookings";
import BookingDetails from "@/pages/user/BookingDetails";
import Payments from "@/pages/user/Payments";
import Profile from "@/pages/user/Profile";
import UserSettings from "@/pages/user/Settings";
import Invoices from "@/pages/user/Invoices";
import UpcomingBookings from "@/pages/user/UpcomingBookings";
import ServiceRequests from "@/pages/user/ServiceRequests";

/* ================================================================
   ROOT
   ================================================================ */
const rootRoute = createRootRoute({ component: App });

/* ================================================================
   PUBLIC ROUTES
   ================================================================ */
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <PublicLayout>
      <Home />
    </PublicLayout>
  ),
});

const roomsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rooms",
  component: () => (
    <PublicLayout>
      <Rooms />
    </PublicLayout>
  ),
});

const roomDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rooms/$roomId",
  component: () => (
    <PublicLayout>
      <RoomDetails />
    </PublicLayout>
  ),
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking",
  component: () => (
    <PublicLayout>
      <Booking />
    </PublicLayout>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <PublicLayout>
      <About />
    </PublicLayout>
  ),
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: () => (
    <PublicLayout>
      <Services />
    </PublicLayout>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <PublicLayout>
      <Contact />
    </PublicLayout>
  ),
});

/* ================================================================
   AUTH ROUTES
   ================================================================ */
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

/* ================================================================
   ADMIN ROUTES
   ================================================================ */
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/admin",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="admin">
        <DashboardLayout>
          <AdminDashboard />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const adminRoomsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/admin/rooms",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="admin">
        <DashboardLayout>
          <RoomsManagement />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const adminBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/admin/bookings",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="admin">
        <DashboardLayout>
          <BookingsManagement />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const adminGuestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/admin/guests",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="admin">
        <DashboardLayout>
          <Guests />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const adminStaffRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/admin/staff",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="admin">
        <DashboardLayout>
          <StaffManagement />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/admin/users",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="admin">
        <DashboardLayout>
          <UsersManagement />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const adminPaymentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/admin/payments",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="admin">
        <DashboardLayout>
          <PaymentsManagement />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const adminReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/admin/reports",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="admin">
        <DashboardLayout>
          <Reports />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const adminBillingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/admin/billing",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="admin">
        <DashboardLayout>
          <Billing />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const adminFeedbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/admin/feedback",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="admin">
        <DashboardLayout>
          <Feedback />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/admin/settings",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="admin">
        <DashboardLayout>
          <Settings />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

/* ================================================================
   STAFF ROUTES
   ================================================================ */
const staffDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/staff",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="staff">
        <DashboardLayout>
          <StaffDashboard />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const staffReservationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/staff/reservations",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="staff">
        <DashboardLayout>
          <Reservations />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const staffGuestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/staff/guests",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="staff">
        <DashboardLayout>
          <StaffGuests />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const staffCheckInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/staff/checkin",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="staff">
        <DashboardLayout>
          <CheckIn />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const staffCheckOutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/staff/checkout",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="staff">
        <DashboardLayout>
          <CheckOut />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const staffHousekeepingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/staff/housekeeping",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="staff">
        <DashboardLayout>
          <Housekeeping />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const staffMaintenanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/staff/maintenance",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="staff">
        <DashboardLayout>
          <Maintenance />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const staffProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/staff/profile",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="staff">
        <DashboardLayout>
          <StaffProfile />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

/* ================================================================
   USER ROUTES
   ================================================================ */
const userDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/user",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="user">
        <DashboardLayout>
          <UserDashboard />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const userMyBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/user/bookings",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="user">
        <DashboardLayout>
          <MyBookings />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const userBookingDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/user/bookings/$bookingId",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="user">
        <DashboardLayout>
          <BookingDetails />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const userUpcomingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/user/upcoming",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="user">
        <DashboardLayout>
          <UpcomingBookings />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const userPaymentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/user/payments",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="user">
        <DashboardLayout>
          <Payments />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const userInvoicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/user/invoices",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="user">
        <DashboardLayout>
          <Invoices />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const userProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/user/profile",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="user">
        <DashboardLayout>
          <Profile />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const userSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/user/settings",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="user">
        <DashboardLayout>
          <UserSettings />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

const userServiceRequestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/user/services",
  component: () => (
    <ProtectedRoute>
      <RoleRoute role="user">
        <DashboardLayout>
          <ServiceRequests />
        </DashboardLayout>
      </RoleRoute>
    </ProtectedRoute>
  ),
});

/* ================================================================
   ROUTE TREE
   ================================================================ */
const routeTree = rootRoute.addChildren([
  // Public
  homeRoute,
  roomsRoute,
  roomDetailsRoute,
  bookingRoute,
  aboutRoute,
  servicesRoute,
  contactRoute,

  // Auth
  loginRoute,
  registerRoute,

  // Admin
  adminDashboardRoute,
  adminRoomsRoute,
  adminBookingsRoute,
  adminGuestsRoute,
  adminStaffRoute,
  adminUsersRoute,
  adminPaymentsRoute,
  adminReportsRoute,
  adminBillingRoute,
  adminFeedbackRoute,
  adminSettingsRoute,

  // Staff
  staffDashboardRoute,
  staffReservationsRoute,
  staffGuestsRoute,
  staffCheckInRoute,
  staffCheckOutRoute,
  staffHousekeepingRoute,
  staffMaintenanceRoute,
  staffProfileRoute,

  // User
  userDashboardRoute,
  userMyBookingsRoute,
  userBookingDetailsRoute,
  userUpcomingRoute,
  userPaymentsRoute,
  userInvoicesRoute,
  userProfileRoute,
  userSettingsRoute,
  userServiceRequestsRoute,
]);

export const router = createRouter({ routeTree });