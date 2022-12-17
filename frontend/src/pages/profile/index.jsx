import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { logout } from "../../actions/userAction";
import "./index.scss";
const Profile = () => {
  let user = useSelector((state) => state.user.user);
  let { isUpdate } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdate) {
      toast.success("Password Updated successfully", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [navigate, isUpdate,dispatch]);

  const Logout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
    <ToastContainer />
      <Typography className="my-profile">My Proile</Typography>
      <Grid
        container
        className="root"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={6} className="child-1">
          <Box className="img-box">
            <img
              className="profile-img"
              src={user?.avatar?.url}
              alt="profile_pic"
            />
          </Box>
          <Button
            size="small"
            color="primary"
            variant="contained"
            className="btn btn-primary"
            component={Link}
            to="/me/update"
          >
            Edit Profile
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="child-2">
          <Typography className="profile-text">
            Name : <span>{user?.name}</span>
          </Typography>
          <Typography className="profile-text">
            Email : <span>{user?.email}</span>
          </Typography>
          <Typography className="profile-text">
            Created At : <span>10th june</span>
          </Typography>
          <Box className="profile-action">
            <Button
              size="small"
              color="primary"
              variant="contained"
              className="btn btn-primary"
              component={Link}
              to="/orders"
            >
              My Order
            </Button>
            <Button
              size="small"
              color="primary"
              variant="contained"
              className="btn btn-primary"
              component={Link}
              to="/password/update"
            >
              Update Password
            </Button>
            <Button
              size="small"
              color="primary"
              variant="contained"
              className="btn btn-primary"
              onClick={Logout}
            >
              Logout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
