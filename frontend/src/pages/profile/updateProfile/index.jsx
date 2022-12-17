import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./style";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../../constant/userConstant";
import { clearErrors } from "../../../actions/productAction";
import { loadUser, updateProfile } from "../../../actions/userAction";
import Input from "../Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  let [formData, setFormData] = useState({
    firstName: user?.name.split(" ")[0],
    lastName: user?.name.split(" ")[1],
    email: user?.email,
    password: user?.password,
    avatar: user?.avatar?.url,
  });
  const classes = useStyles();
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

    if (isUpdated) {
      dispatch(loadUser());
      navigate("/profile");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, isUpdated, error, navigate, user]);

  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  return (
    <>
    <ToastContainer/>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={6}>
          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
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
              <Input
                value={formData.email}
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />

              <Grid item xs={12}>
                <Typography gutterBottom>Upload Profile pic</Typography>
                <div className={classes.fileInput}>
                  <Avatar
                    alt="Remy Sharp"
                    src={formData.avatar}
                    className={classes.avatar}
                  />
                  <FileBase
                    type="file"
                    name="avatar"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setFormData({
                        ...formData,
                        avatar: base64 || user?.avatar?.url,
                      })
                    }
                  />
                </div>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update Profile
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default UpdateProfile;
