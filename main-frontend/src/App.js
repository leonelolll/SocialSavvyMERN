<<<<<<< HEAD
import FAQ from "./faq/faq.js"
import Helpdesk from "./Helpdesk/Helpdesk.js"
import Feedback from "./feedback/feedback.jsx"
import Analysis from "./analysisPage/Analysis";
import React from 'react'
import Landing from './landing/Landing.jsx'
import Register from './uauth/Register.jsx'
import Login from './uauth/Login.jsx'
import ForgetPass from './uauth/ForgetPass.jsx'
import OTPVerif from './uauth/OTPVerif.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
// import Layout from './shared/Layout.jsx'
import {Routes, Route} from 'react-router-dom'
=======
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SubscriptionPage from './SubscriptionFolder/SubscriptionPage';
>>>>>>> 2c0aaf2a4d3b733172effe371d8a01e2fb5e2860


function App() {
  return (
<<<<<<< HEAD
    <Routes>
      <Route path='/' element = {<Landing/>}/>
      <Route path='/register' element = {<Register/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/forgetpass' element = {<ForgetPass/>}/>
      <Route path='/otpverif' element = {<OTPVerif/>}/>
      <Route 
        path='/dashboard' 
        element = {
          // <Layout>
          // </Layout>
        <Dashboard/>
        }
      />
      <Route path='/analysis' element={<Analysis/>}/>
      <Route path='/faq' element = {<FAQ/>}/>
      <Route path='/helpdesk' element = {<Helpdesk/>}/>
      <Route path='/feedback' element = {<Feedback/>}/>
    </Routes>
  );
=======
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubscriptionPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
>>>>>>> 2c0aaf2a4d3b733172effe371d8a01e2fb5e2860
}

export default App;
