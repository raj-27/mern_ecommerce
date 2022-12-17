import {
  AppBar,
  Avatar,
  Badge,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import useStyles from "./navStyle";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const {cartItems}=useSelector((state) => state.cart);
  const [drawerStatus, setDrawerStatus] = useState(false);
  const [keywords, setKeywords] = useState("");
  const navigate = useNavigate();
  let classes = useStyles();

  let toggleDrawer = (e) => {
    e.preventDefault();
    setDrawerStatus(!drawerStatus);
  };

  let handleKeywords = (e) => {
    setKeywords(e.target.value);
  };

  let handleSearch = (e) => {
    e.preventDefault();
    if (keywords.trim()) {
      navigate(`/products/${keywords}`);
    } else {
      navigate(`/products`);
    }
  };

  let navlinks = ["home", "products", "about", "contact", "orders", "cart"];
  if (user?.role === "admin") {
    navlinks.push("dashboard");
  }

  return (
    <>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.logo}>Logo</Typography>
          <form
            className={classes.search}
            onSubmit={handleSearch}
            autoComplete="off"
          >
            <div>
              <input
                type="text"
                className={classes.searchInput}
                value={keywords}
                placeholder="Search..."
                onChange={handleKeywords}
              />
            </div>
            <button type="submit" className={classes.submitBtn}>
              <SearchIcon />
            </button>
          </form>
          <div className={classes.navLinks}>
            <Link className={classes.navLinkItem} to="/">
              Home
            </Link>
            <Link className={classes.navLinkItem} to="/products">
              Product
            </Link>
            <Link className={classes.navLinkItem} to="/contact">
              Contact
            </Link>
            <Link className={classes.navLinkItem} to="/about">
              About
            </Link>
            {user?.role === "admin" && (
              <Link className={classes.navLinkItem} to="/dashboard">
                Dashboard
              </Link>
            )}
            {isAuthenticated && (
              <div className={classes.nav_action}>
                <Link
                  to="/orders"
                  className={`${classes.order} ${classes.common}`}
                >
                  <LocalMallIcon className={classes.icon} />
                </Link>
                <Link
                  to="/cart"
                  className={`${classes.cart} ${classes.common}`}
                >
                  <Badge badgeContent={cartItems.length} color="secondary" overlap="rectangular">
                    <ShoppingCartIcon className={classes.icon} />
                  </Badge>
                </Link>
              </div>
            )}

            <Link
              to="/auth"
              className={`${classes.profile} ${classes.common}`}
            >
              <Avatar alt="cute_cat" src={user?.avatar?.url} />
            </Link>
          </div>

          <IconButton
            className={classes.mobileView}
            onClick={() => setDrawerStatus(!drawerStatus)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerStatus} className={classes.drawer}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <Link
            to="/auth"
            className={`${classes.profile} ${classes.common}`}
          >
            <Avatar alt="cute_cat" src={user?.avatar?.url} />
          </Link>
          <List>
            {navlinks.map((text, index) => (
              <Link to={text === "home" ? "/" : text} key={text}>
                <ListItem button>
                  <ListItemText
                    className={classes.mobileViewText}
                    primary={text.charAt(0).toUpperCase() + text.slice(1)}
                  />
                  {text === "cart" && (
                    <ListItemIcon>
                      <Badge
                        badgeContent={cartItems.length}
                        color="secondary"
                        overlap="rectangular"
                      >
                        <ShoppingCartIcon />
                      </Badge>
                    </ListItemIcon>
                  )}
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};
export default Navbar;
