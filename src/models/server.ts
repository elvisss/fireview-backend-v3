import express, { Application } from 'express';
import { config } from '../config';
import zoneRoutes from '../routes/zone';
import db from '../db/connection';
import cors from 'cors';

class Server {
	private app: Application;
	private port: string | number;
	private apiPaths = {
		zones: '/api/zones',
	};

	constructor() {
		this.app = express();
		this.port = config.port;

		// Métodos iniciales
		this.dbConnection();
		this.middlewares();
		this.routes();
	}

	async dbConnection() {
		try {
			await db.authenticate();
			console.log('Database online');
		} catch (error: any) {
			throw new Error(error);
		}
	}

	middlewares() {
		// CORS
		this.app.use(cors());
		// Lectura del body
		this.app.use(express.json());
		// parse application/x-www-form-urlencoded
		this.app.use(express.urlencoded());
		// Carpeta pública
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.apiPaths.zones, zoneRoutes);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('Servidor corriendo en puerto ' + this.port);
		});
	}
}

export default Server;
