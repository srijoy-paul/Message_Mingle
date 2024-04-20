
import { Box, Button, InputBase, Stack } from '@mui/material'
import React from 'react'
// import SendIcon from '@mui/icons-material/Send';
import '../index.css'
import SendIcon from '@mui/icons-material/Send';


function Input() {
  return (
   <Box sx={{bgcolor:'#ddddf7',display:'flex',alignItems:'center',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',gap:15,p:"10px",border:'2px solid red' }}>

    <InputBase placeholder='Type your message' sx={{ fontSize:'23px',width:'80%',p:'12px'}} />

    <Stack direction="row" >
      <Button  id='sendbtn' variant="contained" endIcon={<SendIcon/>} sx={{mr:3}}>
        Send
      </Button>
    </Stack>

   </Box>
    
  )
}

export default Input