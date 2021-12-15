import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  MenuList,
} from "@material-ui/core";
import { MenuOutlined } from "@material-ui/icons";

import { Link } from "react-router-dom";

const NavBar = (props) => {
  const classes = useStyles();
 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    localStorage.removeItem("user");
    props.setUserState();
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.menubackgroud}>
        <Toolbar>
        <div className={classes.title}>
            Landing with DinDin
          </div>
          { (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="#000"
              >
                <MenuOutlined />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
              >
                <MenuList>
                  <Link to="/Place" style={{ textDecoration: 'none', display: 'block', color: '#000' }}>
                    <MenuItem onClick={handleClick}>Place</MenuItem>
                  </Link>
                  <Link to="/Feedback" style={{ textDecoration: 'none', display: 'block', color:'#000' }}>
                    <MenuItem onClick={handleClick}>Feedback</MenuItem>
                  </Link>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menubackgroud: {
    background: "#fff"
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    fontSize: '30px',
    color: '#77302A',
    cursor: 'pointer'
  },
}));

export default NavBar;
