import { Avatar, Box,InputAdornment, InputBase, Paper } from "@mui/material";
import { SetStateAction, useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { Typography } from "@mui/material";
import "../index.css";
import { AuthContext } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";

// const currentUser = useContext(AuthContext)

function Searchbar() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<SetStateAction<any>>("");
  const [err, setErr] = useState(false);

  const currentUser = useContext(AuthContext);

  const handleSearch = async (event: any) => {
    event.preventDefault();

    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // Handle case where no users are found with the provided username
        console.log("No users found with the provided username");

        setErr(true);
      } else {
        // Assuming only one user is expected, get the first document
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        setUser(userData);
        setErr(false);
      }
    } catch (error) {
      // Handle error
      console.error("Error searching for users:", error);

      setErr(true);
    }
  };

  const handleKey = (event: any) => {
    event.code === "Enter" && handleSearch(event);
  };

  const handleSelect = async () => {
    //check whether group(chats in firestore) exists, if not
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log("combinedid=", combinedId);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // create a chat in chats collection

        // await setDoc(chatDocRef, { messages: [] });

        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }

    setUser(null);
    setUsername("");
   
    //create user chats
  };

  return (
   
    <Box>
     
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "default",
          p: {lg:1,xs:0.5},
          m: {lg:2,xs:1},
          backgroundColor: "transparent",
         
        }}
      >
        <InputBase
          placeholder="Search or start new chat"
          onKeyDown={handleKey}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          sx={{
            ml: 1,
            flex: 1,
            color: "white",
            border: "none",
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Paper>

      {err && (
        <Typography sx={{ textAlign: "center" }}>
          No users found with the provided username!
        </Typography>
      )}

      {user && (
        <Box
          className="user"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
            p: 2,
            pl: 4,
            mr: 3,
          }}
          onClick={handleSelect}
        >
          <Avatar
            alt={user.displayName}
            src={user.photoURL}
            sx={{ borderRadius: "50%", height: "4.5rem", width: "4.5rem" }}
          />
          <Typography variant="h6" sx={{ color: "#fff" }}>
            {" "}
            {user.displayName}
          </Typography>
        </Box>
      )}
      <hr />
    
    </Box>
 
  );
}

export default Searchbar;
