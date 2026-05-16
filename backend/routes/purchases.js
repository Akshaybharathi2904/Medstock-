const express = require('express');
const Medicine = require('../models/Medicine');
const Purchase = require('../models/Purchase');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/purchases - Restock medicine
router.post('/', auth, async (req, res) => {
  try {
    const { medicineId, supplierName, quantity, costPrice } = req.body;

    const medicine = await Medicine.findById(medicineId);
    if (!medicine) return res.status(404).json({ msg: 'Medicine not found' });

    medicine.stock += quantity;
    await medicine.save();

    const purchase = new Purchase({
      medicineId,
      medicineName: medicine.name,
      supplierName,
      quantity,
      costPrice,
      totalCost: costPrice * quantity
    });
    await purchase.save();

    res.json(purchase);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// GET /api/purchases - Get all purchases
router.get('/', auth, async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ createdAt: -1 });
    res.json(purchases);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
