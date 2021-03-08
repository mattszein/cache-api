import { Router, Request, Response } from "express";
import {allCache, upsertCache, getCache, deleteCache, deleteAll, count as cacheCount, getLastTTL} from '../services/cacheService';

const router = Router();

const addCache = async (cache: {key?: string, data: string}) => { 
	return await upsertCache(cache);	
}

const validateAmount = async (amount: Number) : Promise<Boolean> => {
	const elements = await cacheCount();
	return elements < amount
}

// @route GET CACHE /:key
// @desc Authenticate a user
// @access PUBLIC
router.get("/cache/:key", async (req: Request, res: Response) => {
	try { 
	let validateTTL = false;
	const cache = await getCache(req.params.key);
	if (typeof cache !== 'undefined') {
		validateTTL = (cache? cache.ttl? (cache.ttl > new Date()) : false : false);
	}
	if ( cache && validateTTL) {
		console.log('Cache Hint');
		res.status(200);
		res.send({data: cache.data});
	} else {
		console.log('Cache Miss');
		const random = Math.random().toString(20);
		const validationAmount = await validateAmount(120);
		let added;
		if (validationAmount) {
			 added = await addCache({data: random});
		} else {
			const last = await getLastTTL(); // Overwritten OLD TTL
			added = await addCache({key: last.key, data: random});	
		}
		console.log(added);
		res.status(201);
		res.send({data: added.data});
	}
	}catch(err) {
		res.status(500);
		res.send({error: err});
	}
});

// @route GET CACHE /:key
// @desc Authenticate a user
// @access PUBLIC
router.post("/cache/:key", async (req: Request, res: Response) => {
	try { 
	const {data} = req.body;
	if (!data) res.status(400).send({error: 'no data provided'});
	let validateTTL = false;
	const cache = await getCache(req.params.key);
	if (typeof cache !== 'undefined') {
		validateTTL = (cache? cache.ttl? (cache.ttl > new Date()) : false : false);
	}
	const validationAmount = await validateAmount(120);
	let added;
	if ( cache && validateTTL ) {
		added = await addCache({key: req.params.key, data: data})
		res.status(200);
	}else {	
		res.status(201);
		if (validationAmount) {
			added = await addCache({data: data});
		} else {
			const last = await getLastTTL(); // Overwritten OLD TTL
			added = await addCache({key: last.key, data: data});
		}
	}
		res.send({data: added.data});
	}
	catch(err) {
		res.status(500);
		res.send({error: err});
	}
});

// @route GET /
// @desc get keys
// @access PUBLIC
router.get("/cache", async (req: Request, res: Response) => {
	try { 
		const cache = await allCache();
		res.status(200);
		res.send(cache.map( element => element.key));
	}catch(err) {
		res.status(400);
		res.send({error: err});
	}
});


// @route DELETE /cache/deleteAll
// @desc delete all elements on cache
// @access PUBLIC
router.delete("/cache/deleteAll", async (req: Request, res: Response) => {
	try { 
		const cache = await deleteAll();
		console.log(cache);
		res.status(202).send({'delete': 'true'});

	}catch(err) {
		res.status(500);
		res.send({error: err});
	}
});

// @route DELETE /cache/:key
// @desc delete element with key on cache
// @access PUBLIC
router.delete("/cache/:key", async (req: Request, res: Response) => {
	try { 
		const cache = await deleteCache(req.params.key);
		if (cache) {
			res.status(202).send({'delete': 'true'});
		}else{
			res.status(204).send({'delete': 'false'});
		}	
	}catch(err) {
		res.status(500);
		res.send({error: err});
	}
});

export default router
