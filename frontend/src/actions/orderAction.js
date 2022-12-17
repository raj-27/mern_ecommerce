import axios from "axios";
import {
    CLEAR_ERRORS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
} from "../constant/orderConstant";

// CREATE ORDER
export const createOrder = (order) => async(dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = { headers: { "Content-type": "application/json" } };
        const { data } = await axios.post("/api/v1/order/new", order, config);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
    }
};

// GET ALL MY ORDERS
export const getOrders = () => async(dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });
        const { data } = await axios.get("/api/v1/orders/me");
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.order });
    } catch (error) {
        dispatch({ type: MY_ORDERS_FAIL, payload: error.response.data.message });
    }
};

// MY ORDERS DETAILS
export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/v1/order/${id}`);

      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// clearing errors
export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};