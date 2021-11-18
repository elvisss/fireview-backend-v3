import Equipment from '../models/equipment.model';
import Zone from '../models/zone.model';

Equipment.belongsTo(Zone, {
	foreignKey: 'zoneId',
	as: 'zone',
});

Zone.hasMany(Equipment, {
	as: 'equipments',
});

export { Equipment, Zone };
