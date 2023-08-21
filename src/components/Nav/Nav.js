import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary bg-gradient">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          InternalTicketSystem
        </Link>
        <Link className="d-flex nav-link" to={"/new-ticket"}>
          <button className="btn btn-outline-dark">New Ticket</button>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
