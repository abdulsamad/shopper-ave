import path from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import connectDB from '@config/db';
import Category from '@models/category';
import Order from '@models/order';
import Product from '@models/product';
import User from '@models/user';

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || path.resolve(__dirname, '../../.env') });

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];

const users = [
  {
    name: 'Ava Thompson',
    email: 'ava.thompson@example.com',
    role: 'user',
    addresses: [{ address: '1428 Market Street', city: 'San Francisco', postalCode: '94102', state: 'California', country: 'United States' }],
  },
  {
    name: 'Noah Williams',
    email: 'noah.williams@example.com',
    role: 'user',
    addresses: [{ address: '88 Bedford Avenue', city: 'Brooklyn', postalCode: '11211', state: 'New York', country: 'United States' }],
  },
  {
    name: 'Mia Rodriguez',
    email: 'mia.rodriguez@example.com',
    role: 'user',
    addresses: [{ address: '321 Congress Avenue', city: 'Austin', postalCode: '78701', state: 'Texas', country: 'United States' }],
  },
];

const productData = [
  ['Everyday Cotton Overshirt', 6800, 'A soft brushed-cotton overshirt with a relaxed fit for easy layering.', 'Tops', 'Northline', 34, 'photo-1596755389378-c31d21fd1273'],
  ['Ribbed Knit Midi Dress', 8900, 'A versatile ribbed midi dress with a clean silhouette and everyday comfort.', 'Dresses', 'Lumen', 18, 'photo-1595777457583-95e059d581b8'],
  ['Relaxed Pleat Trousers', 7600, 'High-waisted trousers cut from a lightweight fabric with a graceful pleat.', 'Bottoms', 'Northline', 27, 'photo-1624378439575-d8705ad7ae80'],
  ['Quilted Weekend Jacket', 12900, 'A lightweight quilted jacket with practical pockets and a water-resistant finish.', 'Outerwear', 'Harbor & Pine', 12, 'photo-1544966503-7cc5ac882d5f'],
  ['Leather Court Sneakers', 9400, 'Minimal leather sneakers finished with a cushioned footbed for all-day wear.', 'Shoes', 'Common Ground', 21, 'photo-1542291026-7eec264c27ff'],
  ['Structured Canvas Tote', 4900, 'A durable canvas tote with a structured base and room for daily essentials.', 'Accessories', 'Field Notes', 41, 'photo-1553062407-98eeb64c6a62'],
  ['Merino Crewneck Sweater', 9900, 'A breathable merino-wool crewneck that works equally well on its own or layered.', 'Tops', 'Lumen', 16, 'photo-1576566588028-4147f3842f27'],
  ['Straight Leg Denim', 7200, 'Classic straight-leg denim made from comfortable stretch cotton with a clean wash.', 'Bottoms', 'Common Ground', 30, 'photo-1542272604-787c3835535d'],
] as const;

const seed = async () => {
  await connectDB();
  const passwordHash = await bcrypt.hash('ShopperAve123!', 10);

  const admin = await User.findOneAndUpdate(
    { email: 'admin@shopperave.test' },
    { name: 'Shopper Ave Admin', email: 'admin@shopperave.test', password: passwordHash, role: 'admin', addresses: [] },
    { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
  );

  await User.bulkWrite(users.map((user) => ({
    updateOne: { filter: { email: user.email }, update: { $set: { ...user, password: passwordHash } }, upsert: true },
  })));
  const customerRecords = await User.find({ email: { $in: users.map(({ email }) => email) } });

  await Order.deleteMany({ user: { $in: customerRecords.map((user) => user._id) } });
  await Product.deleteMany({ user: admin._id });
  await Category.bulkWrite(categories.map((name) => ({
    updateOne: { filter: { name }, update: { $set: { name } }, upsert: true },
  })));

  const products = await Product.insertMany(productData.map(([name, price, description, category, brand, stock, photo], index) => ({
    name,
    price,
    description,
    category,
    brand,
    stock,
    photos: [{ id: `seed-product-${index + 1}`, secure_url: image(photo) }],
    user: admin._id,
  })));

  const ava = customerRecords.find((user) => user.email === 'ava.thompson@example.com');
  const noah = customerRecords.find((user) => user.email === 'noah.williams@example.com');
  if (!ava || !noah) throw new Error('Seed customers were not created');

  await Product.bulkWrite(products.slice(0, 6).map((product, index) => {
    const review = index % 2 === 0
      ? { user: ava._id, name: ava.name, rating: 5, comment: 'Beautiful quality and the fit is exactly as described.' }
      : { user: noah._id, name: noah.name, rating: 4, comment: 'Feels well made and arrived quickly. I would buy it again.' };
    return { updateOne: { filter: { _id: product._id }, update: { $set: { reviews: [review], numberOfReviews: 1, ratings: review.rating } } } };
  }));

  const orderItems = [products[0], products[4]].map((product) => ({
    name: product.name,
    quantity: 1,
    image: product.photos[0].secure_url,
    price: product.price,
    product: product._id,
  }));
  const subtotal = orderItems.reduce((total, item) => total + item.price, 0);
  await Order.create({
    user: ava._id,
    shippingInfo: { ...ava.addresses?.[0].toObject?.() || ava.addresses?.[0], phoneNo: '+14155550142' },
    orderItems,
    paymentInfo: { id: 'seed_payment_001' },
    taxAmount: Math.round(subtotal * 0.08),
    shippingAmount: 0,
    totalAmount: Math.round(subtotal * 1.08),
    orderStatus: 'delivered',
    deliveredAt: new Date('2026-08-28T14:30:00.000Z'),
  });

  console.log(`Seeded ${categories.length} categories, ${products.length} products, ${customerRecords.length + 1} users, and 1 order.`);
  console.log('Demo admin: admin@shopperave.test / ShopperAve123!');
  console.log('Demo customer: ava.thompson@example.com / ShopperAve123!');
};

seed()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
