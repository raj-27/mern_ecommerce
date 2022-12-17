import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../actions/productAction";
import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "./productDetail.scss";
import ProductImageSlider from "./ProductImageSlider";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./reviewCard";
import { useState } from "react";
import { addToCart } from "../actions/cartAction";


const ProductDetail = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.productDetail);
  console.log(product);
  const [quantity, setQuantity] = useState(1);

  let options = {
    count: 5,
    value: product?.ratings,
    size: 25,
    isHalf: true,
    activeColor: "#ffd700",
    edit: false,
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id, dispatch]);

  let increaseQuantity = () => {
    if (quantity>=product.stock) return;
    let qty = quantity + 1;
    setQuantity(qty);
  };

  let decreaseQuantity = () => {
    if (quantity<=1) return;
    let qty = quantity - 1;
    setQuantity(qty);
  };

  const AddToCart=(e)=>{
    e.preventDefault();
    dispatch(addToCart(id,quantity));
  }

  return (
    <>
      {!loading && (
        <Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className="productDetail"
            spacing={2}
          >
            <Grid item xs={12} md={6} sm={5}>
              <div className="imageCarosoule">
                <ProductImageSlider images={product?.images} />
              </div>
            </Grid>
            <Grid item xs={12} md={6} sm={7}>
              <div className="product-info">
                <Typography
                  variant="h5"
                  className="product-description product-common"
                >
                  {product.description}
                </Typography>
                <Divider />
                <div className="rating-review product-common">
                  <ReactStars {...options} />
                  <Typography>({product.numOfReviews} Reviews)</Typography>
                </div>
                <Divider />
                <div className="product-common price-and-quantity">
                  <Typography variant="subtitle1" className="product-price">
                    {product.price}
                  </Typography>
                  <div>
                    <div className="update-cart-quantity">
                      <IconButton
                        aria-label="add-item"
                        color="primary"
                        variant="contained"
                        onClick={increaseQuantity}
                      >
                        <AddIcon />
                      </IconButton>
                      <TextField
                        type="number"
                        className="form-control"
                        value={quantity}
                        readOnly
                      />
                      <IconButton
                        aria-label="add-item"
                        color="primary"
                        variant="contained"
                        onClick={decreaseQuantity}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Button
                        rounded="true"
                        className=" btn add-to-cart-btn"
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={AddToCart}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="product-common">
                  <Typography variant="h5" component="span">
                    Status :
                    <Typography
                      variant="h6"
                      component="b"
                      className={product.stock < 1 ? "redBf" : "greenBg"}
                    >
                      {product.stock < 1 ? "Out of Stock" : "Stock available"}
                    </Typography>
                  </Typography>
                </div>
                <Divider />
                <Button
                  className="btn btn-submit-review"
                  color="primary"
                  size="small"
                >
                  Submit Reiew
                </Button>
              </div>
            </Grid>
            <Typography variant="h4">All Reviews</Typography>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                {product.reviews && product.reviews[0] ? (
                  <>
                    {product?.reviews?.map((value) => (
                      <Grid key={value._id} item xs={9} sm={6} md={4} lg={4}>
                        <ReviewCard review={value} />
                      </Grid>
                    ))}
                  </>
                ) : (
                  <Typography variant="h5">No Reviews Yet</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ProductDetail;
