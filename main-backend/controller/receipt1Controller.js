import receipts from '../models/receiptModel.js';

// Get all receipts
export const getAllReceipts = async(req, res) => {
    res.status(200).json(receipts);
};

// Get a specific receipt by receipt number
export const getReceiptByNumber = async(req, res) => {
    const receiptNumber = req.params.receiptNumber;
    const receipt = receipts.find(receipt => receipt.receiptNumber === receiptNumber);
    if (!receipt) {
        return res.status(404).json({ message: 'Receipt not found' });
    }
    res.status(200).json(receipt);
};
