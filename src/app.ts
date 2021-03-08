import "dotenv/config";
import express, { Application, Request, Response, NextFunction } from "express";
import connect from "./db";
import createServer from "server";

const startServer = () => {
	const app: Application = createServer();
	const port: number = parseInt(<string>process.env.PORT, 10) || 8081
	app.listen(port, () => {
		console.log(`server running on port ${port}`);
	});
}

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

connect(url);

startServer();
