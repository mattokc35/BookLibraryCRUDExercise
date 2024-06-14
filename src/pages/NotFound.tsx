import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div>
      <p>404 Page Not Found</p>
      <Link to="/">Click here to go home</Link>
    </div>
  );
};

export default NotFound;
