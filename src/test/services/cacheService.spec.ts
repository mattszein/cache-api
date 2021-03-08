import request from "supertest"
import { expect } from "chai"
import "dotenv/config";

import {allCache, upsertCache, getCache, deleteCache, deleteAll} from '../../services/cacheService';
import Cache, { ICache } from '../../models/cache';

import {connect as connectDB, clearDatabase} from "../dbHandler";

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/test?authSource=admin`;

before(async () => await connectDB(url));
afterEach(async () => await clearDatabase());

const generateInputs = (number: Number) => {
  let array = []
  for (let step = 0; step < number; step++) {
    array.push({key: `key-${step}`, data: `data-${step}`});
  }
  return array; 
}
 
describe("get all caches", function(){
  it("should return empty array because no cache added", async function () {
    const elements = await allCache();
    expect(elements).to.be.an('array').that.is.empty;
  });
});

describe("create cache", function() {
  it('Should create a cache', async () => {
    const generatedElement = generateInputs(1)[0];
    const cacheUpsert = await upsertCache(generatedElement);
    expect(cacheUpsert.data).to.equal(generatedElement.data);
    const cache = await getCache(generatedElement.key);
    expect(cache).to.not.equal(null);
    if (cache) {
      expect(cache.data).to.equal(generatedElement.data);
    }
  });
});

describe("remove a element", function() {
  it('Should remove a element in cache', async () => {
		const generatedElements = generateInputs(1);
    generatedElements.forEach(async element =>  await Cache.create(element));
    const cache = await deleteCache(generatedElements[0].key);
    const elements = await allCache();
    expect(elements).that.is.empty; 
  });
});

describe("remove all elements", function() {
  it('Should remove all elements in cache', async () => {
    const generatedElements = generateInputs(8);
    generatedElements.forEach(async element =>  await upsertCache(element));
    const cache = await deleteAll();
    expect(cache).to.not.equal(null);
    const elements = await allCache();
    expect(elements).that.is.empty; 
  });
});
