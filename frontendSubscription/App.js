import React from 'react';

import './Subscription_App.css';
import SideNav from './components/SideNav';
import TopBar from './components/TopBar';
import Subscription from './components/Subscription';
import ReceiptHistory from './components/ReceiptHistory.js';
import ChangePlan from './components/ChangePlan.js';


function App() {
  return (
    <div>
    <SideNav />
    <div className="background">
      <TopBar />
      <Subscription />
      <ReceiptHistory />
      <ChangePlan />
    </div>
  </div>
  );
}

export default App;
