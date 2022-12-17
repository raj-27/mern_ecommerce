import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "./index.scss";
import { addToCart, removeCartItem } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  let { cartItems } = useSelector((state) => state.cart);
  let dispatch = useDispatch();
  let navigate=useNavigate();
  let subtotal = cartItems.reduce(
    (a, b) => a + Number(b.price) * Number(b.quantity),
    0
  );
  console.log(cartItems);
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };
  let decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    console.log(quantity);
    if (quantity <=1) {
     return
    }
    dispatch(addToCart(id, newQty));
  };
  let removeItem = (id) => {
    dispatch(removeCartItem(id));
  };
  const checkout = () => {
      navigate("/shipping");
  }
  return (
    <>
      <Container className="container" maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {cartItems.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="item-img">
                  <img src={cartItem.image.url} alt="cart_item" />
                </div>
                <div className="cart-text">
                  <p className="item-name">{cartItem.name}</p>
                  <p className="item-name">{`💵 ${cartItem.price}`}</p>
                </div>
                <div className="cart-Subtotal">
                  <p className="item-subtotal">
                    {cartItem.price * cartItem.quantity}
                  </p>
                </div>
                <div className="cart-action">
                  <div className="update-btns">
                    <IconButton
                      onClick={() =>
                        decreaseQuantity(cartItem.id, cartItem.quantity)
                      }
                    >
                      <RemoveIcon />
                    </IconButton>

                    <input
                      type="text"
                      id="name"
                      readOnly
                      value={cartItem.quantity}
                    />
                    <IconButton
                      onClick={() =>
                        increaseQuantity(
                          cartItem.id,
                          cartItem.quantity,
                          cartItem.stock
                        )
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                  <IconButton
                    className="delete-btn"
                    onClick={() => removeItem(cartItem.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </Grid>
        </Grid>
        <Divider />
        {cartItems.length && (
          <Box sx={{ padding: "1rem", textAlign: "right" }}>
            <Typography variant="body1" component="h1" gutterBottom>
              Gross Total : {subtotal}
            </Typography>
            <Button
              className="checkout-btn"
              variant="contained"
              size="small"
              color="primary"
              onClick={checkout}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Cart;
