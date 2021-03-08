import Cache, { ICache } from '../models/cache';
import "dotenv/config";
const TTL = parseInt(<string>process.env.TTL, 10) || 86400000

export const allCache = async (): Promise<ICache[]> => {
	const caches = await Cache.find();
  return caches;
};

export const upsertCache = async (cache: ICache): Promise<ICache> => { 
  let finded;
  if (cache.key) {
    finded = await Cache.findOne({key: cache.key});
  }
  if (finded) {
    finded.ttl = new Date(Date.now() + TTL);
    finded.data = cache.data;
    return await finded.save();
  } else {
    cache.ttl = new Date(Date.now() + TTL);
    cache.key =  Math.random().toString(20);
    return await Cache.create(cache);
  }
};

export const getCache = async (key: string): Promise<ICache|null> => {
  const cache = await Cache.findOne({key: key}).exec();
  return cache;
};

export const deleteCache = async (key: string): Promise<ICache|null> => {
  const cache = await Cache.findOneAndDelete({key: key});
  return cache;
};

export const deleteAll = async () => {
  const deleted = await Cache.deleteMany();
  return deleted;
};

export const count = async () => {
  return await Cache.count({});
}

export const getLastTTL = async () => {
  const cache = await Cache.find({}).sort({ttl: 'desc'});
  return cache[0];
}
