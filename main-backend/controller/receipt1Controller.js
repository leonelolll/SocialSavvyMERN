import receipts from '../model/receiptModel.js';

// Get all receipts
export const getAllReceipts = async (req, res) => {
  try {
    console.log('Fetching all receipts');
    res.status(200).json(receipts);
  } catch (error) {
    console.error('Error fetching receipts:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get a specific receipt by receipt number
export const getReceiptByNumber = async (req, res) => {
  try {
    const receiptNumber = req.params.receiptNumber;
    console.log(`Fetching receipt with number: ${receiptNumber}`);
    const receipt = receipts.find(receipt => receipt.receiptNumber === receiptNumber);
    if (!receipt) {
      console.log('Receipt not found');
      return res.status(404).json({ message: 'Receipt not found' });
    }
    res.status(200).json(receipt);
  } catch (error) {
    console.error('Error fetching receipt by number:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
