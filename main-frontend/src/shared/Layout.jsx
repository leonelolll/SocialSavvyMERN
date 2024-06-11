import React from 'react';
import Sidebar from './Sidebar';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// function Layout({ children }) {
//   return (
//     <div className='layout'>
//       <Sidebar />
//       <div className='content'>
//         {children}
//       </div>
//     </div>
//   );
// }

function Layout() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const confirmLogout = () => {
      const confirmLogout = window.confirm("Are you sure you want to log out?");
      if (confirmLogout) {
          navigate('/login');
      }
  };

  return (
    <div className="background">
        <div className="top">
          <div className="dropdown">
            <button className="dropbtn">Help &#11206</button>
            <div className="dropdown-content">
              <Link to="/faq">FAQ</Link>
              <Link to="/feedback">Feedback</Link>
              <Link to="/helpdesk">Help Desk</Link>
            </div>
          </div>
          <div className="right">
            <button className="rightbtn">
              &#11206 Hi, user
              <img src="../../assets/images/user.png" />
            </button>
            <div className="right-content">
              <Link to="/profile">
                <h4 className="name">user</h4>
                <p className="email">user@gmail.com</p>
              </Link>
              <Link to="/editprofile">Edit Profile</Link>
              <Link to="/login" >Log Out</Link>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Layout;