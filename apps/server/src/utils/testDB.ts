import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

/* istanbul ignore file */
const mongod = MongoMemoryServer.create();

export const connect = async () => {
  const url = (await mongod).getUri();
  const conn = await mongoose.connect(url);

  return conn;
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongod).stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
