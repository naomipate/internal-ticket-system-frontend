import React from "react";
import { useNavigate } from "react-router-dom";

function TableUnit({
  id,
  date,
  title,
  priority,
  assigned,
  resolution,
  username,
  unique_id,
}) {
  const navigate = useNavigate();
  return (
    <>
      <tr key={id} className="text-center" onClick={() => navigate(`/${id}`)}>
        <td>{date}</td>
        <td>{title}</td>
        <td>{priority}</td>
        <td>{assigned}</td>
        <td>{resolution}</td>
        <td>{username}</td>
        <td>{unique_id}</td>
      </tr>
    </>
  );
}

export default TableUnit;
