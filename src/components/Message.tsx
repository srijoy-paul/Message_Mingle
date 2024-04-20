import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

function Message() {
  return (
  <Box id='messgContainer' sx={{height:'80%',ml:3,mr:2}}>

    <Box className='ownermessg' >
    
    <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'3.5rem', width:'3.5rem'}}/>

    <Box className='messgContent' >
      <Typography variant='h6'>hello</Typography>
    </Box>

    </Box>
    <Box className='ownermessg' >
    
    <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'3.5rem', width:'3.5rem'}}/>

    <Box className='messgContent' >
      <Typography variant='h6'>hello</Typography>
    </Box>

    </Box>
    <Box className='ownermessg' >
    
    <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" sx={{borderRadius:'50%', height:'3.5rem', width:'3.5rem'}}/>

    <Box className='messgContent' >
      <Typography variant='h6'>hello</Typography>
    </Box>

    </Box>
  </Box>
  )
}

export default Message