import FAQ from "./faq/faq.jsx"
import Helpdesk from "./helpdesk/Helpdesk.js"
import Feedback from "./feedback/feedback.jsx"
import Analysis from "./analysisPage/Analysis"
import React from 'react'
import Landing from './landing/Landing.jsx'
import Register from './uauth/Register.jsx'
import Login from './uauth/Login.jsx'
import ForgetPass from './uauth/ForgetPass.jsx'
import OTPVerif from './uauth/OTPVerif.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
import Post from './PostsPage/Post';
import CreatePost from './CreatePostPage/CreatePost.jsx';
import Calendar from './CalendarPage/Calendar.jsx';
import ContentAnalysis from './ContentAnalysis/ContentAnalysis.jsx';
import SubscriptionPage from './SubscriptionFolder/SubscriptionPage.js';
// import Layout from './shared/Layout.jsx'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Routes>
      
      <Route path='/analysis' element={<Analysis/>}/>
      <Route path='/faq' element = {<FAQ/>}/>
      <Route path='/helpdesk' element = {<Helpdesk/>}/>
      <Route path='/feedback' element = {<Feedback/>}/>
      <Route path='/' element={<Landing />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgetpass' element={<ForgetPass />} />
      <Route path='/otpverif' element={<OTPVerif />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/analysis.html' element={<Analysis />} />
      <Route path='/post' element={<Post />} />
      <Route path='/post/createpost' element={<CreatePost />} />
      <Route path='/calendar' element={<Calendar />} />
      <Route path='/ContentAnalysis' element={<ContentAnalysis />} />
      <Route path='/analysis' element={<Analysis />} />
      <Route path='/dashboard/faq' element={<FAQ />} />
      <Route path='/dashboard/helpdesk' element={<Helpdesk />} />
      <Route path='/dashboard/feedback' element={<Feedback />} />
      <Route path="/payment" element={<SubscriptionPage />} />    
    </Routes>
  );
}

export default App;
