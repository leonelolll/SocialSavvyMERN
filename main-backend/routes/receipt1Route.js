import express from 'express';
import { getAllReceipts, getReceiptByNumber} from '../controller/receipt1Controller.js'

const router = express.Router();

router.get("/getAllReceipts",getAllReceipts);
router.get("/receipts/:receiptNumber",getReceiptByNumber);

export default router;

