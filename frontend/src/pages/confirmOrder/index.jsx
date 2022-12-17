import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveStep from "../ActiveStep";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderAction";
import "./index.scss";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const {error} = useSelector((state) => state.newOrder);
  let address = `${shippingInfo.address},${shippingInfo.pincode},${shippingInfo.country},${shippingInfo.state}`;
  let subtotal = cartItems.reduce((a, b) => {
    return a + b.quantity * b.price;
  }, 0);
  let GST = subtotal * 0.18;
  let Total = subtotal + GST;
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subtotal,
    taxPrice: GST,
    totalPrice: Total,
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearErrors());
    }
  },[dispatch,error])

  let proceedToPayment = (e) => {
    e.preventDefault();
    dispatch(createOrder(order));
    navigate("/success");
  };
  return (
    <>
    <ToastContainer/>
      <ActiveStep activeStep={1} />
      <Container maxWidth="lg" justifyContent="center" alignItems="center">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5} md={7}>
            <Paper elevation={3} className="order-list-paper">
              <Typography className="order-list-heading">
                <b>Order Detail</b>
              </Typography>
              <Divider />
              <List disablePadding>
                {cartItems.map((product) => (
                  <ListItem style={{ padding: "10px 0" }} key={product.name}>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={product.image.url} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.name}
                      secondary={`${product.quantity} x ${product.price}`}
                    />
                    <Typography variant="body2">
                      {product.quantity * product.price}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={7} md={5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper elevation={3} className="address-confirm-paper">
                  <Typography className="address-confirm-heading">
                    <b>Address Details</b>
                  </Typography>
                  <Divider />
                  <Typography className="typography">
                    Name : <span>{user?.name}</span>{" "}
                  </Typography>
                  <Typography className="typography">
                    Phone No. : <span>{shippingInfo?.phoneNo}</span>{" "}
                  </Typography>
                  <Typography variant="h6" className="typography">
                    Name: <span>{address}</span>{" "}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={3} className="order-confirm-paper">
                  <Typography className="order-confirm-heading">
                    <b>Order Summary</b>{" "}
                  </Typography>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: ".6rem 0",
                    }}
                  >
                    <Typography>Subtotal</Typography>
                    <Typography>{subtotal}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: ".6rem 0",
                    }}
                  >
                    <Typography>GST</Typography>
                    <Typography>{GST}</Typography>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: ".6rem 0",
                    }}
                  >
                    <Typography>Total</Typography>
                    <Typography>{Total}</Typography>
                  </Box>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={proceedToPayment}
                  >
                    Proceed to Payment
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default ConfirmOrder;
