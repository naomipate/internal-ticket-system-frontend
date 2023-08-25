import React, { useState } from "react";
import { createTicket } from "../common/API/API";
import { useNavigate } from "react-router-dom";

function CreateTicket() {
  let navigate = useNavigate();
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

  async function createTheTicket(e) {
    e.preventDefault();

    try {
      await createTicket(ticket);

      setTicket({
        date: "",
        title: "",
        description: "",
        priority: "",
        assigned: "",
        resolution: false,
        username: "",
      });
      alert("New Ticket Created!");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
  function handleOnchange(id, value) {
    //console.log(id, value);
    setTicket({
      ...ticket,
      [id]: value,
    });
  }

  return (
    <div className="container">
      <br />
      <form onSubmit={createTheTicket}>
        <div className="input-group mb-3">
          <label className="input-group-text">Date</label>
          <input
            className="form-control"
            required
            type="text"
            id="date"
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
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
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
            value={ticket.title}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Description</label>
          <input
            className="form-control"
            required
            type="text"
            name="description"
            id="description"
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
            value={ticket.description}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Priority</label>
          <select
            className="form-select"
            id="priority"
            onChange={(e) => {
              handleOnchange(e.target.id, e.target.value);
            }}
          >
            <option defaultValue={""}>Select Priority</option>
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
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
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
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
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
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
            value={ticket.username}
          />
        </div>
        <br />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreateTicket;
