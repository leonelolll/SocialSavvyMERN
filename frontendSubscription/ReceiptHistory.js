
import React, { useState } from 'react';

function ReceiptHistory() {
  const [modalVisible, setModalVisible] = useState({
    receiptModal: false,
  });

  const toggleModal = (modalId, state) => {
    setModalVisible((prev) => ({ ...prev, [modalId]: state }));
  };

  return (
    <div className="container">
      <div className="receipt-history">
        <h2>Receipt History</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Receipt Number</th>
              <th>Date</th>
              <th>Amount Paid</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#12345</td>
              <td>23/03/2024</td>
              <td>RM 99.99</td>
              <td className="buttonContainer">
                {/* Button with onClick handler */}
                <button
                  type="button"
                  className="viewButton"
                  onClick={() => toggleModal('receiptModal', true)}
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal for receipt */}
      {modalVisible.receiptModal && (
        <div id="receiptModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => toggleModal('receiptModal', false)}>
              ×
            </span>
            <h2>Receipt Details</h2>
            <h3>Date: 23 March 2024</h3>
            <h3>Receipt Number: #12345</h3>
            <h3>Payment Method: Card (#### #### #### ####)</h3>
            <h3>Retailer: SocialSavvy</h3>
            <h3>Address: Bangsar, Kuala Lumpur</h3>
            <h3>VAT ID: 19000003</h3>
            <h3>Product: Premium Plan</h3>
            <h3>Total: MYR 99.99</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReceiptHistory;

