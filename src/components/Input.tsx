import { Box, Button, InputBase, Stack } from "@mui/material";
import "../index.css";
import SendIcon from "@mui/icons-material/Send";
import { useState, useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import {
  updateDoc,
  arrayUnion,
  doc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";

import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { storage, db } from "../firebase";
import { v4 as uuid } from "uuid";

function Input() {
  const currentUser = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [err, setErr] = useState(false);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.log(error);
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });

            // console.log("updatedprofile=",res)
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    setText("");
    setImg(null);

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },

      [data.chatId + ".date"]: serverTimestamp(),
    });

    console.log('datauid , datachatid =', data.uid, data.chatId)
    await updateDoc(doc(db, "userChats", data.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },

      [data.chatId + ".date"]: serverTimestamp(),
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "#ddddf7",
        display: "flex",
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        gap: { lg: 15, xs: 9 },
        p: { lg: "10px", xs: "5px" },
      }}
    >
      {err && <span>Unable to send your message</span>}
      <InputBase
        placeholder="Type your message"
        sx={{ fontSize: { lg: "23px", xs: "18px" }, width: "80%", p: "12px" }}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <Stack direction="row">
        <Button
          id="sendbtn"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ mr: 3 }}
          onClick={handleSend}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
}

export default Input;
