import { Box } from '@mui/system'
import React from 'react'
import '../index.css'
import { Avatar, Typography } from '@mui/material';

function Chats() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

 
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box id='chat-container' sx={{height:'80%', m:2,overflowY:'scroll', }}>
     
      <Box  className='user' sx={{display:'flex', gap:2,cursor:'pointer', p:2, mr:3}}>
      <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'4.5rem', width:'4.5rem'}}/>
      <Typography variant='h6' sx={{color:'#fff'}}> Priyanka</Typography>
      </Box>
      
      <Box  className='user' sx={{display:'flex', gap:2,p:2, mr:3,cursor:'pointer'}}>
      <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'4.5rem', width:'4.5rem'}}/>
      <Typography variant='h6' sx={{color:'#fff'}}> Priyanka</Typography>
      </Box>
      <Box  className='user' sx={{display:'flex', gap:2,p:2, mr:3,cursor:'pointer'}}>
      <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'4.5rem', width:'4.5rem'}}/>
      <Typography variant='h6' sx={{color:'#fff'}}> Priyanka</Typography>
      </Box>
      <Box  className='user' sx={{display:'flex', gap:2,p:2, mr:3,cursor:'pointer'}}>
      <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'4.5rem', width:'4.5rem'}}/>
      <Typography variant='h6' sx={{color:'#fff'}}> Priyanka</Typography>
      </Box>
      <Box  className='user' sx={{display:'flex', gap:2,p:2, mr:3,cursor:'pointer'}}>
      <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'4.5rem', width:'4.5rem'}}/>
      <Typography variant='h6' sx={{color:'#fff'}}> Priyanka</Typography>
      </Box>
      <Box  className='user' sx={{display:'flex', gap:2,p:2, mr:3,cursor:'pointer'}}>
      <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'4.5rem', width:'4.5rem'}}/>
      <Typography variant='h6' sx={{color:'#fff'}}> Priyanka</Typography>
      </Box>
      <Box  className='user' sx={{display:'flex', gap:2,p:2, mr:3,cursor:'pointer'}}>
      <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'4.5rem', width:'4.5rem'}}/>
      <Typography variant='h6' sx={{color:'#fff'}}> Priyanka</Typography>
      </Box>
      <Box  className='user' sx={{display:'flex', gap:2,p:2, mr:3,cursor:'pointer'}}>
      <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'4.5rem', width:'4.5rem'}}/>
      <Typography variant='h6' sx={{color:'#fff'}}> Priyanka</Typography>
      </Box>
      <Box  className='user' sx={{display:'flex', gap:2,p:2, mr:3,cursor:'pointer'}}>
      <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'4.5rem', width:'4.5rem'}}/>
      <Typography variant='h6' sx={{color:'#fff'}}> Priyanka</Typography>
      </Box>
      <Box  className='user' sx={{display:'flex', gap:2,p:2, mr:3,cursor:'pointer'}}>
      <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'4.5rem', width:'4.5rem'}}/>
      <Typography variant='h6' sx={{color:'#fff'}}> Priyanka</Typography>
      </Box>
      <Box  className='user' sx={{display:'flex', gap:2,p:2, mr:3,cursor:'pointer'}}>
      <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'4.5rem', width:'4.5rem'}}/>
      <Typography variant='h6' sx={{color:'#fff'}}> Priyanka</Typography>
      </Box>
      <Box  className='user' sx={{display:'flex', gap:2,p:2, mr:3,cursor:'pointer'}}>
      <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'4.5rem', width:'4.5rem'}}/>
      <Typography variant='h6' sx={{color:'#fff'}}> Priyanka</Typography>
      </Box>
     
     
     
     
    
    </Box>
  )
}

export default Chats