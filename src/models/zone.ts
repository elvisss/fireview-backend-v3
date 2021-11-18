import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Zone = db.define('Zone', {
	idzone: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.STRING,
	},
}, {
	freezeTableName: true,
	timestamps: false
});

export default Zone;
