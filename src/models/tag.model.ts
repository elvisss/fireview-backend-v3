import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Tag = db.define('Tag', {
	idtag: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
    equipment_idequipment: {
        type: DataTypes.INTEGER,
    },
	tagName: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.STRING,
	},
}, {
	freezeTableName: true,
	timestamps: false
});

export default Tag;
