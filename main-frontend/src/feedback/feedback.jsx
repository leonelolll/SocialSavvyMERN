import s from "./feedback.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../shared/Layout.jsx"

const Feedback = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState([]); // Ensure initial state is an array
  const [comment, setComment] = useState("");
  const [showAddFeedback, setShowAddFeedback] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/feedback");
      console.log("API Response:", response.data); // Log the response data
      if (Array.isArray(response.data)) {
        setFeedback(response.data); // Set the feedback state only if it's an array
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors
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
        "http://localhost:4000/api/createFeedback",
        {
          username,
          name,
          rating,
          comment,
        }
      );

      fetchData();
      toast.success(response.data.message, { position: "top-center" });
      navigate("/feedback");
      toggleAddFeedback();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Layout />
      <div className={s.background}>
        <div className={s.content}>
          <div className={s.heading}>
            <span>Feedback</span>
            <h1>Users Say</h1>
          </div>
          <div className={s.box_container}>
            {feedback.map((feedback) => (
            <div className={s.box} key={feedback._id}>
              <div className={s.box_top}>
                  <div className={s.name_user}>
                  <div className={s.profile_img}>
                    <img src={feedback.image} alt="Profile" />
                  </div>
                    <strong>{feedback.name}</strong>
                    <span>{feedback.username}</span>
                    <div className={s.client_comment}>
                      <p>{feedback.comment}</p>
                    </div>
                  </div>
                  <p>{feedback.rating} STAR</p>
              </div>
            </div>
          ))}
          </div>

          {/* {feedback.map((feedback) => {
            return (
              <div className="box-container" key={feedback._id}>
                <div className="box">
                  <div className="box-top">
                    <div className="profile">
                      <div className="profile-img">
                        <img src={feedback.image} alt="Profile" />
                      </div>
                      <div className="name-user">
                        <strong>{feedback.name}</strong>
                        <span>{feedback.username}</span>
                      </div>
                      <p>{feedback.rating}</p><p> STAR</p>
                    </div>
                    <div className="client-comment">
                      <p>{feedback.comment}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })} */}

          <div>
            <button id={s.open_feedback_btn} onClick={toggleAddFeedback}>
              Write A Feedback
            </button>

            {showAddFeedback && (
              <div className={s.modal}>
                <div className={s.modal_content}>
                  <span className="close" onClick={toggleAddFeedback}>
                    &times;
                  </span>
                  <div className="feedback-form">
                    <form id="feedback-form" onSubmit={submitForm}>

                    <label htmlFor="name">Your Username:</label>
                      <br />
                      <input
                        type="text"
                        id="username"
                        name="username"
                        autoComplete="username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <br />
                      <br />
                      <label htmlFor="name">Your Name:</label>
                      <br />
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

                      <label htmlFor="name">Rating</label>
                      <input
                        type="number"
                        max={5}
                        id="rating"
                        name="rating"
                        required
                        onChange={(e) => setRating(e.target.value)}
                      />
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
};

export default Feedback;
