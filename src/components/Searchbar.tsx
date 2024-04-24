import { Avatar, Box, InputAdornment, InputBase, Paper } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {db} from '../firebase'
import { collection, query, where, getDocs, } from "firebase/firestore";
import {Typography} from '@mui/material';
import '../index.css'


function Searchbar() {
  const [username , setUsername] = useState("");
  const [user, setUser]= useState('');
  const [err, setErr]= useState(false);
  

  const handleSearch= async(event)=>{

    event.preventDefault();
    console.log("username",username)
    const q = query(collection(db, "users"),where("displayName", "==", username));
   

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // Handle case where no users are found with the provided username
      console.log("No users found with the provided username");
    } else {
      // Assuming only one user is expected, get the first document
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      setUser(userData);
    }
  } catch (error) {
    // Handle error
    console.error("Error searching for users:", error);
    setErr(true);
  }
};

  
  

  const handleKey = (e) =>{
   
    e.code==="Enter"&& handleSearch(e);

  }

  return (
    <Box>
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "default",
              p: 1,
              m:2,
              backgroundColor: "transparent", 
              border: "none",
            }}
          >
            <InputBase
              placeholder="Search or start new chat"
              onKeyDown={handleKey}
              onChange={(e)=>{setUsername(e.target.value)}}
              sx={{
                ml: 1,
                flex: 1,
                color: "white",
                border: "none",
              }}
                  
              
              startAdornment={
                <InputAdornment position="start">
                <SearchIcon/>
                </InputAdornment>
              }
            />
          </Paper>
              {err && <span>User not found!</span>}
              
              {user && <Box  className='user' sx={{display:'flex',alignItems:'center', gap:2,cursor:'pointer', p:2, mr:3,border:'2px solid red'}}>
                <Avatar alt={user.displayName} src={user.photoURL} sx={{borderRadius:'50%', height:'4.5rem', width:'4.5rem'}}/>
                <Typography variant='h6' sx={{color:'#fff'}}> {user.displayName}</Typography>
              </Box>}
        </Box>
  )
}

export default Searchbar