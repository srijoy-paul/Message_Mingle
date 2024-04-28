
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';

import {ChatContext} from '../context/ChatContext'
import { useContext } from 'react';

function ChatNavbar() {
  const {data}= useContext(ChatContext); 


    
  return (
    <AppBar position="static"  sx={{height:'10%', bgcolor:'var(--third-color)' }}>
    <Container maxWidth="xl" sx={{display:'flex',alignItems:'center',height:'100%'}}>
    <Toolbar disableGutters>
      
        

        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={data.user?.photoURL} sx={{borderRadius:'50%', height:'3.5rem', width:'3.5rem'}}/>
              </IconButton>
            </Tooltip>
            
          </Box>
          <Typography
          variant="h6"
          noWrap
          component="a"
        //   href="#app-bar-with-responsive-menu"
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
          {data.user.displayName} 
        </Typography>
        
      </Toolbar>
    </Container>
  </AppBar>
  )
}

export default ChatNavbar

