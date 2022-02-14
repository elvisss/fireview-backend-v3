import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Zone from './zone.model';

const Equipment = db.define('Equipment', {
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
    zoneId: {
        type: DataTypes.INTEGER,
		references: {
			model: Zone,
			key: 'zoneId'
		}
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
	axisX: {
		type: DataTypes.DECIMAL,
	},
	axisY: {
		type: DataTypes.DECIMAL,
	},
	equipmentPosition: {
		type: DataTypes.STRING,
	},
	latitude: {
		type: DataTypes.DECIMAL(8,6),
	},
	longitude: {
		type: DataTypes.DECIMAL(9,6),
	},
	value: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
	},
	Acknowledge: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
}, {
	freezeTableName: true,
	timestamps: false,
});

export default Equipment;
