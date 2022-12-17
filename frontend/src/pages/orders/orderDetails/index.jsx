import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../../../actions/orderAction";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const state = useSelector((state) => state.getOrderDetails);
  const dispatch = useDispatch();
  const {id}=useParams();
  console.log(id);
    useEffect(()=>{
        dispatch(getOrderDetails(id))
    },[dispatch])
    console.log(state);
  return (
    <>
      <div className="orderDetail-container">
        <Typography>Hello from order detail</Typography>
      </div>
    </>
  );
};

export default OrderDetails;
