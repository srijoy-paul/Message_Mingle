/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/system";
import { SetStateAction, useContext, useEffect, useState } from "react";
import "../index.css";
import { Avatar, Hidden, Typography } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

function Chats() {
  const [chats, setChats] = useState<SetStateAction<any>>([]);

  const currentUser = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  console.log("chats=", chats, currentUser.uid);

  useEffect(() => {
    try {
      const getChats = () => {
        const unsub = onSnapshot(
          doc(db, "userChats", currentUser?.uid),
          (docs) => {
            console.log("doc=", docs.data());
            setChats(docs.data());

            return () => {
              unsub();
            };
          }
        );
      };
      currentUser.uid && getChats();
    } catch (error) {
      console.log("error", error);
    }
  }, [currentUser.uid]);

  // console.log("chats=",Object.entries(chats))

  const handleSelect = (u: any) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <Box
      id="chat-container"
      sx={{
        height: { lg: "80%", xs: "30%" },
        m: { lg: 2, xs: 0 },
        overflowY: { lg: "scroll" },
        width: { xs: "100%" },
        display: { xs: "flex", lg: "block" },
      }}
    >
      {Object?.entries(chats)
        ?.sort((a: any, b: any) => {
          return b[1].date - a[1].date;
        })
        .map((chat: any) => {
          console.log("chat=", chat);
          return (
            <Box
              className="user"
              sx={{ display: "flex", gap: 2, cursor: "pointer", p: 2, mr: 3 }}
              key={chat[0]}
              onClick={() => handleSelect(chat[1]?.userInfo)}
            >
              <Avatar
                alt=""
                src={chat[1]?.userInfo.photoURL}
                sx={{
                  borderRadius: "50% ",
                  width: { lg: "4rem", sm: "3.5" },
                  height: {
                    lg: "4rem",
                    sm: "3.5rem",
                  },
                }}
              />
              <Hidden mdDown>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontSize: { lg: "18px", sm: "16px" } }}
                  >
                    {chat[1]?.userInfo.displayName}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#E8DFCA",
                      fontSize: { lg: "15px", sm: "12px" },
                    }}
                    title={chat[1]?.lastMessage?.text}
                  >
                    {/* {chat[1].userInfo.lastMessage?.text} */}
                    {chat[1]?.lastMessage?.text}
                  </Typography>
                </Box>
              </Hidden>
            </Box>
          );
        })}
    </Box>
  );
}

export default Chats;
