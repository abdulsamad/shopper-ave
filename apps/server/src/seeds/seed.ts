import path from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

import Category from '@models/category';
import Order from '@models/order';
import Product from '@models/product';
import User from '@models/user';

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || path.resolve(__dirname, '../../.env') });
mongoose.set('strictQuery', false);

const startedAt = Date.now();
const demoPassword = 'ShopperAve123!';
const imageFolder = process.env.PRODUCT_IMAGES_FOLDER_NAME || 'products';
const log = (message: string) => console.log(`[seed +${Date.now() - startedAt}ms] ${message}`);
const fail = (message: string): never => { throw new Error(message); };

const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];
const customers = [
  { name: 'Ava Thompson', email: 'ava.thompson@example.com', address: '1428 Market Street', city: 'San Francisco', postalCode: '94102', state: 'California', phoneNo: '+14155550142' },
  { name: 'Noah Williams', email: 'noah.williams@example.com', address: '88 Bedford Avenue', city: 'Brooklyn', postalCode: '11211', state: 'New York', phoneNo: '+17185550188' },
  { name: 'Mia Rodriguez', email: 'mia.rodriguez@example.com', address: '321 Congress Avenue', city: 'Austin', postalCode: '78701', state: 'Texas', phoneNo: '+15125550127' },
  { name: 'Ethan Patel', email: 'ethan.patel@example.com', address: '450 W Madison Street', city: 'Chicago', postalCode: '60661', state: 'Illinois', phoneNo: '+13125550164' },
];

type SeedProduct = {
  name: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  stock: number;
  color: string;
};

const products: SeedProduct[] = [
  { name: 'Everyday Cotton Overshirt', price: 6800, description: 'A soft brushed-cotton overshirt with a relaxed fit, corozo buttons, and a clean utility pocket.', category: 'Tops', brand: 'Northline', stock: 34, color: '#d8c2a6' },
  { name: 'Ribbed Knit Midi Dress', price: 8900, description: 'A versatile ribbed midi dress with a softly shaped waist and comfortable stretch for everyday wear.', category: 'Dresses', brand: 'Lumen', stock: 18, color: '#b88e93' },
  { name: 'Relaxed Pleat Trousers', price: 7600, description: 'High-waisted pleated trousers cut from a lightweight twill with a relaxed straight leg and front crease.', category: 'Bottoms', brand: 'Northline', stock: 27, color: '#9ca9b8' },
  { name: 'Cropped Utility Jacket', price: 12900, description: 'A water-resistant cropped jacket with roomy patch pockets, matte hardware, and an adjustable hem.', category: 'Outerwear', brand: 'Fieldwork', stock: 12, color: '#7d8d72' },
  { name: 'Leather Court Sneakers', price: 9400, description: 'Minimal low-top sneakers in smooth leather with a cushioned footbed and durable rubber cupsole.', category: 'Shoes', brand: 'Common Form', stock: 21, color: '#d9d5c9' },
  { name: 'Recycled Nylon Day Bag', price: 4900, description: 'A lightweight everyday carryall with a padded laptop sleeve, internal zip pocket, and wide shoulder strap.', category: 'Accessories', brand: 'Carryall', stock: 41, color: '#3f4d5a' },
  { name: 'Merino Crewneck Sweater', price: 9900, description: 'A fine-gauge merino-wool crewneck with a regular fit, ribbed trim, and naturally breathable comfort.', category: 'Tops', brand: 'Lumen', stock: 16, color: '#c2b8a8' },
  { name: 'Washed Straight-Leg Jeans', price: 7200, description: 'Classic five-pocket jeans in durable organic denim with a mid rise and an easy straight-leg profile.', category: 'Bottoms', brand: 'Northline', stock: 30, color: '#58718b' },
  { name: 'Linen Camp Collar Shirt', price: 6100, description: 'A breathable linen shirt with a relaxed camp collar, subtle texture, and a slightly boxy silhouette.', category: 'Tops', brand: 'Fieldwork', stock: 24, color: '#e0b26d' },
  { name: 'Satin Slip Skirt', price: 5700, description: 'A fluid satin slip skirt with an elasticated back waist and a versatile midi length for day or evening.', category: 'Bottoms', brand: 'Lumen', stock: 19, color: '#7c879d' },
  { name: 'Suede Chelsea Boots', price: 14800, description: 'An everyday Chelsea boot in soft suede with elastic side panels, a stacked heel, and a lugged outsole.', category: 'Shoes', brand: 'Common Form', stock: 9, color: '#8c6049' },
  { name: 'Wool Blend Beanie', price: 3200, description: 'A warm rib-knit beanie made from a soft wool blend with a shallow cuff and understated woven label.', category: 'Accessories', brand: 'Carryall', stock: 46, color: '#b86f54' },
];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[character] || character));

const makeCatalogArtwork = (product: SeedProduct) => `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100">
  <rect width="900" height="1100" fill="#f3f0ea"/><rect x="48" y="48" width="804" height="1004" rx="18" fill="${product.color}"/>
  <circle cx="700" cy="240" r="160" fill="#ffffff" fill-opacity=".18"/>
  <path d="M255 900c30-170 85-282 195-340 110 58 165 170 195 340H255Z" fill="#2f3540" fill-opacity=".9"/>
  <path d="M365 563c25 42 55 63 85 63s60-21 85-63" fill="none" stroke="#f5eee3" stroke-width="14" stroke-linecap="round"/>
  <text x="92" y="130" font-family="Arial, sans-serif" font-size="24" letter-spacing="5" fill="#2f3540">SHOPPER AVE</text>
  <text x="92" y="930" font-family="Arial, sans-serif" font-size="20" letter-spacing="4" fill="#f5eee3">${escapeXml(product.category.toUpperCase())}</text>
  <text x="92" y="975" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#ffffff">${escapeXml(product.name)}</text>
  <text x="92" y="1018" font-family="Arial, sans-serif" font-size="18" letter-spacing="2" fill="#f5eee3">CURATED EVERYDAY ESSENTIALS</text>
</svg>`;

const configureCloudinary = () => {
  const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) fail('CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are required to seed product images.');
  cloudinary.config({ cloud_name: CLOUDINARY_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET, secure: true });
};

const uploadProductImage = async (product: SeedProduct) => {
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(makeCatalogArtwork(product)).toString('base64')}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: imageFolder,
    public_id: `seed-${slugify(product.name)}`,
    resource_type: 'image',
    format: 'svg',
    overwrite: true,
    invalidate: true,
  });
  return { id: result.public_id, secure_url: result.secure_url };
};

const connect = async () => {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) fail('MONGODB_URI is empty. Set it in apps/server/.env before running the seed.');
  const authority = uri.split('://')[1]?.split('/')[0] || '';
  if ((authority.match(/@/g) || []).length > 1) fail('MONGODB_URI contains an unescaped @ in username or password. Encode it as %40, then retry.');
  log('connecting MongoDB');
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000, connectTimeoutMS: 10000, socketTimeoutMS: 20000, maxPoolSize: 2, minPoolSize: 0 });
  log(`connected to ${mongoose.connection.host}/${mongoose.connection.name}`);
};

const seed = async () => {
  log(`starting with pid=${process.pid}, node=${process.version}`);
  configureCloudinary();
  await connect();
  const passwordHash = await bcrypt.hash(demoPassword, 10);

  const admin = await User.findOneAndUpdate(
    { email: 'admin@shopperave.test' },
    { name: 'Shopper Ave Admin', email: 'admin@shopperave.test', password: passwordHash, role: 'admin', addresses: [] },
    { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
  );

  await User.bulkWrite(customers.map((customer) => ({
    updateOne: {
      filter: { email: customer.email },
      update: { $set: { name: customer.name, email: customer.email, password: passwordHash, role: 'user', addresses: [{ address: customer.address, city: customer.city, postalCode: customer.postalCode, state: customer.state, country: 'United States' }] } },
      upsert: true,
    },
  })));
  const customerRecords = await User.find({ email: { $in: customers.map(({ email }) => email) } });
  log(`users ready: ${customerRecords.length + 1}`);

  await Order.deleteMany({ user: { $in: customerRecords.map((customer) => customer._id) } });
  await Product.deleteMany({ user: admin._id });
  await Category.bulkWrite(categories.map((name) => ({ updateOne: { filter: { name }, update: { $set: { name } }, upsert: true } })));

  log(`uploading ${products.length} product images to Cloudinary`);
  const uploadedImages = await Promise.all(products.map(uploadProductImage));
  const insertedProducts = await Product.insertMany(products.map((product, index) => ({ ...product, photos: [uploadedImages[index]], user: admin._id })));
  log(`inserted ${insertedProducts.length} products`);

  const customerByEmail = new Map(customerRecords.map((customer) => [customer.email, customer]));
  const ava = customerByEmail.get('ava.thompson@example.com');
  const noah = customerByEmail.get('noah.williams@example.com');
  const mia = customerByEmail.get('mia.rodriguez@example.com');
  const ethan = customerByEmail.get('ethan.patel@example.com');
  if (!ava || !noah || !mia || !ethan) fail('seed customers were not created');

  const reviewTemplates = [
    { user: ava, rating: 5, comment: 'Beautiful quality and the fit is exactly as described.' },
    { user: noah, rating: 4, comment: 'Feels well made, arrived quickly, and works with everything I own.' },
    { user: mia, rating: 5, comment: 'The fabric feels much nicer than I expected for the price.' },
    { user: ethan, rating: 4, comment: 'Great everyday piece. I would happily order from this brand again.' },
  ];
  await Product.bulkWrite(insertedProducts.map((product, index) => {
    const review = reviewTemplates[index % reviewTemplates.length];
    return { updateOne: { filter: { _id: product._id }, update: { $set: { reviews: [{ user: review.user._id, name: review.user.name, rating: review.rating, comment: review.comment }], numberOfReviews: 1, ratings: review.rating } } } };
  }));

  const createOrder = async (user: NonNullable<typeof ava>, productIndexes: number[], status: 'delivered' | 'dispatched', paymentId: string, date: string) => {
    const orderItems = productIndexes.map((index) => ({ name: insertedProducts[index].name, quantity: index % 2 === 0 ? 1 : 2, image: insertedProducts[index].photos[0].secure_url, price: insertedProducts[index].price, product: insertedProducts[index]._id }));
    const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingAmount = subtotal >= 10000 ? 0 : 799;
    const taxAmount = Math.round(subtotal * 0.08);
    await Order.create({
      user: user._id,
      shippingInfo: { address: user.addresses[0].address, city: user.addresses[0].city, phoneNo: customers.find(({ email }) => email === user.email)?.phoneNo, postalCode: user.addresses[0].postalCode, state: user.addresses[0].state, country: 'United States' },
      orderItems, paymentInfo: { id: paymentId }, taxAmount, shippingAmount, totalAmount: subtotal + taxAmount + shippingAmount,
      orderStatus: status, deliveredAt: status === 'delivered' ? new Date(date) : undefined, createdAt: new Date(date), updatedAt: new Date(date),
    });
  };
  await createOrder(ava, [0, 4], 'delivered', 'seed_payment_001', '2026-08-28T14:30:00.000Z');
  await createOrder(noah, [2, 7], 'delivered', 'seed_payment_002', '2026-08-31T09:15:00.000Z');
  await createOrder(mia, [1, 5, 11], 'dispatched', 'seed_payment_003', '2026-09-03T16:45:00.000Z');
  await createOrder(ethan, [3, 6], 'delivered', 'seed_payment_004', '2026-08-22T11:00:00.000Z');
  log('created 4 demo orders');
  console.log(`Demo admin: admin@shopperave.test / ${demoPassword}`);
  console.log(`Demo customer: ava.thompson@example.com / ${demoPassword}`);
};

const main = async () => {
  try { await seed(); } catch (error) {
    console.error(`[seed] failed: ${error instanceof Error ? error.message : error}`);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) { log('closing MongoDB connection'); await mongoose.connection.close(); }
    log('exiting');
  }
};

void main();
