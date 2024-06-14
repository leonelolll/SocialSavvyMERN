import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe('pk_test_51POKtIKQg5ex9zFSn0xw6QzstJNaG19kBEbljR6i0JmI7EYLYMuXlfKTU4zoulCCpQIyBzyGzQK9F7khMe8hhLtf00zdkBnTRS');

function Subscription() {
  const [plans, setPlans] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [modalVisible, setModalVisible] = useState({
    confirmationModal: false,
    successModal: false,
    receiptModal: false,
    upgradeModal: false,
    successPlanModal: false,
    cancelModal: false,
    confirmationCancelSubsModal: false,
    failedModal:false,
    successPayModal:false,
  });

  const toggleModal = async (modalId, state, receiptNumber = null) => {
    if (receiptNumber) {
      try {
        const response = await fetch(`http://localhost:4000/receipts/${receiptNumber}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch receipt details: ${response.status}`);
        }
        const data = await response.json();
        setSelectedReceipt(data); // Update selectedReceipt with the fetched details
        console.log('Fetched receipt details:', data); // Log fetched data
      } catch (error) {
        console.error('Error fetching receipt details:', error);
      }
    }
    setModalVisible((prev) => ({ ...prev, [modalId]: state }));
  };
  
  
  const generatePDF = async (receiptNum) => {
  console.log(`Generating PDF for receipt number: ${receiptNum}`);
  
  if (!receiptNum) {
    console.error('Error: receiptNumber is undefined');
    return;
  }

  try {
    const response = await fetch(`http://localhost:4000/api/receipts/${receiptNum}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch receipt details: ${response.status}`);
    }
    const receipt = await response.json();
    console.log('Fetched receipt details:', receipt);
    
    // Ensure receipt details are valid
    if (!receipt || typeof receipt !== 'object') {
      throw new Error('Invalid receipt data received');
    }

    // Access receipt properties only if receipt data is valid
    const { receiptNumber, date, amountPaid } = receipt;

    // Create a temporary HTML element to render the receipt data
    const receiptElement = document.createElement('div');
    receiptElement.style.width = '210mm';  // A4 width
    receiptElement.style.height = '297mm'; // A4 height
    receiptElement.style.padding = '10mm'; // Padding for better readability
    receiptElement.style.background = 'white'; // Background color for clarity
    receiptElement.innerHTML = `
      <h1>Receipt #${receiptNumber}</h1>
      <p>Date: ${date}</p>
      <p>Amount Paid: ${amountPaid}</p>
      <!-- Add more fields as needed -->
    `;

    document.body.appendChild(receiptElement); // Append to body to ensure it's in the DOM

    const canvas = await html2canvas(receiptElement);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save(`receipt_${receiptNumber}.pdf`);

    document.body.removeChild(receiptElement); // Clean up the temporary element
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

  

  const handleCloseModal = () => {
    setModalVisible((prev) => ({ ...prev, receiptModal: false }));
    setSelectedReceipt(null); // Reset selectedReceipt to null when the modal is closed
  };
  

const handlePlanChange = (event) => {
  setSelectedPlan(event.target.value);
};

const fetchPlans = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/plans'); // Updated path
    if (!response.ok) {
      throw new Error(`Failed to fetch plans: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched plans:', data);
    setPlans(data);
  } catch (error) {
    console.error('Error fetching plans:', error);
  }
};

const fetchReceipts = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/receipts');
    if (!response.ok) {
      throw new Error(`Failed to fetch receipts: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched receipts:', data);
    setReceipts(data);  // Assuming data is already an array of receipt objects
  } catch (error) {
    console.error('Error fetching receipts:', error);
  }
};




useEffect(() => {
  fetchPlans();
  fetchReceipts();
}, []);

console.log('Current receipts state:', receipts);

const handleUpdateClick = async () => {
  try {
    const response = await fetch('http://localhost:4000/update-subscription', {
      priceId: selectedPlan,
    });

    if (response.ok) {
      toggleModal('upgradeModal', false);
      toggleModal('successPlanModal', true);
    } else {
      const errorData = await response.json();
      console.error('Error updating subscription:', errorData.message);
    }
  } catch (error) {
    console.error('Error updating subscription:', error.message);
  }
};

  const handleFormSubmission = (event) => {
    event.preventDefault();
    toggleModal('confirmationModal', true);
  };

  const handleSubscription = async () => {
   
    const stripe = await stripePromise;
    try {
      const response = await fetch(
        "http://localhost:4000/create-subscription",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            priceId: selectedPlan,
             //retrieve user method from login/db
          }),
        }
      );
  
      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        if (response.status === 404) {
          console.error('Error: The requested resource was not found.');
        } else if (response.status === 500) {
          console.error('Error: There was a problem with the server.');
        }
        return;
      }
  
      if (response.status === 409) {
        const data = await response.json();
        if (data && data.redirectUrl) {
          window.location.href = data.redirectUrl;
        }
      } else {
        const session = await response.json();
        await stripe.redirectToCheckout({ sessionId: session.id });
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await fetch('http://localhost:4000/cancel-subscription', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerEmail: 'sofea@gmail.com' }), // Ensure this is the correct email
      });

      if (response.ok) {
        toggleModal('confirmationCancelSubsModal', true);
      } else {
        const errorData = await response.json();
        console.error('Error cancelling subscription:', errorData.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="background">
      <div className="container">
      <div className="displayPlan">
        <div className="heading-container">
          <h3>Your Current Subscription Plan</h3>
          <h2>Premium</h2> 
          
        </div>
      </div>

      <div className="receipt-history">
        <h2>Receipt History</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Receipt Number</th>
              <th>Date</th>
              <th>Amount Paid</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{receipts.map((receipt) => {
  console.log('Receipt:', receipt);
  return (
    <tr key={receipt.receiptNumber}>
      <td>{receipt.receiptNumber}</td>
      <td>{receipt.date}</td>
      <td>{receipt.amountPaid}</td>
      {/* <td className="buttonContainer">
        <button
          type="button"
          onClick={() => generatePDF(receipt.receiptNumber)}>
          Generate PDF
        </button> 
      </td> */}
    </tr>
  );
})}

        </tbody>
        </table>
      </div>

      <div className="price-table">
        <h2>Subscription Plan Comparison</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Price</th>
              <th>Users</th>
              <th>Social Profiles</th>
              <th>Posts per Month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic</td>
              <td>RM 59.99/month</td>
              <td>1</td>
              <td>3</td>
              <td>50</td>
            </tr>
            <tr className="current-plan">
              <td>Premium</td>
              <td>RM 99.99/month</td>
              <td>3</td>
              <td>10</td>
              <td>150</td>
            </tr>
            <tr>
              <td>Business</td>
              <td>RM 199.99/month</td>
              <td>5</td>
              <td>Unlimited</td>
              <td>Unlimited</td>
            </tr>
          </tbody>
        </table>
      </div>

    <div className="subscription-actions">
      <button id="upgradeSubscription" onClick={() => toggleModal('upgradeModal', true)}>Upgrade Subscription</button>
      {/* <button id="cancelSubscription" onClick={() => toggleModal('cancelModal', true)}>Cancel Subscription</button> */}
    </div>

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


      {/* Modal for receipt */}
      {modalVisible.receiptModal && selectedReceipt && (
  <div id="receiptModal" className="modal" style={{ display: 'block' }}>
    <div className="modal-content">
      <span className="close" onClick={() => toggleModal('receiptModal', false)}>
        &times;
      </span>
      <h2>Receipt Details</h2>
      <h3>Date: {selectedReceipt.date}</h3>
      <h3>Receipt Number: {selectedReceipt.receiptNumber}</h3>
      <h3>Payment Method: {selectedReceipt.paymentMethod}</h3>
      <h3>Retailer: {selectedReceipt.retailer}</h3>
      <h3>Address: {selectedReceipt.address}</h3>
      <h3>VAT ID: {selectedReceipt.vatId}</h3>
      <h3>Product: {selectedReceipt.product}</h3>
      <h3>Total: {selectedReceipt.amountPaid}</h3>
    </div>
  </div>
)}




{modalVisible.upgradeModal && (
          <div id="upgradeModal" className="modal" style={{ display: 'block' }}>
            <div className="modal-content">
              <span className="close" onClick={() => toggleModal('upgradeModal', false)}>&times;</span>
              <h2>Choose Your Desired Plan</h2>
              <select id="planDropdown" onChange={handlePlanChange}>
  <option value="">Select a plan</option>
  {plans.map(plan => (
    <option key={plan._id} value={plan.priceId}>{plan.name}</option>
  ))}
</select>
<button type="button" className="payButton" onClick={() => handleSubscription()} 
    style={{
        backgroundColor: '#F3EAFF',
        padding: '8px 15px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        textDecoration: 'none',
        fontFamily: "'Inter', sans-serif",
        position: 'absolute',
        right: '10px', 
        top: '10px',
    }}
>
  Pay Now 
</button>
            </div>
          </div>
        )}

      {modalVisible.successPlanModal && (
        <div id="successPlanModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => toggleModal('successPlanModal', false)}>&times;</span>
            <h2>Successfully Changed!</h2>
          </div>
        </div>
      )}

{modalVisible.cancelModal && (
        <div id="cancelModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => toggleModal('cancelModal', false)}>&times;</span>
            <h2>Cancel Subscription</h2>
            <p>Are You Sure You Want to Cancel Your Subscription?</p>
            <div className="subscription-actions">
              <button id="confirmCancel" onClick={() => {
                toggleModal('cancelModal', false);
                handleCancelSubscription();
              }}>Yes, Cancel</button>
              <button className="keepSubsButton" onClick={() => toggleModal('cancelModal', false)}>No, Keep Subscription</button>
            </div>
          </div>
        </div>
      )}

      {modalVisible.confirmationCancelSubsModal && (
        <div id="confirmationCancelSubsModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => toggleModal('confirmationCancelSubsModal', false)}>&times;</span>
            <h2>Subscription Cancelled</h2>
            <p>Your subscription has been successfully cancelled.</p>
          </div>
        </div>
      )}

      {modalVisible.failedModal&& (
        <div id="failedModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => toggleModal('failedModal', false)}>&times;</span>
            <h2>Payment Failed</h2>
            <p>There was an issue with your payment. Please try again.</p>
          </div>
        </div>
      )}

      {modalVisible.successModal && (
        <div id="successPayModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => toggleModal('successPayModal', false)}>&times;</span>
            <h2>Success</h2>
            <p>Your payment has been received!</p>
          </div>
        </div>
      )}
      </div>
    </div>
      
      
  );
}

export default Subscription;
