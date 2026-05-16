# MedStock - Pharmacy Inventory & Expiry Alert System

A professional MERN stack web application for managing pharmacy inventory with automatic alerts for low stock and expiring medicines.

## Features

- **Authentication**: Secure login/register system with JWT
- **Medicine Management**: Add, view, update, delete medicines with complete details
- **Stock Alerts**: Automatic alerts for medicines with stock < 10 units
- **Expiry Alerts**: Alerts for medicines expiring within 30 days
- **Dashboard**: Real-time analytics showing total medicines, low stock, expiring items, and revenue
- **Sales & Billing**: Complete billing system with printable receipts and sales reports
- **Purchase Management**: Track supplier purchases and restock inventory
- **Search & Filter**: Advanced search by name, filter by category, company, low stock, expiring
- **Revenue Analytics**: Track daily, monthly, and total revenue with top-selling medicines

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
4. Process sales and generate bills
5. Track purchases and restock inventory
6. Get automatic alerts for low stock and expiring medicines

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Medicines
- `GET /api/medicines` - Get all medicines (with filters)
- `POST /api/medicines` - Add medicine
- `PUT /api/medicines/:id` - Update medicine
- `DELETE /api/medicines/:id` - Delete medicine

### Sales
- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create sale

### Purchases
- `GET /api/purchases` - Get all purchases
- `POST /api/purchases` - Create purchase

### Dashboard
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

## Future Enhancements

The following features are confidently planned for upcoming releases:

### 1. Barcode Scanner Integration
- USB & Bluetooth barcode scanner support
- Auto-fill medicine details from barcode
- Scan to sell at billing counter
- Scan to update stock during purchase
- Support for QR codes and 1D/2D barcodes

### 2. Email Alert Notifications
- Daily low stock summary emails
- Expiry alert emails 30, 15 & 7 days before
- Customizable email templates
- Multiple recipient support
- SMTP / SendGrid / AWS SES integration

### 3. SMS Notifications
- Instant SMS for critical low stock
- Expiry warning SMS alerts
- Twilio / MSG91 / AWS SNS integration
- Configurable alert thresholds
- Delivery status tracking

## Development Roadmap

### Phase 1 — Current (Live)
- ✓ Medicine inventory management
- ✓ Sales & billing with receipts
- ✓ Purchase & restock tracking
- ✓ Low stock & expiry alerts
- ✓ Revenue analytics dashboard

### Phase 2 — Coming Soon
- Email alert notifications
- Role-based access (Admin / Staff)
- Medicine batch tracking
- Supplier management module

### Phase 3 — Future
- Barcode scanner integration
- SMS notifications
- Mobile app (React Native)
- Multi-branch support
- GST invoice generation

## Screenshots

The application features a professional, modern UI with:
- Clean sidebar navigation
- Real-time dashboard with statistics
- Advanced filtering and search
- Printable sales receipts
- Comprehensive analytics and reports

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
