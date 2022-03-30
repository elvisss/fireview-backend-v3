import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Zone = db.define('zone', {
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
	value: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	data_sensor: {
		type: DataTypes.DECIMAL(4,2),
		defaultValue: 0,
	}
}, {
	freezeTableName: true,
	timestamps: false,
});

export default Zone;
