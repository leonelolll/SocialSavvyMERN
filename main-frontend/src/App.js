import FAQ from "./faq/faq.js"
import Helpdesk from "./Helpdesk/Helpdesk.js"
import Feedback from "./feedback/feedback.jsx"
import Analysis from "./analysisPage/Analysis"
import React from 'react'
import Landing from './landing/Landing.jsx'
import Register from './uauth/Register.jsx'
import Login from './uauth/Login.jsx'
import ForgetPass from './uauth/ForgetPass.jsx'
import OTPVerif from './uauth/OTPVerif.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
// import Layout from './shared/Layout.jsx'
import {Routes, Route} from 'react-router-dom'


function App() {
  return (
    <Routes>
      <Route path='/' element = {<Landing/>}/>
      <Route path='/register' element = {<Register/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/forgetpass' element = {<ForgetPass/>}/>
      <Route path='/otpverif' element = {<OTPVerif/>}/>
      <Route 
        path='/dashboard.html' 
        element = {
          // <Layout>
          // </Layout>
        <Dashboard/>
        }
      />
      <Route path='/analysis.html' element={<Analysis/>}/>
      <Route path='/faq' element = {<FAQ/>}/>
      <Route path='/helpdesk.html' element = {<Helpdesk/>}/>
      <Route path='/feedback.html' element = {<Feedback/>}/>
    </Routes>
  );
}

export default App;
