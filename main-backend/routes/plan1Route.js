import express from 'express';
import { getAllPlans, getPlanById} from '../controller/plan1Controller.js'

const router = express.Router();

router.get("/getAllPlans",getAllPlans);
router.get("/plan/:id",getPlanById);

export default router;
