import React, { useState, useEffect } from "react";
import { getTicketById, updateTicket } from "../common/API/API";
import { useNavigate, useParams } from "react-router-dom";

function EditTicket() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [priorityOpt] = useState(["High", "Normal", "Low"]);

  const [ticket, setTicket] = useState({
    date: "",
    title: "",
    description: "",
    priority: "",
    assigned: "",
    resolution: false,
    username: "",
  });

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await getTicketById(id);

        setTicket(response.data);
      } catch (error) {
        navigate("/404");
      }
    };

    fetchTicket();
  }, []);

  const handleTextChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.id]: e.target.value,
    });
  };

  const updateTheTicket = async (id) => {
    try {
      await updateTicket(id, ticket);
    } catch (e) {
      console.log(e);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateTheTicket(id);
      alert("Successfully Updated!");
      navigate(-1);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      <br />
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <label className="input-group-text">Date</label>
          <input
            className="form-control"
            required
            type="text"
            name="date"
            id="date"
            onChange={handleTextChange}
            value={ticket.date}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Title</label>
          <input
            className="form-control"
            required
            type="text"
            name="title"
            id="title"
            onChange={handleTextChange}
            value={ticket.title}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Description</label>
          <input
            className="form-control"
            type="text"
            name="description"
            id="description"
            onChange={handleTextChange}
            value={ticket.description}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Priority</label>
          <select className="form-select" onChange={handleTextChange}>
            <option defaultValue={ticket.priority}>{ticket.priority}</option>
            {priorityOpt.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Assigned</label>
          <input
            className="form-control"
            type="text"
            name="assigned"
            id="assigned"
            onChange={handleTextChange}
            value={ticket.assigned}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Resolved</label>
          <input
            className="form-control"
            type="checkbox"
            name="resolution"
            id="resolution"
            onChange={handleTextChange}
            value={ticket.resolution}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            onChange={handleTextChange}
            value={ticket.username}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default EditTicket;
