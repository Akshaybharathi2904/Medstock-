const express = require('express');
const Medicine = require('../models/Medicine');
const Sale = require('../models/Sale');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/dashboard/stats
router.get('/stats', auth, async (req, res) => {
  try {
    const totalMedicines = await Medicine.countDocuments();
    const lowStockCount = await Medicine.countDocuments({ stock: { $lt: 10 } });

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const expiringCount = await Medicine.countDocuments({ expiryDate: { $lte: thirtyDaysFromNow } });

    const lowStockMedicines = await Medicine.find({ stock: { $lt: 10 } });
    const expiringMedicines = await Medicine.find({ expiryDate: { $lte: thirtyDaysFromNow } });

    // Revenue stats
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const todaySales = await Sale.aggregate([
      { $match: { createdAt: { $gte: startOfDay } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } }
    ]);

    const monthSales = await Sale.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } }
    ]);

    const allTimeSales = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } }
    ]);

    // Top 5 selling medicines
    const topMedicines = await Sale.aggregate([
      { $group: { _id: '$medicineName', totalQty: { $sum: '$quantity' }, totalRevenue: { $sum: '$totalAmount' } } },
      { $sort: { totalQty: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalMedicines,
      lowStockCount,
      expiringCount,
      lowStockMedicines,
      expiringMedicines,
      todayRevenue: todaySales[0]?.total ?? 0,
      todaySalesCount: todaySales[0]?.count ?? 0,
      monthRevenue: monthSales[0]?.total ?? 0,
      monthSalesCount: monthSales[0]?.count ?? 0,
      totalRevenue: allTimeSales[0]?.total ?? 0,
      totalSalesCount: allTimeSales[0]?.count ?? 0,
      topMedicines
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
