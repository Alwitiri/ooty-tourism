require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

async function main() {
  await connectDB();
  const existing = await User.findOne({ email: 'tester@ooty.com' });
  if (existing) {
    console.log('Test user already exists:');
    console.log(`  Email: tester@ooty.com`);
    console.log(`  Password: test123`);
    console.log(`  Role: ${existing.role}`);
  } else {
    await User.create({ name: 'Tester', email: 'tester@ooty.com', password: 'test123', role: 'customer' });
    console.log('Test user created!');
    console.log('  Email: tester@ooty.com');
    console.log('  Password: test123');
  }
  await mongoose.disconnect();
}

main().catch((err) => { console.error(err); process.exit(1); });
