import express, { Application } from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { config } from '../config';
import zoneRoutes from '../routes/zone';
import equipmentRoutes from '../routes/equipment.route';
import db from '../db/connection';
import cors from 'cors';

class Server {
	private app: Application;
	private httpServer: http.Server;
	private port: string | number;
	private apiPaths = {
		zones: '/api/zones',
		equipments: '/api/equipments',
	};

	constructor() {
		this.app = express();
		this.httpServer = http.createServer(this.app);
		this.port = config.port;

		// Métodos iniciales
		this.dbConnection();
		this.webSockets();
		this.middlewares();
		this.routes();
	}

	async dbConnection() {
		try {
			await db.authenticate();
			console.log('Database online');
		} catch (error: any) {
			console.log('dbConnection');
			throw new Error(error);
		}
	}

	async webSockets() {
		try {
			const io = new socketIO.Server(this.httpServer, {
				cors: {
					origin: "http://localhost:8080",
					methods: ["GET", "POST"]
				}
			});
			io.on("connection", (socket) => {
				socket.on('disconnect', () => {
					console.log('user disconnected');
				});

				socket.emit('name', 'Elvis');
			});
		}
		catch (error: any) {
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
		this.app.use(this.apiPaths.equipments, equipmentRoutes);
	}

	listen() {
		this.httpServer.listen(this.port, () => {
			console.log('Servidor corriendo en puerto ' + this.port);
		});
	}
}

export default Server;
