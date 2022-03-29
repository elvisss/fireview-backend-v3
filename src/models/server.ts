import MySQLEvents from '@rodrigogs/mysql-events';
import express, { Application } from 'express';
import cors from 'cors';
import http from 'http';
import Websocket from './websocket';
import socketIO from 'socket.io';
import { config } from '../config';
import zoneRoutes from '../routes/zone.route';
import equipmentRoutes from '../routes/equipment.route';
import db from '../db/connection';
import * as socket from '../sockets/socket';
import Marker from './marker.model';

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
		this.listenSockets();
		this.dbConnection();
		this.middlewares();
		this.routes();
	}

	private listenSockets() {
		this.io.on('connection', (client) => {
			socket.googleMapSockets(client);
		});
	}

	async dbConnection() {
		try {
			await db.authenticate();

			const dsn = {
				host: '127.0.0.1',
				port: 3306,
				user: 'root',
				password: 'root',
			}

			const instance = new MySQLEvents(dsn, {
				startAtEnd: true
			});

			await instance.start();

			instance.addTrigger({
				name: 'monitoring all statments',
				expression: '*',
				statement: MySQLEvents.STATEMENTS.ALL,
				onEvent: (e: any) => {
					const io = Websocket.getInstance();
					const zoneUpdated = e.affectedRows[0].after;
					const marker: Marker = {
						id: String(zoneUpdated.id),
						name: zoneUpdated.title,
						lat: zoneUpdated.latitude,
						lng: zoneUpdated.longitude,
						value: zoneUpdated.value,
						data_sensor: zoneUpdated.data_sensor
					}
					/* console.log(marker); */
					io.emit('marker-update', marker);
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
		this.app.use(express.urlencoded({ extended: true }));
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
