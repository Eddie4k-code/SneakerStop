import { MongoMemoryServer } from "mongodb-memory-server";
import { beforeAll, beforeEach, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import { app } from "..";
import jwt from 'jsonwebtoken';


let mongo: MongoMemoryServer;


declare global {
  var signin: (userId?: string) => string[];
}

global.signin = (userId?: string) => {

  const payload = {
    id: userId || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET!);

  const session = {jwt: token};

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');  

  return [`session=${base64}`];

}


beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
}, 20000);

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
}, 20000);