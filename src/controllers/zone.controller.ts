import { Request, Response } from 'express';
import { Zone } from '../db/associations';

export const getZones = async (_req: Request, res: Response) => {
	try {
		const zones = await Zone.findAll({ include: ['equipments'] });
		res.json(zones);
	} catch (error: any) {
		console.log({ error });
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

export const getZone = async (req: Request, res: Response) => {
	const { id } = req.params;

	const zone = await Zone.findByPk(id, { include: ['equipments'] });

	if (zone) {
		res.json(zone);
	} else {
		res.status(404).json({
			msg: `No existe la zona con el id ${id}`,
		});
	}
};

export const postZone = async (req: Request, res: Response) => {
	const { body } = req;
	console.log({ body });

	try {
		const zone = await Zone.create(body);
		res.json(zone);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

export const putZone = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { body } = req;

	try {
		const zone = await Zone.findByPk(id);
		if (!zone) {
			return res.status(404).json({
				msg: 'No existe un usuario con el id ' + id,
			});
		}

		await zone.update(body);

		res.json(zone);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

export const deleteZone = async (req: Request, res: Response) => {
	const { id } = req.params;

	const zone = await Zone.findByPk(id);
	if (!zone) {
		return res.status(404).json({
			msg: 'No existe la zona con el id ' + id,
		});
	}

	// await zone.update({ estado: false });

	await zone.destroy();

	res.json(zone);
};
