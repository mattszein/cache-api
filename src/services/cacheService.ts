import Cache, { ICache } from '../models/cache';

export const allCache = async (): Promise<ICache[]> => {
	const caches = await Cache.find();
  return caches;
};

export const upsertCache = async (cache: ICache): Promise<ICache> => { 
   return await Cache.findOneAndUpdate({key: cache.key}, cache, {
  new: true,
  upsert: true // Make this update into an upsert
});
}

export const getCache = async (key: string): Promise<ICache|null> => {
  const cache = await Cache.findOne({key: key});
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
