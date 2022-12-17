import { Container, Grid, Paper, Typography } from "@material-ui/core";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useStyles from "./indexStyle";
import { getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductCard from "../../components/ProductCard";

export default function Home() {
  const dispatch = useDispatch();
  const { loading, products, productsCount } = useSelector(
    (state) => state.products
  );
  let classes = useStyles();
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.header_text}>
          <Typography variant="h5">Header Section</Typography>
        </div>
      </div>
      <Typography variant="h5" className={classes.productHeadline}>
        Feature Products


      </Typography>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          {products?.map((item) => (
            <Grid item xs={7} sm={6} md={3} key={item._id}>
              <ProductCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
