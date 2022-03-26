import MySQLEvents from '@rodrigogs/mysql-events';
import express, { Application } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import http from 'http';
import Websocket from './websocket';
import socketIO from 'socket.io';
import { config } from '../config';
import zoneRoutes from '../routes/zone.route';
import equipmentRoutes from '../routes/equipment.route';
import db from '../db/connection';

class Server {
	private app: Application;
	private httpServer: http.Server;
	private io: socketIO.Server;
	private port: string | number;
	private apiPaths = {
		zones: '/api/zones',
		equipments: '/api/equipments',
	};

	constructor() {
		this.app = express();
		this.port = config.port;
		this.httpServer = http.createServer(this.app);
		this.io = Websocket.getInstance(this.httpServer);

		// Métodos iniciales
		this.webSockets();
		this.dbConnection();
		this.middlewares();
		this.routes();
	}

	async webSockets() {
		try {
			this.io.on("connection", (socket) => {
				socket.on('disconnect', () => {
					console.log('user disconnected');
				});
				socket.emit('name', 'Elvis');
			});
		}
		catch (error: any) {
			console.log({ error });
			throw new Error(error);
		}
	}

	async dbConnection() {
		try {
			await db.authenticate();
			const connection = mysql.createConnection({
				database: 'mydb',
				host: 'localhost',
				port: 3306,
				user: 'root',
				password: 'Admin123!',
			});

			const instance = new MySQLEvents(connection, {
				startAtEnd: true // to record only the new binary logs, if set to false or you didn'y provide it all the events will be console.logged after you start the app
			});

			await instance.start();

			instance.addTrigger({
				name: 'monitoring all statments',
				expression: '*',
				statement: MySQLEvents.STATEMENTS.ALL,
				onEvent: (e: any) => {
					const io = Websocket.getInstance();
					io.emit('test', e);
				}
			});

			instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
			instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
		} catch (error: any) {
			console.log('error dbConection', error);
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
