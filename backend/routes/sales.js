const express = require('express');
const Medicine = require('../models/Medicine');
const Sale = require('../models/Sale');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/sales - Create a sale
router.post('/', auth, async (req, res) => {
  try {
    const { medicineId, quantity } = req.body;

    const medicine = await Medicine.findById(medicineId);
    if (!medicine) return res.status(404).json({ msg: 'Medicine not found' });

    if (medicine.stock < quantity) {
      return res.status(400).json({ msg: `Insufficient stock. Available: ${medicine.stock}` });
    }

    medicine.stock -= quantity;
    await medicine.save();

    const sale = new Sale({
      medicineId,
      medicineName: medicine.name,
      quantity,
      price: medicine.price,
      totalAmount: medicine.price * quantity
    });
    await sale.save();

    res.json(sale);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// GET /api/sales - Get all sales
router.get('/', auth, async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
