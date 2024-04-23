import { Box, InputAdornment, InputBase, Paper } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {db} from '../firebase'
import { collection, query, where, getDocs } from "firebase/firestore";

function Searchbar() {
  const [username , setUsername] = useState("");
  const [user, setUser]= useState("");
  const [err, setErr]= useState("");
  

  const handleSearch= async()=>{
    const q = query(collection(db, "users"),where("displayName ", "==" ,"username"));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
     setUser(doc.data())
  });
    } catch (error) {
      setErr(true);
    }
   
  }

  const handleKey = (e) =>{
    e.code==="Enter"&& handleSearch();

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
        </Box>
  )
}

export default Searchbar