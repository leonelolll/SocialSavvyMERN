import React, { useState } from 'react';

function Subscription() {
  const [modalVisible, setModalVisible] = useState({
    confirmationModal: false,
    successModal: false,
    
  });

  
  const toggleModal = (modalId, state) => {
    setModalVisible((prev) => ({ ...prev, [modalId]: state }));
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    toggleModal('confirmationModal', true);
  };



  return (
    <div className="container">
      {/* Current Plan Display */}
      <div className="displayPlan">
        <div className="heading-container">
          <h3>Your Current Subscription Plan</h3>
          <h2>Premium</h2>
          <h4>Your next bill is for RM 99.99 on 23/04/2024</h4>
          <button className="buttonContainer"></button>
        <button type="button" name="myButton" className="viewButton">Pay Now</button>
        
        </div>
      </div>

      {/* Payment Form */}
      <div className="form-container">
        <div className="payment-form">
          <form id="paymentForm" onSubmit={handleFormSubmission}>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number*</label>
              <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required />
            </div>
            <div className="form-group">
              <label htmlFor="cardHolder">Card Holder*</label>
              <input type="text" id="cardHolder" name="cardHolder" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="expDate">Expiration Date*</label>
              <input type="text" id="expDate" name="expDate" placeholder="MM/YY" required />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV*</label>
              <input type="text" id="cvv" name="cvv" placeholder="123" required />
            </div>
            <div className="form-group">
              <input type="submit" value="Update Card Information" />
            </div>
          </form>
        </div>
      </div>

      {/* Modals */}
      {modalVisible.confirmationModal && (
        <div id="confirmationModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => toggleModal('confirmationModal', false)}>&times;</span>
            <h2>Confirm Form Submission</h2>
            <p>Are you sure you want to update your card information?</p>
            <div className="subscription-actions">
              <button id="confirmSubmission" onClick={() => {
                console.log('Confirmed submission');
                toggleModal('confirmationModal', false);
                toggleModal('successModal', true);
              }}>Yes, Update Information</button>
              <button className="cancelButton" onClick={() => toggleModal('confirmationModal', false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {modalVisible.successModal && (
        <div id="successModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => toggleModal('successModal', false)}>&times;</span>
            <h2>Success</h2>
            <p>Card information successfully updated!</p>
          </div>
        </div>
      )}

      {/* Additional content like Receipt History and other modals */}
    </div>
  );
}



export default Subscription;
