# MedStock - Pharmacy Inventory & Expiry Alert System

A MERN stack web application for managing pharmacy inventory with automatic alerts for low stock and expiring medicines.

## Features

- **Authentication**: Login/Register system with JWT
- **Medicine Management**: Add, view, update, delete medicines
- **Stock Alerts**: Automatic alerts for medicines with stock < 10
- **Expiry Alerts**: Alerts for medicines expiring within 30 days
- **Dashboard**: Analytics showing total medicines, low stock, and expiring items
- **Search & Filter**: Search by name, filter by category, company, low stock, expiring

## Tech Stack

- **Frontend**: React, TypeScript, Bootstrap, React Router
- **Backend**: Node.js, Express.js, JWT authentication
- **Database**: MongoDB with Mongoose
- **Additional**: Node-cron for scheduled tasks

## Installation

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/medstock
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

Start backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Usage

1. Register/Login as admin
2. Add medicines with details (name, category, company, price, stock, expiry date)
3. View dashboard for alerts and analytics
4. Manage inventory through the medicines list
5. Get automatic alerts for low stock and expiring medicines

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/medicines` - Get all medicines (with filters)
- `POST /api/medicines` - Add medicine
- `PUT /api/medicines/:id` - Update medicine
- `DELETE /api/medicines/:id` - Delete medicine
- `GET /api/dashboard/stats` - Get dashboard statistics

## Medicine Schema

```javascript
{
  name: String,
  category: String,
  company: String,
  price: Number,
  stock: Number,
  expiryDate: Date,
  createdAt: Date
}
```

## Default Categories

- Tablet
- Capsule
- Syrup
- Injection
- Ointment
- Drops

## Alerts

- **Low Stock**: Stock < 10 units
- **Expiring Soon**: Expiry date within 30 days

The system runs a daily cron job at 9 AM to check for expiring medicines.