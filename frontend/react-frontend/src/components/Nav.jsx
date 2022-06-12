import UserContext from "../context/UserContext";
import { logOut } from "../services/logout";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Add New Project'];
// const pages = [{text: 'Add New Project', link: '/addproject'}];
// const settings = [{text: 'Profile', link: '/profile'}, {text: 'Logout', link: '/'} ];
const settings = ['Profile','Logout'];

const Nav = () => {
  const {user, setUser} = useContext(UserContext)

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Typography 
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            > {/* BIG BAR LOGO */}
              {/* <Link to="/">DEVROAST</Link> */}
              DEVROAST
            </Typography>
         
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>  {/* SMALL SCREEN OPTIONS MENU */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {/* <Link to="/">DEVROAST</Link> */}
              DEVROAST
            </Typography>
          
          {/* LARGE SCREEN PAGE LIST */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* {user.info ? //   if logged in show avatar and menu */}

  
          
          <Box sx={{ flexGrow: 0 }}> {/* AVATER MENU */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="http://localhost:8000/staticfiles/monkeygun.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                // <Link to={setting.link}>
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                // </Link>
                
              ))}
            </Menu>
          </Box>
        {/* // : <Link to="/login"> <p id='logIn'>Log In</p> </Link> } */}
        </Toolbar>
      </Container>
    </AppBar>
  );
  // return (
  //   <nav>
  //     <Link to="/"> <h2>DevRoast</h2> </Link>
  //     <ul>
  //       {user.info ? // if logged in 
  //       <>
  //         <Link to="/addproject"><li id='addNewProject'>Add New Project</li></Link>
  //         <Link to="/profile"> <li id='userProfile'>{user.info.username} is Logged In </li> </Link> {/* render user name */}
  //         <Link to="/"> <li id="logOut" onClick={ () => logOut(user, setUser) }> Log Out </li> </Link> {/* render logout button, resets user state */}
  //       </>
  //       : <Link to="/login"> <li id='logIn'>Log In</li> </Link> }
  //     </ul>
  //   </nav>
  // );
};

export default Nav;