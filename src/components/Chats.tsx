import { Box } from "@mui/system";
import { SetStateAction, useContext, useEffect, useState } from "react";
import "../index.css";
import { Avatar, Typography } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import {ChatContext} from '../context/ChatContext'

function Chats() {
  const [chats, setChats] = useState<SetStateAction<any>>([]);

  const currentUser = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
 
  console.log('chats=',chats)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser?.uid), (doc) => {
       console.log('doc=',doc.data())
        setChats(doc.data());
       

        return () => {
          unsub();
        };
      });
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // console.log("chats=",Object.entries(chats))

  const handleSelect =(u:any)=>{
    
    dispatch({type:'CHANGE_USER',payload:u})  
  }

  return (
    <Box id="chat-container" sx={{ height: "80%", m: 2, overflowY: "scroll" }}>
      {Object?.entries(chats)?.sort((a:any,b:any)=>{ return b[1].date - a[1].date}).map((chat:any)=>{ 
        return(
        <Box
        className="user"
        sx={{ display: "flex", gap: 2, cursor: "pointer", p: 2, mr: 3 }}
        key={chat[0]}
        onClick={()=>handleSelect(chat[1]?.userInfo)}
      >
        <Avatar
          alt="Remy Sharp"
          src={chat[1]?.userInfo.photoURL}
          sx={{ borderRadius: "50%", height: "4.5rem", width: "4.5rem" }}
        />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            {chat[1]?.userInfo.displayName}
            
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            {/* {chat[1].userInfo.lastMessage?.text} */}
            {chat[1]?.lastMessage?.text}
          </Typography>
        </Box>
      </Box>)
      })}
      
    </Box>
  );
}

export default Chats;
