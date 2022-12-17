import {
  Container,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  Slider,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import ProductCard from "../../components/ProductCard";
import Pagination from "@material-ui/lab/Pagination";
import "./product.scss";

const categories = [
  "All",
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhone",
];

const Products = () => {
  const { keywords } = useParams();
  let [currentPage, setCurrentPage] = useState(1);
  let [price, setPrice] = useState([0, 25000]);
  let [category, setCategory] = useState();
  let [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const { loading, products, productsCount, limit } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct(keywords, currentPage, price, category,rating));
  }, [dispatch, keywords, currentPage, price, category,rating]);

  const handleChange = (event, value) => {
    setPrice(value);
  };

  function valuetext(value) {
    return `${value}`;
  }

  const handleCategory = (event) => {
    setCategory(event.target.innerText);
  };

  const handleRating = (e,value) => {
    setRating(value);
  };

  console.log(category);

  return (
    <>
      <div className="product-conatiner">
        <Container maxWidth="lg">
          <Typography>Products</Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={8} sm={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography id="range-slider" gutterBottom>
                    Price Range
                  </Typography>
                  <Slider
                    value={price}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    max={25000}
                  />
                </Grid>
                <Typography gutterBottom>Categories</Typography>
                <Grid container gutterBottom spacing={1}>
                  {categories &&
                    categories.map((category) => (
                      <Grid item xs={6} sm={12} key={category}>
                        {/* <Paper elevation={1}> */}
                        <ListItem button onClick={handleCategory}>
                          <ListItemText primary={`${category}`} />
                        </ListItem>
                        {/* </Paper> */}
                      </Grid>
                    ))}
                </Grid>
                <Grid item xs={12}>
                  <Typography id="range-slider" gutterBottom>
                    Rating Range
                  </Typography>
                  <Slider
                    value={rating}
                    defaultValue={rating}
                    onChange={handleRating}
                    // aria-labelledby="continuous-slider"
                    min={0}
                    max={5}

                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={10}>
              {/* <Container maxWidth="lg"> */}
                <Grid container spacing={2} justifyContent="center">
                  {products?.map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item._id}>
                      <ProductCard item={item} />
                    </Grid>
                  ))}
                </Grid>
              {/* </Container> */}
            </Grid>
          </Grid>
          <Grid item xs={12} className="pagination">
            <Pagination
              count={Math.ceil(productsCount / limit)}
              defaultPage={currentPage}
              color="primary"
              className="pagination"
              onChange={(event, value) => setCurrentPage(value)}
            />
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Products;
