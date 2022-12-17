import { Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, forgotPassword } from "../../../actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const { error,  message } = useSelector((state) => state.forgetPassword);
  let [email, setEmail] = useState("");
  const dispatch = useDispatch();

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
      dispatch(clearErrors())
    }
    if (message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [dispatch, error,  message]);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    dispatch(forgotPassword(email));
  };
  return (
    <>
      <ToastContainer />
      <Container className="main" maxWidth="xs">
        <Paper className="paper" elevation={5}>
          <Typography component="h1" variant="h5" gutterBottom>
            Forgett Password
          </Typography>
          <form className="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input
                value={email}
                label="Enter email address"
                type="email"
                handleChange={handleChange}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Send Email
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default ForgetPassword;
