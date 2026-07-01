import express from 'express';
import { assessSymptoms } from '../controllers/triageController.js';

const router = express.Router();

router.post('/assess', assessSymptoms);

export default router;
