import { Link } from "react-router-dom";
import st from "./landing.module.css";
import logo from "../assets/images/socialsavvy-logo.png";
import whatIsSocialSavvy from '../assets/images/what-is-socialsavvy.png';
import benefitsSocialSavvy from '../assets/images/benefits-socialsavvy.png';
import effortless from '../assets/images/effortless.png';
import unified from '../assets/images/unified.png';
import insightful from '../assets/images/insightful.png';
import automated from '../assets/images/automated.png';
import scalability from '../assets/images/scalability.png';
import socialsavvyPerks from '../assets/images/socialsavvy-perks.png';


function Landing() {
  return (
    <>
      <div className={st.navbar}>
        <div className={st.logo}>
          <Link to ="/">
            <img src={logo} alt="SocialSavvy" />
          </Link>
        </div>
        <div className={st.header_menu}>
          <ul className={st.navigation}>
            <li ><Link to="/" className={st.links}>Resources</Link></li>
            <li ><Link to="/" className={st.links}>Features</Link></li>
            <li ><Link to="/" className={st.links}>Plan & Pricing</Link></li>
            <li ><Link to="/login" className={st.links}>Log In</Link></li>
            <Link to="/register" className={st.linkbtn}>
              <button className={st.signup_btn}>Get Started</button>
            </Link>
          </ul>
        </div>
      </div>
      <div className={st.hero}>
        <h1>Your Ultimate Social Media Marketing Manager - Create and Schedule Contents in One Stop</h1>
        <h3>Build and grow your digital presence with SocialSavvy. Streamline your marketing efforts across various social media platforms seamlessly.</h3>
        <Link to="/register" className={st.linkbtn}>
          <button className={st.signup_btn}>Join Us</button>
        </Link>
      </div>
      <div className={st.intro}>
        <h2>What is SocialSavvy?</h2>
        <img src={whatIsSocialSavvy} alt="What is SocialSavvy" />
        <h3>
          SocialSavvy is a content management system designed to assist entrepreneurs and individual businesses in streamlining ad management across multiple social media platforms. This system will allow entrepreneurs to create timed posts for their accounts while offering entrepreneurs valuable insights by recommending trending tags to increase audience engagement.
        </h3>
      </div>
      <div className={st.benefits}>
        <img src={benefitsSocialSavvy} alt="SocialSavvy Selling Points" />
        <div className={st.overlay}></div>
        <div className={st.list_benefits}>
          <div className={st.item}>
            <img src={effortless} alt="Icon 1" />
            <p>Effortless</p>
          </div>
          <div className={st.item}>
            <img src={unified} alt="Icon 2" />
            <p>Unified</p>
          </div>
          <div className={st.item}>
            <img src={insightful} alt="Icon 3" />
            <p>Insightful</p>
          </div>
          <div className={st.item}>
            <img src={automated} alt="Icon 4" />
            <p>Automated</p>
          </div>
          <div className={st.item}>
            <img src={scalability} alt="Icon 5" />
            <p>Scalable</p>
          </div>
        </div>
      </div>
      <div className={st.perks}>
        <img src={socialsavvyPerks} alt="Perks we offer" />
        <div className={st.list_perks}>
          <h2>The perks we offer</h2>
          <div className={st.item2}>
            <p>Schedule posts and manage content effortlessly with our automated tools.</p>
          </div>
          <div className={st.item2}>
            <p>Gain valuable insights with detailed performance reports and data-driven recommendations.</p>
          </div>
          <div className={st.item2}>
            <p>Manage all your social media accounts seamlessly from a single, unified platform.</p>
          </div>
        </div>
      </div>
      <footer>
        <div className={st.footer}>
          <div className={st.footer_content}>
            <div className={st.footer_left}>
              <img src={logo} alt="SocialSavvy" />
              <p>SocialSavvy strives to curate seamless experience in social media marketing management. Start your journey and <i>streamline content, amplify impact</i>.</p>
            </div>
            <div className={st.footer_right}>
              <div className={st.footer_container}>
                <p><strong>Resources</strong></p>
                <p><Link to="/">User Guide</Link></p>
                <p><Link to="/">FAQs</Link></p>
              </div>
              <div className={st.footer_container}>
                <p><strong>Features</strong></p>
                <p><Link to="/">Post Scheduling</Link></p>
                <p><Link to="/">Content Analysis</Link></p>
                <p><Link to="/">Engagement Analytics</Link></p>
              </div>
              <div className={st.footer_container}>
                <p><strong>Plan & Pricing</strong></p>
                <p><Link to="/">Subscriptions</Link></p>
                <p><Link to="/">Packages</Link></p>
              </div>
            </div>
          </div>
          <hr />
          <div className={st.copyright}>
            <small>&copy; 2024 SocialSavvy. All rights reserved.</small>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Landing;