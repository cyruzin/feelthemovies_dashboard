import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound(props) {
  const { path } = props;

  return (
    <div className="NotFound">
      <div>
        <h1>Ops! Page not found.</h1>
        <Link to={path || "/"}>
          <h4>Go to the homepage »</h4>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
