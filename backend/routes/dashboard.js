const express = require('express');
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');

const router = express.Router();

// Get dashboard stats
router.get('/stats', auth, async (req, res) => {
  try {
    const totalMedicines = await Medicine.countDocuments();
    const lowStockCount = await Medicine.countDocuments({ stock: { $lt: 10 } });
    
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const expiringCount = await Medicine.countDocuments({ 
      expiryDate: { $lte: thirtyDaysFromNow } 
    });

    const lowStockMedicines = await Medicine.find({ stock: { $lt: 10 } });
    const expiringMedicines = await Medicine.find({ 
      expiryDate: { $lte: thirtyDaysFromNow } 
    });

    res.json({
      totalMedicines,
      lowStockCount,
      expiringCount,
      lowStockMedicines,
      expiringMedicines
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;