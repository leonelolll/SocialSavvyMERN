import "./feedback.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Feedback = () => {

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [comment, setComment] = useState("");
  const [showAddFeedback, setShowAddFeedback] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/feedbacks");
      setFeedback(response.data);
    } catch (error) {
      console.log("Error while fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStarRating = (rating) => {
    setRating(rating);
  };

  const toggleAddFeedback = () => {
    setShowAddFeedback(!showAddFeedback);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/createFeedback",
        {
          name,
          rating,
          comment
        }
      );

      fetchData();
      toast.success(response.data.message, { position: "top-center" });
      navigate("/");
      setShowAddFeedback(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="side-nav">
        <div className="logo">
          <img src="{logo}" className="user-img" />
          <h2>socialsavvy</h2>
        </div>
        <ul className="p-0 menu">
          <li className="active">
            <a href="dashboard.html" className="text-decoration-none">
              <img src="{dashboard}" />
              <p className="mb-0">Dashboard</p>
            </a>
          </li>
          <li className="text-decoration-none">
            <a href="post.html" className="text-decoration-none">
              <img src="{post}" />
              <p className="mb-0">Post</p>
            </a>
          </li>
          <li className="text-decoration-none">
            <a href="calendar.html" className="text-decoration-none">
              <img src="{calender}" />
              <p className="mb-0">Calendar</p>
            </a>
          </li>
          <li className="text-decoration-none">
            <a href="analysis.html" className="text-decoration-none">
              <img src="{analysis}" />
              <p className="mb-0">Analysis</p>
            </a>
          </li>
          <li className="text-decoration-none">
            <a href="viral-content.html" className="text-decoration-none">
              <img src="{viralcontent}" />
              <p className="mb-0">Viral Content</p>
            </a>
          </li>
          <li className="text-decoration-none">
            <a href="payment.html" className="text-decoration-none">
              <img src="{payment}" />
              <p className="mb-0">Subscription</p>
            </a>
          </li>
          <li className="text-decoration-none">
            <a href="settings.html" className="text-decoration-none">
              <img src="{settings}" />
              <p className="mb-0">Settings</p>
            </a>
          </li>
        </ul>
        <hr />
        <ul className="p-0 logout">
          <li>
            <p>Logout</p>
          </li>
        </ul>
      </div>
      <div className="background">
        <div className="top">
          <div className="dropdown">
            <button className="dropbtn">Help</button>
            <div className="dropdown-content">
              <a href="faq.html">FAQ</a>
              <a href="feedback.html">Feedback</a>
              <a href="helpdesk.html">Help Desk</a>
            </div>
          </div>
          <div className="right">
            <button className="rightbtn">
              Hi, user
              <img src="{user}" />
            </button>
            <div className="right-content">
              <a href="profile.html">
                <h4 className="name">user</h4>
                <p className="email">user@gmail.com</p>
              </a>
              <a href="edit-profile.html">Edit Profile</a>
              <a href="#" onclick="confirmLogout()">
                Log Out
              </a>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="heading">
            <span>Feedback</span>
            <h1>Users Say</h1>
          </div>
          <div className="box-container">
            <div className="box">
              <div className="box-top">
                <div className="profile">
                  <div className="profile-img">
                    <img src="{image1}" />
                  </div>
                  <div className="name-user">
                    <strong>Allison Joy</strong>
                    <span>@all.jom</span>
                  </div>
                </div>
                <div className="reviews">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <div className="client-comment">
                <p>
                  SocialSavvy is a game-changer for managing social media
                  marketing! Its seamless scheduling and insightful analytics
                  have boosted my engagement and efficiency.
                </p>
              </div>
            </div>

            <div className="box">
              <div className="box-top">
                <div className="profile">
                  <div className="profile-img">
                    <img src="{image2}" />
                  </div>
                  <div className="name-user">
                    <strong>Dhiya Nazmeen</strong>
                    <span>@dhiyasandyy</span>
                  </div>
                </div>
                <div className="reviews">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <div className="client-comment">
                <p>
                  With SocialSavvy, I've found the ultimate solution for
                  maximizing my online presence. It's intuitive, efficient, and
                  essential for any entrepreneur serious about growth.
                </p>
              </div>
            </div>

            <div className="box">
              <div className="box-top">
                <div className="profile">
                  <div className="profile-img">
                    <img src="{image3}" />
                  </div>
                  <div className="name-user">
                    <strong>Thiru Thanijesh</strong>
                    <span>@thiruuuu</span>
                  </div>
                </div>
                <div className="reviews">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                  {/* <!--Empty star--> */}
                </div>
              </div>
              <div className="client-comment">
                <p>
                  SocialSavvy's unified dashboard has simplified my social media
                  analytics, empowering me to fine-tune my strategies for better
                  results. Highly recommend!
                </p>
              </div>
            </div>

            <div className="box">
              <div className="box-top">
                <div className="profile">
                  <div className="profile-img">
                    <img src="{image4} " />
                  </div>
                  <div className="name-user">
                    <strong>Khairin Husna</strong>
                    <span>@keyiiin</span>
                  </div>
                </div>
                <div className="reviews">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <div className="client-comment">
                <p>
                  Thanks to SocialSavvy, managing multiple platforms is a
                  breeze. The integrated payment system makes transactions
                  effortless, saving me valuable time.
                </p>
              </div>
            </div>
          </div>

          <div>
            <button id="open-feedback-btn" onClick={toggleAddFeedback}>
                Write A Feedback
            </button>

            {showAddFeedback && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleAddFeedback}>
                            &times;
                        </span>
                        <div className="feedback-form">
                            <form id="feedback-form" onSubmit={submitForm}>
                                <label htmlFor="name">Your Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    autoComplete="name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <br />
                                <br />

                                <label htmlFor="star-rating">Rating:</label>
                                <div id="star-rating">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${
                                                rating >= star ? "selected" : ""
                                            }`}
                                            data-rating={star}
                                            onClick={() => handleStarRating(star)}
                                        >
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                                <br />

                                <input
                                    type="hidden"
                                    id="selected-rating"
                                    name="rating"
                                    value={rating}
                                />

                                <label htmlFor="comment">Comment:</label>
                                <br />
                                <textarea
                                    id="comment"
                                    name="comment"
                                    rows="4"
                                    cols="50"
                                    autoComplete="off"
                                    required
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                                <br />
                                <br />

                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>

        </div>
      </div>
    </div>
  );
}

export default Feedback;