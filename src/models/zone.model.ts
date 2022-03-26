import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Zone = db.define('Zone', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.STRING,
	},
	type: {
		type: DataTypes.STRING,
	},
	latitude: {
		type: DataTypes.DECIMAL(8,6),
	},
	longitude: {
		type: DataTypes.DECIMAL(9,6),
	},
	axisX: {
		type: DataTypes.DECIMAL(9,6),
	},
	axisY: {
		type: DataTypes.DECIMAL(9,6),
	},
}, {
	freezeTableName: true,
	timestamps: false,
});

export default Zone;
