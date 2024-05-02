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
    
    <Avatar alt="Remy Sharp" src={message.senderId === currentUser.uid? currentUser.photoURL : data.user.photoURL} sx={{borderRadius:'50%', height:{lg:'3.5rem',xs:'2rem'}, width:{lg:'3.5rem',xs:'2rem'}}}/>

    <Box className='messgContent' sx={{ p:{xs:'5px'},}}>
      <Typography variant='h6' sx={{pl:'10px', fontSize:{xs:'15px'}, display:'flex', flexWrap:'wrap', width:'60px'}}>{message.text}</Typography>

     { message.img && <img src={message.img} height='50px' width='50px'/>}
    </Box>

    </Box>
    
    
    </>
  )
}

export default Message