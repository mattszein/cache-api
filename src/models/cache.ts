import mongoose, { Schema, Document } from 'mongoose';
import "dotenv/config";

const generateRandomString = () => {
  return Math.random().toString(20);
}

const TTL = parseInt(<string>process.env.TTL, 10) || 86400000

export interface ICache {
  key?: string;
  data: string;
  ttl?: Date;
}

type CacheType = ICache & mongoose.Document;
const CacheSchema: Schema = new Schema({
  key: { type: String, index: true, unique: true, default: generateRandomString()},
  data: { type: String, required: true, default: generateRandomString},
  ttl: { type: Date, default: (new Date(Date.now() + TTL)) },
});

// Export the model and return your Cache interface
export default mongoose.model<CacheType>('Cache', CacheSchema);

