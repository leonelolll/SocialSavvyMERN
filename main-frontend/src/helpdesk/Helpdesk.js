import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "./helpdesk.css";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Layout from "../shared/Layout.jsx";

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

  const fetchComplaintDetails = async (complaintId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/complaint/${complaintId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching complaint details:", error);
      return null;
    }
  };

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

  const sendEmail = async (complaintId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/complaint/${complaintId}`);
      const complaintDetails = response.data;

      // Check if complaint details exist
      if (!complaintDetails) return;


        const emailData = {
            from_name: "SocialSavvy Team",
            service_id: "service_tp0ecza",
            template_id: "template_oovgon7",
            template_params: {
                complaint_id: complaintDetails.ticketNo,
                complaint_title: complaintDetails.title,
                complaint_description: complaintDetails.description,
                email: complaintDetails.email,
            },
        };

        const emailResponse = await emailjs.send(
            emailData.service_id,
            emailData.template_id,
            emailData.template_params,
            'KeC6XftVg2E4iOR7x'
        );

        if (emailResponse.status === 200) {
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
      <Layout />

      <div className="background">
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
                      required
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
                      required
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
                      <tr key={complaint._id}>
                        <td>{complaint.ticketNo}</td>
                        <td>{complaint.date}</td>
                        <td>{complaint.title}</td>
                        <td>{complaint.description}</td>
                        <td className="actionButtons">
                          <button
                            type="button"
                            className="btn btn-info ms-3"
                            onClick={() => sendEmail(complaint._id)}
                          >
                            <i className="bi bi-envelope"></i>
                          </button>

                          <button
                            onClick={() => deleteComplaint(complaint._id)}
                            type="button"
                            className="btn btn-danger ms-3"
                          >
                            <i className="bi bi-trash"></i>
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
