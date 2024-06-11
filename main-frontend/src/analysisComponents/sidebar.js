export default function SideBar(){
    return(
        <div className="side-nav">
        <div className="logo">
          <img src="images/logo.png" className="user-img" alt="logo" />
          <h2>socialsavvy</h2>
        </div>
        <ul className="menu">
          <li><a href="dashboard.html"><img src="images/dashboard.svg" alt="dashboard"/><p>Dashboard</p></a></li>
          <li><a href="post.html"><img src="images/post.svg" alt="post"/><p>Post</p></a></li>
          <li><a href="calendar.html"><img src="images/calendar.svg" alt="calendar"/><p>Calendar</p></a></li>
          <li className="active"><a href="analysis.html"><img src="images/analysis.svg" alt="analysis"/><p>Analytics</p></a></li>
          <li><a href="viral-content.html"><img src="images/flame.svg" alt="viral content"/><p>Viral Content</p></a></li>
          <li><a href="payment.html"><img src="images/payment-methods.svg" alt="payment"/><p>Subscription</p></a></li>
          <li><a href="edit-profile.html"><img src="images/settings.svg" alt="settings"/><p>Settings</p></a></li>
        </ul>
        <hr/>
        <ul className="logout">
          <li><p>Logout</p></li>
        </ul>
      </div>
    )
}