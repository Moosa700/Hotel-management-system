# LuxuryStay Backend Documentation

This backend powers the LuxuryStay hospitality management application. It provides REST APIs for authentication, room and booking management, billing, housekeeping, maintenance, staff workflows, dashboards, and settings.

## 1. Backend Summary

The backend is built with:

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Bcrypt password hashing
- CORS and middleware-based authorization

It exposes the REST API under `/api` and is consumed by the frontend React app on `http://localhost:5173`.

## 2. Project Purpose

This API supports the following management areas:

- Customer registration and login
- Room inventory and availability checks
- Booking creation, updates, and cancellation logic
- Guest check-in and check-out handling
- Room service and guest service requests
- Staff operations and role-based access
- Housekeeping task tracking
- Maintenance request lifecycle
- Billing and invoice generation
- Dashboard summaries for different roles
- Application settings management

## 3. Directory Structure

```text
server/
├── README.md
├── package.json
├── .env.example
├── .env
├── src/
│   ├── app.js
│   ├── server.js
│   ├── bootstrapAdmin.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── uploads/
└── test/
```

## 4. Environment Variables

Create a `.env` file from `.env.example`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/hotel_management_system
JWT_SECRET=replace-with-a-long-random-secret-before-running
PORT=5001
CLIENT_URL=http://localhost:5173
```

### Variable descriptions
- `MONGO_URI`: MongoDB database connection string
- `JWT_SECRET`: Secret key used to sign JWTs
- `PORT`: API server port
- `CLIENT_URL`: Allowed origin for frontend requests

## 5. Installation

From the `server/` directory:

```powershell
npm install
```

## 6. Running the Server

Development mode:

```powershell
npm run dev
```

Production mode:

```powershell
npm start
```

The backend will start on:

```text
http://localhost:5001
```

## 7. Admin Bootstrap

To create the initial admin account:

```powershell
npm run create-admin
```

This command:
- checks if an admin already exists
- creates one if there is none
- hashes the password securely using bcrypt
- prints the generated password only once

### Local admin credentials

- Email: `admin@luxurystay.local`
- Password: `Admin@123`

## 8. API Base URL

```text
http://localhost:5001/api
```

## 9. API Modules

### Authentication

#### Register
- `POST /api/auth/register`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login
- `POST /api/auth/login`

Request body:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Profile
- `GET /api/auth/profile`
- requires authentication

### Users
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

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
- `GET /api/services`
- `GET /api/services/mine`
- `GET /api/services/:id`
- `POST /api/services`
- `PUT /api/services/:id`
- `DELETE /api/services/:id`

### Staff
- `GET /api/staff`
- `POST /api/staff`
- `PUT /api/staff/:id`

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

### Feedback
- `GET /api/feedback`
- `POST /api/feedback`

## 10. Authorization Model

The backend protects routes with middleware and role checks.

### Roles supported
- `admin`
- `manager`
- `receptionist`
- `housekeeping`
- `staff`
- `customer`

Examples:
- Admin routes are restricted to `admin`
- Customer endpoints require `customer` role
- Staff/admin operations share access to many operational routes

## 11. Authentication and Security

The backend implements:

- bcrypt hashing for passwords
- JWT token generation for logged-in sessions
- Middleware checking `Authorization` bearer tokens
- CORS restrictions to known frontend origins
- Role-based route protection

## 12. Data Models

### User
Stores login credentials, profile fields, and role.

### Room
Stores room number, type, pricing, occupancy, availability, and metadata.

### Booking
Tracks guest reservations, dates, room assignment, guest details, status, and payment state.

### ServiceRequest
Captures guest service requests such as room service, housekeeping, laundry, and maintenance assistance.

### Housekeeping Task
Tracks cleaning schedule and task completion status.

### Maintenance Request
Tracks facility issues and their current status.

## 13. Middleware

Key middleware in `src/middleware/` includes:

- `auth.middleware.js` — validates JWT token
- `role.middleware.js` — enforces role-based access
- `maintenance.middleware.js` — blocks public customer calls during maintenance mode
- `validate.middleware.js` — request validation helper
- `error.middleware.js` — structured error handling

## 14. Error Handling

API responses follow a standard structure:

```json
{
  "success": false,
  "message": "Invalid email or password.",
  "statusCode": 401
}
```

Success responses commonly follow:

```json
{
  "success": true,
  "message": "Login successful.",
  "data": { ... }
}
```

## 15. Testing

Run backend tests with:

```powershell
npm test
```

The project uses Node's built-in test runner.

## 16. Production Hardening Recommendations

Before deploying:

- Set a unique and strong `JWT_SECRET`
- Use a managed MongoDB deployment with backups
- Serve over HTTPS
- Configure `CLIENT_URL` to your live frontend domain
- Restrict CORS to trusted origins only
- Use a production environment file, never the local one
- Add monitoring, logging, rate limiting, and backup routines

## 17. Common Troubleshooting

### MongoDB not connecting
Check:
- `MONGO_URI`
- If local MongoDB is running
- Database permissions and connection string format

### CORS errors
Check:
- `CLIENT_URL` matches the frontend URL
- The frontend is calling the correct backend origin

### JWT errors
Check:
- Token exists in `Authorization` header
- `JWT_SECRET` is set and consistent

### Admin account missing
Run:

```powershell
npm run create-admin
```

## 18. Summary

The backend provides a complete and modular hotel management API supporting guest operations, staff workflows, and administrative oversight. It is designed to be secure, role-aware, and extensible for future hospitality features.

