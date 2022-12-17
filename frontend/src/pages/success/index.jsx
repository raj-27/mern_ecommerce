import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./index.scss";

const Success = () => {
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);
  return (
    <>
      <div className="success-container">
        <Typography className="success-heading">
          Your Order Place Successfully
        </Typography>
        <Link to="/orders" className="link">
          View Orders
        </Link>
      </div>
    </>
  );
};

export default Success;
