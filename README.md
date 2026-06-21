# Hotel Backend API

A Node.js Express backend for a hotel management system with MongoDB.

## Features

- User authentication & authorization
- Guest management
- Room & facility management
- Booking system
- Payment processing
- Service management
- Staff management
- Review system
- Invoice generation
- Contact management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd Hotel-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
MONGO_URI=mongodb://localhost:27017/hotel-backend
JWT_SECRET=your-secret-key-here
PORT=5000
```

## Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on `http://localhost:5000`

## Health Check

```bash
GET /health
```

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh JWT token

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Guests
- `GET /api/guests` - Get all guests
- `POST /api/guests` - Create guest
- `GET /api/guests/:id` - Get guest details
- `PUT /api/guests/:id` - Update guest

### Rooms
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create room
- `GET /api/rooms/:id` - Get room details
- `PUT /api/rooms/:id` - Update room

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Create payment
- `GET /api/payments/:id` - Get payment details

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service

### Facilities
- `GET /api/facilities` - Get all facilities
- `POST /api/facilities` - Create facility

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review

### Staff
- `GET /api/staff` - Get all staff
- `POST /api/staff` - Create staff member

### Invoices
- `GET /api/invoices` - Get all invoices
- `POST /api/invoices` - Create invoice

### Contact
- `POST /api/contact` - Submit contact form

## Project Structure

```
app.js                 # Express app setup
server.js              # Server entry point
package.json           # Dependencies

config/
├── db.config.js      # MongoDB connection

models/
├── user.model.js
├── booking.model.js
├── guest.model.js
├── room.model.js
├── payment.model.js
├── service.model.js
├── facility.model.js
├── review.model.js
├── staff.model.js
├── invoice.model.js
├── contact.model.js

routes/
├── auth.route.js
├── user.route.js
├── booking.route.js
├── guest.route.js
├── room.route.js
├── payment.route.js
├── service.route.js
├── facility.route.js
├── review.route.js
├── staff.route.js
├── invoice.route.js
├── contact.route.js

controllers/
├── auth.controller.js
├── user.controller.js
├── booking.controller.js
├── guest.controller.js
├── room.controller.js
├── payment.controller.js
├── service.controller.js
├── facility.controller.js
├── review.controller.js
├── staff.controller.js
├── invoice.controller.js
├── contact.controller.js

middlewares/
├── auth.middleware.js
├── error.middleware.js
```

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CORS_ORIGIN` - Allowed CORS origin

## Middleware

- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - HTTP request logger
- **Express JSON** - Parse JSON request bodies
- **Error Handler** - Global error handling
- **Auth Middleware** - JWT authentication

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin requests
- **Morgan** - Request logging
- **Express-validator** - Input validation

## License

ISC
