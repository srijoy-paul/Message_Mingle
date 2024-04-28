

import {ChatContext} from '../context/ChatContext'
import {Box } from '@mui/material'
import { useState , useEffect, useContext} from 'react';
import { onSnapshot ,doc} from 'firebase/firestore';
import Message from '../components/Message'
import {db} from '../firebase'

function Messages() {

  const [messages, setMessages] = useState([]); 

  const data = useContext(ChatContext); 
  console.log("data=", data)

  useEffect(()=>{

    const unSub = onSnapshot(doc(db, "chats", data.data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages)
      
    })
    return ()=>{
      unSub();
    }
  } ,[data.data.chatId])



  return (
    <Box id='messgContainer' sx={{height:'80%',ml:3,mr:2}}>

      {messages.map((m:any)=>{
      return(
        <Message message={m} key={m.id}/>
      )
    
    })}
    </Box>
   
   
  
  )
}

export default Messages