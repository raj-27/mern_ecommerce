import { Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, updatePassword } from "../../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../../constant/userConstant";
import "./index.scss";
import Input from "../Input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePassword = () => {
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  console.log(isUpdated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
    if (isUpdated) {
      toast.success("Password Updated successfully", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      navigate("/profile");
      dispatch({type: UPDATE_PASSWORD_RESET});
    }
  }, [dispatch, error, navigate, isUpdated]);

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(password));
  };

  return (
    <>
    <ToastContainer />
      <Container component="main" maxWidth="xs" onSubmit={handleSubmit}>
        <Paper className="paper" elevation={5}>
          <Typography component="h1" variant="h5">
            Update Password
          </Typography>
          <form className="form">
            <Grid container spacing={2}>
              <Input
                name="oldPassword"
                label="Password"
                type="password"
                value={password.oldPassword}
                handleChange={handleChange}
              />
              <Input
                name="newPassword"
                label="New Password"
                type="password"
                value={password.newPassword}
                handleChange={handleChange}
              />
              <Input
                name="confirmPassword"
                label="Confirm new password"
                type="password"
                value={password.confirmPassword}
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
              Update
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};
export default UpdatePassword;
