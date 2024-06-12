import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import s from "../dashboard/dashboard.module.css";
import Layout from "../shared/Layout.jsx"

import linkedin from "../assets/images/linkedin-logo.png"
import instagram from "../assets/images/instagram-logo.png"
import facebook from "../assets/images/facebook-logo.jpeg"
import tiktok from "../assets/images/tiktok-logo.jpg"
import SideBar from "../analysisComponents/sidebar.js";

function Dashboard() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [activeTab, setActiveTab] = useState('Today');
  const [lineStyle, setLineStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef([]);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        // // Check if authentication token exists in cookies
        // if (!cookies.token) {
        //   throw new Error("Authentication token not found");
        // }

        // Fetch dashboard data from the backend
        const res = await fetch("/main-backend/auth/dashboard", {
          method: "POST",
          credentials: "include",
        });

        // Check if the request was successful
        if (!res.ok) {
          throw new Error("Failed to authenticate");
        }

        // Parse response data
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error(error);

        // Notify user of authentication failure
        toast.error("Failed to authenticate. Redirecting to login page...");

        // Redirect to the login page
        navigate("/login");
      }
    };

    // Call the function to verify authentication on component mount
    verifyCookie();
  }, [cookies.token, navigate, removeCookie]);

  useEffect(() => {
    // Set initial line style based on the active tab
    updateLinePosition();
  }, [activeTab]);

  const updateLinePosition = () => {
    if (tabRefs.current[0]) {
      const activeTabRef = tabRefs.current.find((ref) => ref.innerText === activeTab);
      if (activeTabRef) {
        setLineStyle({
          width: activeTabRef.offsetWidth + "px",
          left: activeTabRef.offsetLeft + "px",
        });
      }
    }
  };

  const confirmLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // If the user confirms, redirect to the logout page
      removeCookie("token");
      navigate("/login");
    }
  };

  return (
    <Layout>
      <div className={s.header}>
        <div className={s.user_greetings}>
          <h1>Hi, user!</h1>
        </div>

        <div className={s.soc_med_and_subscription}>
          <div className={s.link_soc_med}>
            <div className={s.link_content}>
              <div className={s.link_title}>
                <p>Manage linked social media</p>
              </div>
              <div className={s.link_description}>
                <p>Connect your social media accounts to seamlessly share your content across platforms with
                  just a click!</p>
              </div>
              <button className={s.link_btn} id="manage-btn" >Manage</button>
            </div>
            <div className={s.right_column}>
              <p>Platforms connected:</p>
              <div className={s.soc_med_container}>
                <div className={s.soc_med_icons}>
                  <img src={linkedin} alt="LinkedIn logo" />
                </div>
                <div className={s.soc_med_icons}>
                  <img src={instagram} alt="Instagram logo" />
                </div>
                <div className={s.soc_med_icons}>
                  <img src={facebook} alt="Facebook logo" />
                </div>
                <div className={s.soc_med_icons}>
                  <img src={tiktok} alt="TikTok logo" />
                </div>
              </div>
            </div>
          </div>

          <div className={s.subscription_plan}>
            <div className={s.payment_content}>
              <div className={s.payment_title}>
                <p>Your current subscription plan</p>
              </div>
              <div className={s.payment_plan}>
                <h2>Premium</h2>
              </div>
              <div className={s.payment_description}>
                <p>Your next bill is for RM 29.99 on 23/04/2024</p>
              </div>
              <button  className={s.payment_btn}>View</button>
            </div>
          </div>
        </div>

        <div className={s.analytics_box}>
          <div className={s.analytics_box_title}>
            <p>Engagement Analytics</p>
          </div>
          <div className={s.analytics_content}>
            <div className={s.pattern} id="pattern1">
              <h3>Content Performance Analysis</h3>
              <canvas id="Chart1"></canvas>
            </div>
          </div>
          <div className={s.right_column}>
            <div className={s.pattern} id="pattern2">
              <h3>Click-Through Rate Analysis</h3>
              <canvas id="Chart2"></canvas>
            </div>
          </div >
          <button className={s.analytics_btn}>View more</button>
        </div >

        <div className={s.scheduled_postings}>
          <div className={s.scheduled_content}>
            <div className={s.scheduled_title}>
              <p>Scheduled Postings</p>
            </div>
            <div className={s.tab_container}>
              <div className={s.tab_box}>
                {['Today', 'Week', 'Month'].map((tab, index) => (
                  <button
                    key={tab}
                    ref={(el) => tabRefs.current[index] = el}
                    className={`${s.tab_button} ${activeTab === tab ? s.active : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
                <div className={s.line} style={lineStyle}></div>
              </div>
              <div className={s.content_box}>
                <div className={`${s.tab_content} ${activeTab === 'Today' ? s.active : ''}`}>
                  <h3>Today</h3>
                  <div className={s.tab1_notice}>
                    <p>There are no scheduled contents for today!</p>
                  </div>
                </div>

                <div className={`${s.tab_content} ${activeTab === 'Week' ? s.active : ''}`}>
                  <h3>Week</h3>
                  <div className={s.tab1_notice}>
                    <p><Link to="/calendar" className="a">End Of Season Sports Clearance Sale</Link></p>
                    <p><small>Scheduled on 26th April 2024</small></p>
                    <p><small><i>Platform: Instagram, Facebook</i></small></p>
                  </div>
                </div>

                <div className={`${s.tab_content} ${activeTab === 'Month' ? s.active : ''}`}>
                  <h3>Month</h3>
                  <div className={s.tab1_notice}>
                    <p><Link to="/calendar">End Of Season Sports Clearance Sale</Link></p>
                    <p><small>Scheduled on 26th April 2024</small></p>
                    <p><small><i>Platform: Instagram, Facebook</i></small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.my_posts}>
          <div className={s.posts_content}>
            <div className={s.posts_title}>
              <p>My Posts</p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div >
    </Layout>
  );
};

export default Dashboard;