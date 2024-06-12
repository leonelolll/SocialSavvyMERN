import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "./helpdesk.css";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Helpdesk = () => {
  const [showAddComplaint, setShowAddComplaint] = useState(false);
  const [complaint, setComplaint] = useState([]);
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/complaints");
      setComplaint(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteComplaint = async (ticketNo) => {
    await axios
      .delete(`http://localhost:4000/api/delete/complaint/${ticketNo}`)
      .then((response) => {
        setComplaint((prevUser) =>
          prevUser.filter((complaint) => complaint._id !== ticketNo)
        );
        toast.success(response.data.message, { position: "top-center" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleAddComplaint = () => {
    setShowAddComplaint(!showAddComplaint);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/createComplaint",
        {
          title,
          description,
          email,
        }
      );

      fetchData();
      toast.success(response.data.message, { position: "top-center" });
      navigate("/Helpdesk.html");
      setShowAddComplaint(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle email fetching and sending
  const sendEmail = async (complaintId) => {
    try {
      const complaintDetails = await fetchComplaintDetails(complaintId); // Assuming this function fetches complaint details
      if (!complaintDetails) return; // Handle potential errors fetching details
  
      const emailData = {
        from_name: 'Your Name', // Replace with your name
        service_id: 'your_service_id', // Replace with your emailjs service ID
        template_id: 'your_template_id', // Replace with your emailjs template ID
        template_params: {
          complaint_id: complaintDetails.ticketNo,
          complaint_title: complaintDetails.title,
          complaint_description: complaintDetails.description,
          email: complaintDetails.email, // User's email for notification
        },
      };
  
      const response = await emailjs.send(
        emailData.service_id,
        emailData.template_id,
        emailData.template_params
      );
  
      if (response.status === 200) {
        console.log("Email sent successfully:", response.text);
        toast.success("Email sent successfully.", { position: "top-center" });
      } else {
        console.error("Error sending email:", response.text);
        toast.error("An error occurred while sending the email. Please try again later.", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("An error occurred while sending the email. Please try again later.", { position: "top-center" });
    }
  };

  return (
    <div>
      <div className="side-nav">
        <div className="logo">
          <img src="images/logo.png" className="user-img" alt="Logo" />
          <h2>socialsavvy</h2>
        </div>
        <ul className="menu p-0">
          <li className="active">
            <a href="dashboard.html">
              <img src="images/dashboard.svg" alt="Dashboard" />
              <p className="m-0">Dashboard</p>
            </a>
          </li>
          <li>
            <a href="post.html">
              <img src="images/post.svg" alt="Post" />
              <p className="m-0">Post</p>
            </a>
          </li>
          <li>
            <a href="calendar.html">
              <img src="images/calendar.svg" alt="Calendar" />
              <p className="m-0">Calendar</p>
            </a>
          </li>
          <li>
            <a href="analysis.html">
              <img src="images/analysis.svg" alt="Analysis" />
              <p className="m-0">Analysis</p>
            </a>
          </li>
          <li>
            <a href="viral-content.html">
              <img src="images/flame.svg" alt="Viral Content" />
              <p className="m-0">Viral Content</p>
            </a>
          </li>
          <li>
            <a href="payment.html">
              <img src="images/payment-methods.svg" alt="Subscription" />
              <p className="m-0">Subscription</p>
            </a>
          </li>
          <li>
            <a href="settings.html">
              <img src="images/settings.svg" alt="Settings" />
              <p className="m-0">Settings</p>
            </a>
          </li>
        </ul>
        <hr />
        <ul className="logout p-0">
          <li>
            <p>Logout</p>
          </li>
        </ul>
      </div>

      <div className="background">
        <div className="top">
          <div className="dropdown">
            <button className="dropbtn">Help &#11206;</button>
            <div className="dropdown-content">
              <a href="faq.html">FAQ</a>
              <a href="feedback.html">Feedback</a>
              <a href="helpdesk.html">Help Desk</a>
            </div>
          </div>
          <div className="right">
            <button className="rightbtn">
              &#11206; Hi, user
              <img src="images/user.png" alt="User" />
            </button>
            <div className="right-content">
              <a href="profile.html">
                <h4 className="name">user</h4>
                <p className="email">user@gmail.com</p>
              </a>
              <a href="edit-profile.html">Edit Profile</a>
              <a href="#" /* onClick={() => confirmLogout()} */>Log Out</a>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="fs-1 fw-semibold text-center my-4">My Ticket</div>

          <div className="complaintTable">
            <button onClick={toggleAddComplaint} className="btn btn-outline-secondary p-1" style={{ width: "120px" }}>
              New Ticket +
            </button>

            {showAddComplaint && (
            <div className="popup">
              <div className="popup-content">
                <button
                  onClick={toggleAddComplaint}
                  className="btn btn-light p-1"
                >
                  <i className="fa-solid fa-backward"></i> X
                </button>

                <h4>Add New Complaint</h4>
                <form className="addComplaintForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="name">Email:</label>
                    <input
                      type="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      autoComplete="off"
                      placeholder="Enter Your Email"
                      required = "@"// Add required attribute for validation
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="name">Title:</label>
                    <input
                      type="title"
                      id="title"
                      onChange={(e) => setTitle(e.target.value)}
                      name="title"
                      autoComplete="off"
                      placeholder="Enter Complaint Title"
                      required
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="name">Description:</label>
                    <textarea
                      type="description"
                      id="description"
                      onChange={(e) => setDescription(e.target.value)}
                      name="description"
                      autoComplete="off"
                      placeholder="Enter complaint description"
                      required // Add required attribute for validation
                    />
                  </div>
                  <div className="inputGroup">
                    <button type="submit" className="btn btn-outline-secondary p-1" style={{ width: "80px" }}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

            {complaint.length === 0 ? (
              <div className="noData">
                <h3>No Data Display</h3>
              </div>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "12%" }}>
                      Ticket No.
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Date
                    </th>
                    <th
                      scope="col"
                      className="wrap-text"
                      style={{ width: "20%" }}
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="wrap-text"
                      style={{ width: "40%" }}
                    >
                      Description
                    </th>
                    <th scope="col" style={{ width: "13%" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {complaint.map((complaint) => {
                    return (
                      <tr>
                        <td>{complaint.ticketNo}</td>
                        <td>{complaint.date}</td>
                        <td>{complaint.title}</td>
                        <td>{complaint.description}</td>
                        <td className="actionButtons">
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => sendEmail(complaint.ticketNo)}
                          >
                            <i className="bi bi-envelope"></i>
                          </button>

                          <button
                            onClick={() => deleteComplaint(complaint._id)}
                            type="button"
                            class="btn btn-danger"
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Helpdesk;
