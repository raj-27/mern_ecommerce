import {
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import { Country, State } from "country-state-city";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { saveShippingInfo } from "../../actions/cartAction";
import ActiveStep from "../ActiveStep";
const Shipping = () => {
  let { cartItems } = useSelector((state) => state.cart);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let [formData, setFormData] = useState({
    address: "",
    city: "",
    pinCode: "",
    phoneNo: "",
    country: "",
    state: "",
  });

  if (!cartItems.length) {
    navigate("/products");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let error =
      !formData.address ||
      !formData.city ||
      !formData.pinCode ||
      !formData.phoneNo ||
      !formData.country ||
      !formData.state;
    if (error) {
      toast.error("Form is incomplete or invalid form details", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(saveShippingInfo(formData));
      navigate('/order/confirm');
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <ActiveStep activeStep={0} />
      <Container maxWidth="xs">
        <Paper className="shipping-paper" elevation={6}>
          <Typography component="h1" variant="h5">
            Shipping Info
          </Typography>
          <form className="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input
                value={formData.address}
                name="address"
                label="Address"
                type="text"
                handleChange={handleChange}
                autoFocus
              />
              <Input
                value={formData.city}
                name="city"
                label="City"
                type="text"
                handleChange={handleChange}
              />
              <Input
                value={formData.pinCode}
                name="pinCode"
                label="Pincode"
                type="number"
                handleChange={handleChange}
              />
              <Input
                value={formData.phoneNo}
                name="phoneNo"
                label="Phone number"
                type="number"
                handleChange={handleChange}
              />
              <Grid item xs={6}>
                <FormControl variant="outlined" className="formControll">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Country
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={formData.country}
                    onChange={handleChange}
                    label="Country"
                    name="country"
                  >
                    <MenuItem value="">
                      <em>Country</em>
                    </MenuItem>
                    {Country.getAllCountries().map((item) => (
                      <MenuItem key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" className="formControll">
                  <InputLabel id="demo-simple-select-outlined-label">
                    State
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={formData.state}
                    onChange={handleChange}
                    label="state"
                    name="state"
                  >
                    <MenuItem value="">
                      <em>State</em>
                    </MenuItem>
                    {State.getStatesOfCountry(formData.country).map((state) => (
                      <MenuItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit-btn"
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Shipping;
