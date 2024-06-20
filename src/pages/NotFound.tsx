import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div>
      <p role="alert">404 Page Not Found</p>
      <Link to="/" aria-label="Go back home">
        Click here to go home
      </Link>
    </div>
  );
};

export default NotFound;
