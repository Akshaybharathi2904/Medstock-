const express = require('express');
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all medicines
router.get('/', auth, async (req, res) => {
  try {
    const { search, category, company, lowStock, expiring } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }
    if (company) {
      query.company = company;
    }
    if (lowStock === 'true') {
      query.stock = { $lt: 10 };
    }
    if (expiring === 'true') {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      query.expiryDate = { $lte: thirtyDaysFromNow };
    }

    const medicines = await Medicine.find(query).sort({ createdAt: -1 });
    res.json(medicines);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Add medicine
router.post('/', auth, async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.json(medicine);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update medicine
router.put('/:id', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(medicine);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete medicine
router.delete('/:id', auth, async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Medicine deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;