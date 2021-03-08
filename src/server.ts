import express, {Application, Request, Response, NextFunction} from 'express';
import morgan from 'morgan'; 
import Helmet from "helmet";
import routes from "routes/index";

const loadMiddlewares = (app: Application) => {
	app.use(Helmet());
	if(process.env.NODE_ENV === 'dev'){
		app.use(morgan("dev")); // log requests to the console
	}
  app.use(express.json()); // parse application/json
}

export default function createServer() : Application{
	const app: Application = express();
	loadMiddlewares(app);

	app.use(routes);

	return app;
}
