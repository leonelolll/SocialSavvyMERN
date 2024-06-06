import React, { useState } from 'react';

function ChangePlan() {
  const [modalVisible, setModalVisible] = useState({
    upgradeModal: false,
    successPlanModal: false,
    cancelModal: false,
    confirmationCancelSubsModal: false,
  });

  const toggleModal = (modalId, state) => {
    setModalVisible((prev) => ({ ...prev, [modalId]: state }));
  };

  const handlePlanChange = (event) => {
    const selectedPlan = event.target.value;
    if (selectedPlan !== "") {
      toggleModal('upgradeModal', false); // Close the upgradeModal when a plan is selected
      toggleModal('successPlanModal', true); // Show the success message modal
    }
  };

  return (
    <div className="container">
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
        <button id="cancelSubscription" onClick={() => toggleModal('cancelModal', true)}>Cancel Subscription</button>
      </div>

      {modalVisible.upgradeModal && (
        <div id="upgradeModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => toggleModal('upgradeModal', false)}>&times;</span>
            <h2>Choose Your Desired Plan</h2>
            <select id="planDropdown" onChange={handlePlanChange}>
              <option value="">Select a plan</option>
              <option value="Basic">Basic Plan</option>
              <option value="Premium">Premium Plan</option>
              <option value="Business">Business Plan</option>
            </select>
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
                toggleModal('confirmationCancelSubsModal', true);
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
    </div>
  );
}

export default ChangePlan;
