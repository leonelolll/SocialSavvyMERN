import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();

    const confirmLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            navigate('/login');
        }
    };

    return (
        <div className="side-nav">
            <div className="logo">
                <img src="../../assets/images/logo.png" className="user-img" alt="socialsavvy logo"/>
                <h2>socialsavvy</h2>
            </div>
            <ul className="menu">
                <li className="active"><Link to="/dashboard"><img src="../../assets/images/dashboard.svg" alt="navigate dashboard" />
                    <p>Dashboard</p>
                </Link></li>
                <li><Link to="post.html"><img src="../../assets/images/post.svg" alt="navigate post" />
                    <p>Posts</p>
                </Link></li>
                <li><Link to="calendar.html"><img src="../../assets/images/calendar.svg" alt="navigate calendar" />
                    <p>Calendar</p>
                </Link></li>
                <li><Link to="analysis.html"><img src="../../assets/images/analysis.svg" alt="navigate analysis" />
                    <p>Analytics</p>
                </Link></li>
                <li><Link to="viral-content.html"><img src="../../assets/images/flame.svg" alt="navigate viral content" />
                    <p>Viral Content</p>
                </Link></li>
                <li><Link to="payment.html"><img src="../../assets/images/payment-methods.svg" alt="navigate subscription" />
                    <p>Subscription</p>
                </Link></li>
                <li><Link to="edit-profile.html"><img src="../../assets/images/settings.svg" alt="navigate settings" />
                    <p>Settings</p>
                </Link></li>
            </ul>
            <hr />
            <ul className="logout">
                <li><Link to="/login"></Link>
                    <p>Logout</p>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar