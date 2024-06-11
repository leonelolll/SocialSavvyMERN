import React, { useEffect, useState } from 'react';
import './faq.css';

function Faq() {
  const [generalFaqs, setGeneralFaqs] = useState([]);
  const [accountFaqs, setAccountFaqs] = useState([]);
  const [securityFaqs, setSecurityFaqs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/faqs')
      .then(response => response.json())
      .then(data => {
        const general = [];
        const account = [];
        const security = [];
        
        data.faqs.forEach(faq => {
          if (faq.section === 'General') {
            general.push(faq);
          } else if (faq.section === 'Your Account') {
            account.push(faq);
          } else if (faq.section === 'Subscription') {
            security.push(faq);
          }
        });

        setGeneralFaqs(general);
        setAccountFaqs(account);
        setSecurityFaqs(security);
      })
      .catch(error => console.error('Error fetching FAQs:', error));
  }, []);

  const renderFaqSection = (faqs, sectionTitle, sectionIcon) => (
    <div className="part mb-8">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-xl-10">
            <div className="d-flex align-items-end mb-5">
              <i className={`bi ${sectionIcon} me-3 lh-1 display-5`}></i>
              <h3 className="m-0">{sectionTitle}</h3>
            </div>
          </div>
          <div className="col-11 col-xl-10">
            <div className="accordion accordion-flush" id={`faq${sectionTitle.replace(' ', '')}`}>
              {faqs.map((faq, index) => (
                <div className="accordion-item bg-transparent border-bottom py-3" key={faq._id}>
                  <h2 className="accordion-header" id={`faq${sectionTitle.replace(' ', '')}Heading${index}`}>
                    <button
                      className="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq${sectionTitle.replace(' ', '')}Collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`faq${sectionTitle.replace(' ', '')}Collapse${index}`}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`faq${sectionTitle.replace(' ', '')}Collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`faq${sectionTitle.replace(' ', '')}Heading${index}`}
                  >
                    <div className="accordion-body">
                      <p>{faq.anwser}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="side-nav">
        <div className="logo">
          <img src="images/logo.png" className="user-img" alt="Logo" />
          <h2>socialsavvy</h2>
        </div>
        <ul className="menu p-0">
          <li className="active"><a href="dashboard.html"><img src="images/dashboard.svg" alt="Dashboard" /><p className='m-0'>Dashboard</p></a></li>
          <li><a href="post.html"><img src="images/post.svg" alt="Post" /><p className='m-0'>Post</p></a></li>
          <li><a href="calendar.html"><img src="images/calendar.svg" alt="Calendar" /><p className='m-0'>Calendar</p></a></li>
          <li><a href="analysis.html"><img src="images/analysis.svg" alt="Analysis" /><p className='m-0'>Analysis</p></a></li>
          <li><a href="viral-content.html"><img src="images/flame.svg" alt="Viral Content" /><p className='m-0'>Viral Content</p></a></li>
          <li><a href="payment.html"><img src="images/payment-methods.svg" alt="Subscription" /><p className='m-0'>Subscription</p></a></li>
          <li><a href="settings.html"><img src="images/settings.svg" alt="Settings" /><p className='m-0'>Settings</p></a></li>
        </ul>
        <hr />
        <ul className="logout p-0">
          <li><p>Logout</p></li>
        </ul>
      </div>

      <div className="background">
        <div className="top">
          <div className="dropdown">
            <button className="dropbtn">Help  &#11206;</button>
            <div className="dropdown-content">
              <a href="faq.html">FAQ</a>
              <a href="feedback.html">Feedback</a>
              <a href="helpdesk.html">Help Desk</a>
            </div>
          </div>
          <div className="right">
            <button className="rightbtn">&#11206; Hi, user<img src="images/user.png" alt="User" /></button>
            <div className="right-content">
              <a href="profile.html"><h4 className="name">user</h4><p className="email">user@gmail.com</p></a>
              <a href="edit-profile.html">Edit Profile</a>
              <a href="#" /* onClick={() => confirmLogout()} */>Log Out</a>
            </div>
          </div>
        </div>

        <div className="content">
          <section className="bsb-faq-3 py-3 py-md-5 py-xl-8">
            <div className="container">
              <div className="row justify-content-md-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                  <h2 className="mb-4 display-5 text-center">Frequently Asked Questions</h2>
                  <p className="text-secondary text-center lead fs-4">Welcome to our FAQ page, your one-stop resource for answers to commonly asked questions.</p>
                  <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
                </div>
              </div>
            </div>
            <div className="sectionType">
                {renderFaqSection(generalFaqs, 'General', 'bi-building-fill-gear')}
                {renderFaqSection(accountFaqs, 'Account', 'bi-person-gear')}
                {renderFaqSection(securityFaqs, 'Subscription', 'bi bi-coin')}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Faq;