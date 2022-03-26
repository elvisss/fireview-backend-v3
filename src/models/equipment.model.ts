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
	axisX: {
		type: DataTypes.DECIMAL(9,6),
	},
	axisY: {
		type: DataTypes.DECIMAL(9,6),
	},
	equipmentPosition: {
		type: DataTypes.STRING,
	},
	value: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
	},
	acknowledge: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
}, {
	freezeTableName: true,
	timestamps: false,
});

export default Equipment;
