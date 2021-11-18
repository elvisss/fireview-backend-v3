import { Request, Response } from 'express';
import { Equipment } from '../db/associations';

export const getEquipments = async (_req: Request, res: Response) => {
	try {
		const equipments = await Equipment.findAll({ include: ['zone'] });
		res.json(equipments);
	} catch (error: any) {
		console.log({ error });
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};
