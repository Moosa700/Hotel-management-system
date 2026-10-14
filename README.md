# LuxuryStay Hospitality Management System

LuxuryStay is a hotel management platform built with React + Vite on the frontend and Express + MongoDB on the backend. It supports guest booking, check-in/check-out workflows, staff operations, administrative reporting, housekeeping, maintenance tracking, billing, and service requests.

## 1. Project Overview

This project is designed for a hospitality business that needs to manage:

- Public hotel browsing and room booking
- User registration and authentication
- Reservation lifecycle management
- Front-desk check-in and check-out operations
- Staff assignments and role-based access control
- Housekeeping and maintenance tracking
- Billing and payment review
- System settings and operational dashboards

The application is structured as a modular monorepo containing:

- Frontend web app in the root folder
- Backend API under `server/`
- Shared environment configuration and project metadata at the repo root

## 2. Tech Stack

### Frontend
- React 19
- Vite
- TanStack Router
- Tailwind CSS
- Axios for API calls
- Lucide icons and various UI primitives

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- Bcrypt password hashing
- Multer for file handling

## 3. Role-Based Modules

The system contains these primary user roles:

- `admin`: full platform access
- `manager`: operational oversight
- `receptionist`: bookings and guest check-in/out support
- `housekeeping`: housekeeping tasks and room status updates
- `staff`: general staff operations
- `customer`: guest-side booking and profile functionality

## 4. Key Features

### Public Website
- Room listing and room detail pages
- Booking form and reservation flow
- About, Contact, Services, and landing pages

### Customer Portal
- Register and login
- View profile and personal details
- Check bookings and booking details
- Cancel eligible bookings
- View invoices and payment status
- Raise service requests during an active stay

### Staff / Front Desk
- Reservations dashboard
- Check-in and check-out workflows
- Guest management
- Housekeeping task updates
- Maintenance work tracking

### Admin Features
- Room management
- User and staff management
- Booking management and operational summary
- Guest reporting and analytics
- Billing overview
- Feedback and settings management
- Dashboard views for business operations

## 5. Repository Structure

```text
restaurant-management-system/
├── README.md
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── App.jsx
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   └── styles/
├── .env.example
├── server/
│   ├── README.md
│   ├── package.json
│   ├── src/
│   ├── .env.example
│   └── .env
└── integrations/
```

## 6. Prerequisites

Before running the application, ensure the following are available:

- Node.js 20+ (recommended 22+)
- MongoDB instance running locally or remotely
- Git
- PowerShell or another terminal

## 7. Environment Configuration

### Root frontend config
Create a `.env.local` file in the project root:

```env
VITE_API_URL=http://localhost:5001/api
```

### Backend config
Copy the example file in `server/`:

```powershell
Set-Location server
Copy-Item .env.example .env
```

Then set values such as:

```env
MONGO_URI=mongodb://127.0.0.1:27017/hotel_management_system
JWT_SECRET=replace-with-a-long-random-secret-before-running
PORT=5001
CLIENT_URL=http://localhost:5173
```

Important:
- Never commit `.env` files to version control.
- Use a secure JWT secret in production.
- For production, use a hosted MongoDB with strong credentials and backups.

## 8. Local Setup

From the repository root, install dependencies:

```powershell
npm install
Set-Location server
npm install
```

Start MongoDB locally, then initialize the first admin account once:

```powershell
Set-Location server
npm run create-admin
```

This command creates a first admin user and prints the generated password one time. It will refuse to create another admin if one already exists.

### Default admin credentials

For this local setup, the seeded admin account is:

- Email: `admin@luxurystay.local`
- Password: `Admin@123`

This is intended for local development use.

## 9. Running the Application

### Start backend

```powershell
Set-Location server
npm run dev
```

### Start frontend

Open a second terminal from the repository root:

```powershell
npm run dev
```

Then open:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5001`

## 10. Scripts

### Root project

```powershell
npm run dev      # Start frontend development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run lint checks (if configured)
```

### Backend server

```powershell
npm run dev      # Start Express server with nodemon
npm start       # Start server in production mode
npm run create-admin   # Bootstrap first admin user
npm test        # Run backend tests
```

## 11. API Overview

The backend exposes API endpoints under `/api`.

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Rooms
- `GET /api/rooms`
- `GET /api/rooms/:id`
- `POST /api/rooms`
- `PUT /api/rooms/:id`
- `DELETE /api/rooms/:id`

### Bookings
- `GET /api/bookings`
- `GET /api/bookings/my`
- `POST /api/bookings`
- `PUT /api/bookings/:id`
- `DELETE /api/bookings/:id`

### Services
- `GET /api/services/mine`
- `POST /api/services`
- `GET /api/services/:id`
- `PUT /api/services/:id`

### Housekeeping
- `GET /api/housekeeping`
- `POST /api/housekeeping`
- `PUT /api/housekeeping/:id`

### Maintenance
- `GET /api/maintenance`
- `POST /api/maintenance`
- `PUT /api/maintenance/:id`

### Billing
- `GET /api/billing`
- `GET /api/billing/:id`
- `POST /api/billing`

### Dashboard
- `GET /api/dashboard/admin`
- `GET /api/dashboard/staff`
- `GET /api/dashboard/customer`

### Settings
- `GET /api/settings`
- `PUT /api/settings`

## 12. Core Business Workflow

### Guest booking flow
1. User registers or logs in.
2. User browses room inventory.
3. User picks dates and room details.
4. Booking is validated and saved.
5. Customer can view booking details, payments, and invoices.
6. Staff or admin can confirm, check in, and later check out the guest.

### Front desk flow
1. Receptionist or admin sees pending and confirmed bookings.
2. Customer arrives and is checked in.
3. Booking status changes to `Checked In`.
4. Housekeeping and maintenance tasks are tracked as needed.
5. Departure updates booking to `Checked Out`.

### Admin flow
1. Admin manages rooms, staff, users, and settings.
2. Admin reviews reports and operational dashboards.
3. Billing and service activity are monitored.
4. System-level security and access control are preserved.

## 13. Security and Access Control

The application uses:

- Password hashing with bcrypt
- JWT-based authentication
- Role-based authorization middleware
- CORS configuration for allowed origins
- Protected routes for role-specific access

Recommended production hardening:

- Use HTTPS everywhere
- Rotate JWT secrets regularly
- Store secrets in environment variables only
- Enable rate limiting and request validation
- Add monitoring and audit logs
- Keep MongoDB behind firewall or managed cloud services

## 14. Deployment Notes

For deployment:

- Run frontend on a production server or static host
- Run backend in a Node.js hosting environment
- Use a managed MongoDB instance
- Set strong environment variables for `JWT_SECRET`, `MONGO_URI`, and `CLIENT_URL`
- Configure reverse proxy and HTTPS termination
- Add logging, error reporting, and backups

## 15. Troubleshooting

### MongoDB connection fails
- Confirm MongoDB is running
- Check `MONGO_URI` in `server/.env`
- Ensure the database name and credentials are valid

### Frontend cannot reach API
- Confirm backend is running on `http://localhost:5001`
- Check `VITE_API_URL` in the root `.env.local`
- Ensure CORS allows the frontend origin

### Admin account not created
- Run `npm run create-admin` from `server/`
- Ensure there is no existing admin user in MongoDB

### JWT errors
- Make sure `JWT_SECRET` is set in `server/.env`
- Verify the token is being sent in the `Authorization` header

## 16. Development Notes

The app is actively built around modular components and role-based dashboards. It is suitable for learning, local development, and extension into a full production hospitality management system.

## 17. Future Enhancements

Potential improvements include:

- Payment gateway integration
- Advanced reporting and analytics
- Email/SMS notifications
- Inventory and restaurant modules
- Audit logs and activity history
- Multi-property support
- File upload storage for user documents and media

## 18. Related Documentation

- [server/README.md](server/README.md) — backend configuration, routes, and deployment guidance

## 19. Summary

LuxuryStay is a complete hospitality management system covering both the customer-facing experience and operational management needs of a hotel business. It combines booking, staff operations, billing, housekeeping, maintenance, and admin dashboards in a single full-stack application.
