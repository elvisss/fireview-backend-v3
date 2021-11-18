import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Tag from './tag.model';
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
}, {
	freezeTableName: true,
	timestamps: false,
});

export default Equipment;
