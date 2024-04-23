import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { SiArlo } from 'react-icons/si';
import { MenuItem } from '@mui/material';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const currentUser = useContext(AuthContext)
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
 
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  

  function handleCloseUserMenu(setting){
    if(setting === 'Logout')
      {
          signOut(auth);
      }
    setAnchorElUser(null);




  };
    
  return (
    <AppBar position="static"  sx={{height:'10%', bgcolor:'var(--main-color)'}}>
    <Container maxWidth="xl"   sx={{display:'flex',alignItems:'center',height:'100%'}}>
    <Toolbar disableGutters>
      <SiArlo id='logo'/>

     

     
        <Typography
          variant="h6"
          noWrap
          component="a"
          // href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            ml:2,
            display: { xs: 'none', md: 'flex' },
            fontFamily:'sans-serif',
            fontWeight: 700,
            letterSpacing: '.2rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Message Mingle
        </Typography>

        <Box sx={{ flexGrow: 0 ,ml:'15rem'}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
                <Avatar alt={currentUser.displayName} src={currentUser.photoURL} sx={{borderRadius:'50%', height:'3.5rem', width:'3.5rem'}}/>
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
                <MenuItem key={setting} onClick={()=>handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

         
      </Toolbar>
    </Container>
  </AppBar>
  )
}

export default Navbar