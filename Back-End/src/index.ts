import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { Request, Response } from 'express';
import * as helmet from 'helmet';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Routes } from './routes';
var cookieParser = require('cookie-parser');

createConnection()
	.then(async connection => {
		// create express app
		require('express-async-errors');
		const app = express();
		app.use(cookieParser());
		app.use(cors());
		app.use(helmet());
		app.use(bodyParser.json());
		app.use(
			bodyParser.urlencoded({
				extended: false
			})
		);

		// register express routes from defined application routes
		Routes.forEach(route => {
			// tslint:disable-next-line: ban-types
			(app as any)[route.method](
				route.route,
				(req: Request, res: Response, next: Function) => {
					// tslint:disable-next-line: new-parens
					const result = new (route.controller as any)()[route.action](
						req,
						res,
						next
					);
					if (result instanceof Promise) {
						result.then(result =>
							result !== null && result !== undefined
								? res.send(result)
								: undefined
						);
					} else if (result !== null && result !== undefined) {
						res.json(result);
					}
				}
			);
		});

		// setup express app here
		// ...

		// start express server
		app.listen(4000);

		// tslint:disable-next-line: no-console
		console.log(
			'Express server has started on port 4000. Open http://localhost:4000/users to see results'
		);

		// tslint:disable-next-line: no-console
	})
	.catch(error => console.log(error));
