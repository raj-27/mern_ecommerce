import { Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors, resetPassword } from "../../../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const {token} =useParams();
  const { error, success, loading } = useSelector((state) => state.forgetPassword);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const [Password, setPassword] = useState({
    Password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (error) {
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
      if (success) {
        navigate('/auth');
      }
    }
  }, [error, success,dispatch,navigate]);

  const handleChange = (e) => {
    setPassword({ ...Password, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, Password));
  };

  return (
    <>
      <ToastContainer />
      <Container component="main" maxWidth="xs" onSubmit={handleSubmit}>
        <Paper className="paper" elevation={5}>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <form className="form">
            <Grid container spacing={2}>
              <Input
                name="Password"
                label="Password"
                type="password"
                value={Password.Password}
                handleChange={handleChange}
              />

              <Input
                name="confirmPassword"
                label="Confirm new password"
                type="password"
                value={Password.confirmPassword}
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
              Reset
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default ResetPassword;
