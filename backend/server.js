const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const app = express();

// In-memory storage for testing (when MongoDB is not available)
let medicines = [];
let medicineIdCounter = 1;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log('MongoDB connection failed:', err.message);
    console.log('Running without database - some features may not work');
  });

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Simple fallback auth for testing (when MongoDB is not available)
let users = [];
let userIdCounter = 1;

// Fallback register route
app.post('/api/auth/register', (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    // Create new user
    const newUser = {
      id: userIdCounter++,
      username,
      email,
      password // In real app, this should be hashed
    };
    
    users.push(newUser);
    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Fallback login route
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    // Create simple token (in real app, use proper JWT)
    const token = 'simple_token_' + user.id;
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Fallback dashboard route for testing
app.get('/api/dashboard/stats', (req, res) => {
  const lowStockMedicines = medicines.filter(m => m.stock < 10);
  const today = new Date();
  const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
  const expiringMedicines = medicines.filter(m => {
    const expiryDate = new Date(m.expiryDate);
    return expiryDate >= today && expiryDate <= thirtyDaysFromNow;
  });
  
  res.json({
    totalMedicines: medicines.length,
    lowStockCount: lowStockMedicines.length,
    expiringCount: expiringMedicines.length,
    lowStockMedicines,
    expiringMedicines
  });
});

// Fallback medicines routes for testing
app.get('/api/medicines', (req, res) => {
  let filteredMedicines = medicines;
  
  const { search, category, company, lowStock, expiring } = req.query;
  
  if (search) {
    filteredMedicines = filteredMedicines.filter(m => 
      m.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (category) {
    filteredMedicines = filteredMedicines.filter(m => m.category === category);
  }
  
  if (company) {
    filteredMedicines = filteredMedicines.filter(m => m.company === company);
  }
  
  if (lowStock === 'true') {
    filteredMedicines = filteredMedicines.filter(m => m.stock < 10);
  }
  
  if (expiring === 'true') {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    filteredMedicines = filteredMedicines.filter(m => {
      const expiryDate = new Date(m.expiryDate);
      return expiryDate >= today && expiryDate <= thirtyDaysFromNow;
    });
  }
  
  res.json(filteredMedicines);
});

app.post('/api/medicines', (req, res) => {
  const medicine = {
    _id: medicineIdCounter++,
    ...req.body,
    createdAt: new Date()
  };
  medicines.push(medicine);
  res.json(medicine);
});

app.put('/api/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = medicines.findIndex(m => m._id === id);
  if (index !== -1) {
    medicines[index] = { ...medicines[index], ...req.body };
    res.json(medicines[index]);
  } else {
    res.status(404).json({ msg: 'Medicine not found' });
  }
});

app.delete('/api/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  medicines = medicines.filter(m => m._id !== id);
  res.json({ msg: 'Medicine deleted' });
});

// Routes (only use if MongoDB is connected)
if (mongoose.connection.readyState === 1) {
  app.use('/api/auth', require('./routes/auth'));
  // Don't use medicines route if using fallback
  // app.use('/api/medicines', require('./routes/medicines'));
  app.use('/api/dashboard', require('./routes/dashboard'));
}

// Cron job for expiry alerts (runs daily at 9 AM)
cron.schedule('0 9 * * *', () => {
  console.log('Checking for expiring medicines...');
  // Alert logic can be added here
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));