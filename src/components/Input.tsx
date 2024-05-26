import { Box, Button } from "@mui/material";
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

import InputEmoji from "react-input-emoji";

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

    console.log("datauid , datachatid =", data.uid, data.chatId);
    await updateDoc(doc(db, "userChats", data.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },

      [data.chatId + ".date"]: serverTimestamp(),
    });
  };

  function handleOnEnter(text: any) {
    console.log("enter", text);
  }

  return (
    <Box
      sx={{
        bgcolor: "#ddddf7",
        display: "flex",
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        gap: { lg: 15, xs: 9 },
        padding: { lg: "7px", xs: "4px" },
      }}
    >
      {err && <span>Unable to send your message</span>}

      <InputEmoji
        value={text}
        onChange={(e: any) => setText(e.target.value)}
        cleanOnEnter
        onEnter={handleOnEnter}
        color="#494846"
        background="#ddddf7"
        fontSize={16}
        placeholder="Type your message here..."
        shouldReturn={false}
        shouldConvertEmojiToImage={false}
      />

      <Button
        id="sendbtn"
        variant="contained"
        endIcon={<SendIcon />}
        sx={{ mr: 3 }}
        onClick={handleSend}
      >
        Send
      </Button>
    </Box>
  );
}

export default Input;
