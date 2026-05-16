const mongoose = require('mongoose');
require('dotenv').config();
const Medicine = require('./models/Medicine');

const d = (days) => { const x = new Date(); x.setDate(x.getDate() + days); return x; };

const medicines = [

  // ── BOTH expiring soon + low stock (15) ──────────────────────────────────
  { name: 'Pantoprazole',       category: 'Tablet',    company: 'Abbott',        price: 75,  stock: 3,  expiryDate: d(+7)  },
  { name: 'Insulin',            category: 'Injection', company: 'Novo Nordisk',  price: 450, stock: 4,  expiryDate: d(+15) },
  { name: 'Clopidogrel',        category: 'Tablet',    company: 'Sun Pharma',    price: 130, stock: 3,  expiryDate: d(+5)  },
  { name: 'Salbutamol',         category: 'Syrup',     company: 'Cipla',         price: 85,  stock: 2,  expiryDate: d(+12) },
  { name: 'Metronidazole',      category: 'Tablet',    company: 'Cipla',         price: 35,  stock: 4,  expiryDate: d(+8)  },
  { name: 'Digoxin',            category: 'Tablet',    company: 'GSK',           price: 85,  stock: 4,  expiryDate: d(+11) },
  { name: 'Heparin',            category: 'Injection', company: 'Novo Nordisk',  price: 380, stock: 3,  expiryDate: d(+6)  },
  { name: 'Cefixime',           category: 'Capsule',   company: 'Sun Pharma',    price: 160, stock: 5,  expiryDate: d(+14) },
  { name: 'Methylprednisolone', category: 'Injection', company: 'Pfizer',        price: 320, stock: 4,  expiryDate: d(+9)  },
  { name: 'Latanoprost',        category: 'Drops',     company: 'Pfizer',        price: 280, stock: 5,  expiryDate: d(+13) },
  { name: 'Oseltamivir',        category: 'Capsule',   company: 'Roche',         price: 350, stock: 3,  expiryDate: d(+19) },
  { name: 'Domperidone',        category: 'Tablet',    company: 'Abbott',        price: 55,  stock: 7,  expiryDate: d(+18) },
  { name: 'Chlorpheniramine',   category: 'Tablet',    company: 'GSK',           price: 20,  stock: 7,  expiryDate: d(+16) },
  { name: 'Amoxicillin',        category: 'Capsule',   company: 'Sun Pharma',    price: 85,  stock: 8,  expiryDate: d(+10) },
  { name: 'Atorvastatin',       category: 'Tablet',    company: 'Pfizer',        price: 95,  stock: 9,  expiryDate: d(+20) },

  // ── LOW STOCK only (20) ──────────────────────────────────────────────────
  { name: 'Ibuprofen',          category: 'Tablet',    company: 'Abbott',        price: 45,  stock: 5,  expiryDate: d(+200) },
  { name: 'Omeprazole',         category: 'Capsule',   company: "Dr. Reddy's",   price: 65,  stock: 7,  expiryDate: d(+250) },
  { name: 'Glimepiride',        category: 'Tablet',    company: 'Sanofi',        price: 110, stock: 8,  expiryDate: d(+180) },
  { name: 'Diclofenac',         category: 'Tablet',    company: 'Novartis',      price: 50,  stock: 8,  expiryDate: d(+220) },
  { name: 'Sertraline',         category: 'Tablet',    company: 'GSK',           price: 130, stock: 8,  expiryDate: d(+190) },
  { name: 'Furosemide',         category: 'Tablet',    company: 'Sanofi',        price: 30,  stock: 7,  expiryDate: d(+210) },
  { name: 'Gabapentin',         category: 'Capsule',   company: "Dr. Reddy's",   price: 195, stock: 6,  expiryDate: d(+230) },
  { name: 'Levocetirizine',     category: 'Tablet',    company: 'Mankind',       price: 40,  stock: 6,  expiryDate: d(+240) },
  { name: 'Zinc Sulphate',      category: 'Tablet',    company: "Dr. Reddy's",   price: 35,  stock: 6,  expiryDate: d(+260) },
  { name: 'Iron Supplement',    category: 'Tablet',    company: 'Sun Pharma',    price: 45,  stock: 8,  expiryDate: d(+170) },
  { name: 'Lactulose',          category: 'Syrup',     company: 'Sanofi',        price: 140, stock: 5,  expiryDate: d(+280) },
  { name: 'Amlodipine',         category: 'Tablet',    company: 'Pfizer',        price: 60,  stock: 5,  expiryDate: d(+160) },
  { name: 'Doxycycline',        category: 'Capsule',   company: 'Abbott',        price: 90,  stock: 7,  expiryDate: d(+290) },
  { name: 'Neomycin',           category: 'Drops',     company: 'Alcon',         price: 115, stock: 9,  expiryDate: d(+300) },
  { name: 'Mupirocin',          category: 'Ointment',  company: 'GSK',           price: 135, stock: 9,  expiryDate: d(+310) },
  { name: 'Timolol',            category: 'Drops',     company: 'Alcon',         price: 145, stock: 8,  expiryDate: d(+320) },
  { name: 'Acyclovir',          category: 'Tablet',    company: 'Cipla',         price: 90,  stock: 6,  expiryDate: d(+330) },
  { name: 'Tramadol',           category: 'Tablet',    company: 'Novartis',      price: 85,  stock: 9,  expiryDate: d(+340) },
  { name: 'Cough Syrup',        category: 'Syrup',     company: 'Benadryl',      price: 110, stock: 6,  expiryDate: d(+350) },
  { name: 'Dexamethasone',      category: 'Injection', company: 'Abbott',        price: 180, stock: 6,  expiryDate: d(+360) },

  // ── EXPIRING SOON only (25) ──────────────────────────────────────────────
  { name: 'Ranitidine',         category: 'Tablet',    company: 'GSK',           price: 28,  stock: 45, expiryDate: d(+21) },
  { name: 'Ondansetron',        category: 'Tablet',    company: 'Cipla',         price: 45,  stock: 28, expiryDate: d(+24) },
  { name: 'Montelukast',        category: 'Tablet',    company: 'Cipla',         price: 95,  stock: 22, expiryDate: d(+17) },
  { name: 'Warfarin',           category: 'Tablet',    company: 'Abbott',        price: 60,  stock: 20, expiryDate: d(+26) },
  { name: 'Fluconazole',        category: 'Capsule',   company: 'Pfizer',        price: 140, stock: 20, expiryDate: d(+23) },
  { name: 'Prednisolone',       category: 'Tablet',    company: 'Abbott',        price: 40,  stock: 22, expiryDate: d(+28) },
  { name: 'Erythromycin',       category: 'Syrup',     company: 'Mankind',       price: 120, stock: 11, expiryDate: d(+22) },
  { name: 'Tobramycin',         category: 'Drops',     company: 'Alcon',         price: 195, stock: 11, expiryDate: d(+27) },
  { name: 'Ciprofloxacin',      category: 'Tablet',    company: 'Bayer',         price: 75,  stock: 18, expiryDate: d(+25) },
  { name: 'Clotrimazole',       category: 'Ointment',  company: 'Bayer',         price: 70,  stock: 18, expiryDate: d(+29) },
  { name: 'Betadine',           category: 'Ointment',  company: 'Win-Medicare',  price: 90,  stock: 20, expiryDate: d(+20) },
  { name: 'Hydrocortisone',     category: 'Ointment',  company: 'GSK',           price: 95,  stock: 14, expiryDate: d(+19) },
  { name: 'Ketoconazole',       category: 'Ointment',  company: 'Bayer',         price: 110, stock: 16, expiryDate: d(+18) },
  { name: 'Eye Drops',          category: 'Drops',     company: 'Alcon',         price: 130, stock: 12, expiryDate: d(+17) },
  { name: 'Losartan',           category: 'Tablet',    company: 'Merck',         price: 75,  stock: 30, expiryDate: d(+16) },
  { name: 'Enalapril',          category: 'Tablet',    company: 'Merck',         price: 55,  stock: 42, expiryDate: d(+15) },
  { name: 'Spironolactone',     category: 'Tablet',    company: 'Pfizer',        price: 70,  stock: 35, expiryDate: d(+14) },
  { name: 'Aspirin',            category: 'Tablet',    company: 'Bayer',         price: 20,  stock: 35, expiryDate: d(+13) },
  { name: 'Antacid',            category: 'Syrup',     company: 'Mankind',       price: 65,  stock: 35, expiryDate: d(+12) },
  { name: 'Alprazolam',         category: 'Tablet',    company: 'Pfizer',        price: 45,  stock: 30, expiryDate: d(+11) },
  { name: 'Rabeprazole',        category: 'Capsule',   company: 'Sun Pharma',    price: 80,  stock: 40, expiryDate: d(+10) },
  { name: 'Pregabalin',         category: 'Capsule',   company: 'Pfizer',        price: 220, stock: 25, expiryDate: d(+9)  },
  { name: 'Azithromycin',       category: 'Tablet',    company: 'Cipla',         price: 120, stock: 15, expiryDate: d(+8)  },
  { name: 'Cetirizine',         category: 'Tablet',    company: 'Mankind',       price: 30,  stock: 50, expiryDate: d(+7)  },
  { name: 'ORS Powder',         category: 'Syrup',     company: 'Abbott',        price: 25,  stock: 90, expiryDate: d(+6)  },

  // ── EXPIRED (5) ──────────────────────────────────────────────────────────
  { name: 'Phenobarbitone',     category: 'Tablet',    company: 'Wockhardt',     price: 55,  stock: 12, expiryDate: d(-10) },
  { name: 'Codeine Syrup',      category: 'Syrup',     company: 'Pfizer',        price: 180, stock: 8,  expiryDate: d(-20) },
  { name: 'Tetracycline',       category: 'Capsule',   company: 'Abbott',        price: 40,  stock: 15, expiryDate: d(-35) },
  { name: 'Chloroquine',        category: 'Tablet',    company: 'Ipca Labs',     price: 30,  stock: 20, expiryDate: d(-15) },
  { name: 'Nitrofurantoin',     category: 'Capsule',   company: 'Cipla',         price: 95,  stock: 10, expiryDate: d(-5)  },

  // ── NORMAL (remaining) ───────────────────────────────────────────────────
  { name: 'Paracetamol',        category: 'Tablet',    company: 'Cipla',         price: 25,  stock: 25,  expiryDate: d(+400) },
  { name: 'Metformin',          category: 'Tablet',    company: 'Sun Pharma',    price: 40,  stock: 60,  expiryDate: d(+450) },
  { name: 'Dolo 650',           category: 'Tablet',    company: 'Micro Labs',    price: 35,  stock: 80,  expiryDate: d(+600) },
  { name: 'Vitamin C',          category: 'Tablet',    company: 'Himalaya',      price: 55,  stock: 100, expiryDate: d(+700) },
  { name: 'Multivitamin',       category: 'Capsule',   company: 'Himalaya',      price: 200, stock: 90,  expiryDate: d(+730) },
  { name: 'Telmisartan',        category: 'Tablet',    company: 'Boehringer',    price: 90,  stock: 55,  expiryDate: d(+650) },
  { name: 'Vitamin D3',         category: 'Capsule',   company: 'Himalaya',      price: 150, stock: 75,  expiryDate: d(+720) },
  { name: 'Vitamin B12',        category: 'Tablet',    company: 'Mankind',       price: 80,  stock: 60,  expiryDate: d(+680) },
  { name: 'Calcium Carbonate',  category: 'Tablet',    company: 'Cipla',         price: 55,  stock: 50,  expiryDate: d(+510) },
  { name: 'Hydroxychloroquine', category: 'Tablet',    company: 'Ipca Labs',     price: 75,  stock: 28,  expiryDate: d(+500) },
  { name: 'Atenolol',           category: 'Tablet',    company: 'GSK',           price: 35,  stock: 45,  expiryDate: d(+480) },
  { name: 'Lisinopril',         category: 'Tablet',    company: 'Merck',         price: 65,  stock: 38,  expiryDate: d(+460) },
  { name: 'Simvastatin',        category: 'Tablet',    company: 'Pfizer',        price: 80,  stock: 32,  expiryDate: d(+440) },
  { name: 'Folic Acid',         category: 'Tablet',    company: 'Mankind',       price: 20,  stock: 70,  expiryDate: d(+420) },
  { name: 'Pantodac',           category: 'Capsule',   company: 'Sun Pharma',    price: 90,  stock: 40,  expiryDate: d(+400) },
  { name: 'Nystatin',           category: 'Ointment',  company: 'Bristol Myers', price: 120, stock: 25,  expiryDate: d(+380) },
  { name: 'Gentamicin',         category: 'Drops',     company: 'Alcon',         price: 85,  stock: 30,  expiryDate: d(+360) },
  { name: 'Amikacin',           category: 'Injection', company: 'Cipla',         price: 220, stock: 18,  expiryDate: d(+340) },
  { name: 'Ondansetron Syrup',  category: 'Syrup',     company: 'Cipla',         price: 95,  stock: 22,  expiryDate: d(+320) },
  { name: 'Bromhexine',         category: 'Syrup',     company: 'Boehringer',    price: 75,  stock: 28,  expiryDate: d(+300) },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    await Medicine.deleteMany({});
    console.log('Cleared existing medicines');

    await Medicine.insertMany(medicines);

    const both     = medicines.filter(m => m.stock < 10 && m.expiryDate > new Date() && m.expiryDate <= new Date(Date.now() + 30*24*60*60*1000)).length;
    const lowOnly  = medicines.filter(m => m.stock < 10 && m.expiryDate > new Date(Date.now() + 30*24*60*60*1000)).length;
    const expOnly  = medicines.filter(m => m.stock >= 10 && m.expiryDate > new Date() && m.expiryDate <= new Date(Date.now() + 30*24*60*60*1000)).length;
    const expired  = medicines.filter(m => m.expiryDate < new Date()).length;
    const normal   = medicines.length - both - lowOnly - expOnly - expired;

    console.log(`✅ Inserted ${medicines.length} medicines`);
    console.log(`   Both (expiring soon + low stock) : ${both}`);
    console.log(`   Low stock only                   : ${lowOnly}`);
    console.log(`   Expiring soon only               : ${expOnly}`);
    console.log(`   Expired                          : ${expired}`);
    console.log(`   Normal                           : ${normal}`);

    process.exit(0);
  } catch (err) {
    console.error('Seeder failed:', err.message);
    process.exit(1);
  }
}

seed();
