import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SubscriptionPage from './SubscriptionFolder/SubscriptionPage';


function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubscriptionPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
