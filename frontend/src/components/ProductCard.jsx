import { Paper, Typography } from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom"
import useStyles from "./productStyle.js";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ item }) => {
  let classes = useStyles();
  return (
    <Link to={`/product/${item._id}`}>
    <Paper className={classes.paper} elevation={3}>
      <img src={item.images[0].url} alt={item.name} className={classes.productImg} />
      <Typography>{item.description}</Typography>
      <Typography>{item.price}</Typography>
      <div>
        <ReactStars
          count={5}
          value={item.ratings}
          size={24}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
          edit={false}
        />
        <Typography>({item.numOfReviews} Reviews)</Typography>
      </div>
    </Paper>
    </Link>
  );
};

export default ProductCard;
