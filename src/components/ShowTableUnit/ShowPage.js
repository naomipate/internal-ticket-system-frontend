import React, { useEffect, useState } from "react";
import { getTicketById, deleteTicketByID } from "../common/API/API";
import { useParams, useNavigate } from "react-router-dom";

function ShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let result = await getTicketById(id);

      console.log(result.data);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      deleteTicketByID(id);
      alert("Successfully Deleted");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
      <br />
      <div className="card bg-gradient" style={{ backgroundColor: "#F5F5DC" }}>
        <div className="card-header">{data.title}</div>
        <div className="card-body">
          <h5 className="card-title">
            Date: {data.date} | Priority: {data.priority} | Resolved:{" "}
            {data.resolution}
          </h5>
          <p className="card-text">Assigned: {data.assigned}</p>
          <p className="card-text">Description: {data.description}</p>
          <p className="card-text">Username: {data.username}</p>
          <p className="card-text">Unique ID: {data.unique_id}</p>
          <br />
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/edit-game/${id}`)}
            >
              Edit
            </button>
            <button className="btn btn-primary" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowPage;
