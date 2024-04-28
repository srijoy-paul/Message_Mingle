import { useEffect, useRef } from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

type Props = {message:any};
function Message({message}:Props) {

    const currentUser = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const myRef:any=useRef();
    console.log('ref=', myRef);

    useEffect(()=>{
      myRef.current?.scrollIntoView({behaviour:'smooth'}) 
    },[message])

  
  return (
<>
    <Box className={`message ${message.senderId === currentUser.uid && 'ownermessg'}`} ref={myRef} >
    
    <Avatar alt="Remy Sharp" src={message.senderId === currentUser.uid? currentUser.photoURL : data.user.photoURL} sx={{borderRadius:'50%', height:'3.5rem', width:'3.5rem'}}/>

    <Box className='messgContent' >
      <Typography variant='h6'>{message.text}</Typography>
     { message.img && <img src={message.img} height='50px' width='50px'/>}
    </Box>

    </Box>
    
    
    </>
  )
}

export default Message