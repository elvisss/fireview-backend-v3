import { Router } from 'express';
import {
	getZone,
	getZones,
	postZone,
	putZone,
	deleteZone,
} from '../controllers/zone';

const router = Router();

router.get('/', getZones);
router.get('/:id', getZone);
router.post('/', postZone);
router.put('/:id', putZone);
router.delete('/:id', deleteZone);

export default router;
