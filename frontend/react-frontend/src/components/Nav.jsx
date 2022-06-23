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
import LoginIcon from '@mui/icons-material/Login';

const pages = [{text: 'Add New Project', link: '/addproject'}];
const settings = [{text: 'Profile', link: '/profile'}, {text: 'Logout', link: '/'} ];

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
    <AppBar position="static" id='NavBar'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Typography 
              variant="h6"
              noWrap
              component={Link}
              to="/"
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
                <MenuItem key={page.text} onClick={handleCloseNavMenu} component={Link} to={page.link}>
                    <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

            <Typography
              variant="h5"
              noWrap
              component={Link}
              to='/'
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
              DEVROAST
            </Typography>
          
          {/* LARGE SCREEN PAGE LIST */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.text}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={page.link}
              >
                  {page.text}
              </Button>
            ))}
          </Box>

          {user.info ? //   if logged in show avatar and menu
          <Box sx={{ flexGrow: 0 }} id='AvatarMenu'> {/* AVATER MENU */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                <Avatar alt={user.info.username} src="http://localhost:8000/staticfiles/monkeygun.jpg" />
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
                <MenuItem key={setting.text} component={Link} to={setting.link}
                onClick={setting.text === 'Logout' ? () => {handleCloseUserMenu(); logOut(user, setUser) } : handleCloseUserMenu}
                >
                    <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
         : // if Logged out Show Login Button
          <Button
            sx={{ my: 2, color: 'white', display: 'block'}}
            component={Link}
            to="/login"
            id='LogOutButton'
          >
            <LoginIcon />
          </Button> }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;