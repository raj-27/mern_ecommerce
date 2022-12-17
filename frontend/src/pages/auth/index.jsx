import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FileBase from "react-file-base64";
import useStyles from "./style";
import Input from "./Input";
import { clearErrors, Login, Register } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let initialState = {
  firstName: "",
  lastName: "",
  avatar: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  let { loadin, error, isAuthenticated } = useSelector((state) => state.user);
  let [showPassword, setShowPassword] = useState(false);
  let [isSignup, setIsSignUp] = useState(false);
  let [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [dispatch, error, navigate, isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignup) {
      dispatch(Register(formData));
    } else {
      dispatch(Login(formData));
    }
    clear();
  };

  let clear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      avatar: "",
      email: "",
      password: "",
    });
  };

  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setFormData(initialState);
    setIsSignUp((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  return (
    <>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={6}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignup ? "Sign up" : "Sign in"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    value={formData.firstName}
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    value={formData.lastName}
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                value={formData.email}
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                value={formData.password}
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />

              {isSignup && (
                <Grid item xs={12} sm={6}>
                  <div className={classes.fileInput}>
                    <Typography gutterBottom>Upload Profile pic</Typography>
                    <FileBase
                      type="file"
                      name="avatar"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setFormData({ ...formData, avatar: base64 })
                      }
                    />
                  </div>
                </Grid>
              )}
            </Grid>
            {!isSignup && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "1rem 0 0 0",
                }}
              >
                <Link to="/password/forgot">Forgett paswword</Link>
              </Box>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};
export default Auth;
