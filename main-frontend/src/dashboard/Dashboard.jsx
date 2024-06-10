import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
// import "./dashboard.css";


function Dashboard() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

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

  const confirmLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // If the user confirms, redirect to the logout page
      removeCookie("token");
      navigate("/login");
    }
  };

  return (
    <div className="header">
      <div className="user-greetings">
        <h1>Hi, user!</h1>
      </div>

      <div className="link-soc-med">
        <div className="link-content">
          <div className="link-title">
            <p>Manage linked social media</p>
          </div>
          <div className="link-description">
            <p>Connect your social media accounts to seamlessly share your content across platforms with
              just a
              click!</p>
          </div>
          <button className="link-btn" id="manage-btn">Manage</button>
        </div>
        <div className="right-column">
          <p>Platforms connected:</p>
          <div className="soc-med-container">
            <div className="soc-med-icons">
              <img src="../../assets/images/linkedin-logo.png" alt="LinkedIn logo" />
            </div>
            <div className="soc-med-icons">
              <img src="../../assets/images/instagram-logo.png" alt="Instagram logo" />
            </div>
            <div className="soc-med-icons">
              <img src="../../assets/images/facebook-logo.jpeg" alt="Facebook logo" />
            </div>
            <div className="soc-med-icons">
              <img src="../../assets/images/tiktok-logo.jpg" alt="TikTok logo" />
            </div>
          </div>
        </div>
      </div>

      <div className="subscription-plan">
        <div className="payment-content">
          <div className="payment-title">
            <p>Your current subscription plan</p>
          </div>
          <div className="payment-plan">
            <h2>Premium</h2>
          </div>
          <div className="payment-description">
            <p>Your next bill is for RM 29.99 on 23/04/2024</p>
          </div>
          <button className="payment-btn">Pay now</button>
        </div>
      </div>

      <div className="analytics-box">
        <div className="analytics-box-title">
          <p>Engagement Analytics</p>
        </div>
        <div className="analytics-content">
          <div className="pattern" id="pattern1">
            <h3>Content Performance Analysis</h3>
            <canvas id="Chart1"></canvas>
          </div>
        </div>
        <div className="right-column">
          <div className="pattern" id="pattern2">
            <h3>Click-Through Rate Analysis</h3>
            <canvas id="Chart2"></canvas>
          </div>
        </div>
        <button className="analytics-btn">View more</button>
      </div>

      <div className="scheduled-postings">
        <div className="scheduled-content">
          <div className="scheduled-title">
            <p>Scheduled Postings</p>
          </div>
          <div className="tab-container">
            <div className="tab-box">
              <button className="tab-button active">Today</button>
              <button className="tab-button">Week</button>
              <button className="tab-button">Month</button>
              <div className="line"></div>
            </div>
            <div className="content-box">
              <div className="tab-content active">
                <h3>Today</h3>
                <div className="tab1-notice">
                  <p>There are no scheduled contents for today!</p>
                </div>
              </div>

              <div className="tab-content">
                <h3>Week</h3>
                <div className="tab1-notice">
                  <p><Link to="/calendar">End Of Season Sports Clearance Sale</Link></p>
                  <p><small>Scheduled on 26th April 2024</small></p>
                  <p><small><i>Platform: Instagram, Facebook</i></small></p>
                </div>
              </div>

              <div className="tab-content">
                <h3>Month</h3>
                <div className="tab1-notice">
                  <p><Link to="/calendar">End Of Season Sports Clearance Sale</Link></p>
                  <p><small>Scheduled on 26th April 2024</small></p>
                  <p><small><i>Platform: Instagram, Facebook</i></small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-posts">
        <div className="posts-content">
          <div className="posts-title">
            <p>My Posts</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;