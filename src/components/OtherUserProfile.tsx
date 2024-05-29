/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import "../index.css";
import EditIcon from "@mui/icons-material/Edit";

import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

import { PopupContext } from "./Sidenavbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Typography } from "@mui/material";

function OtherUserProfile() {
  const show = true;
  let username: string;

  const [viewimg, setViewImg] = useState(false);
  const currentUser = useContext(AuthContext);

  const { setPopup } = useContext(PopupContext);

  console.log("currentuser", currentUser);
  const [isReadOnlyname, setIsReadOnlyname] = useState(true);
  const [isReadOnlyabout, setIsReadOnlyabout] = useState(true);

  const toggleReadOnlyname = async () => {
    if (isReadOnlyname === true) {
      (document.getElementById("username") as HTMLInputElement | null)?.focus();
      setIsReadOnlyname(false);
    } else {
      await updateDoc(doc(db, "users", currentUser.uid), {
        displayName: username,
      });
      setIsReadOnlyname(true);
      console.log("updated");
    }
  };

  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    username = e.target.value;
    console.log("username=", username);
  };

  const toggleReadOnlyabout = () => {
    if (isReadOnlyabout === true) {
      (document.getElementById("userinfo") as HTMLInputElement | null)?.focus();
      setIsReadOnlyabout(false);
    } else {
      setIsReadOnlyabout(true);
    }
  };

  useEffect(() => {
    const ignoreClickOnImg = document.getElementsByClassName("profileimg")[0];

    const overlayimg = document.getElementsByClassName("overlayImg")[0];

    overlayimg?.addEventListener("click", function (e: any) {
      const isClick = ignoreClickOnImg.contains(e.target);

      if (!isClick) {
        setViewImg(false);
      }
    });
  }, [viewimg]);

  const closeProfile = () => {
    setPopup(true);
  };

  return (
    <>
      {!viewimg ? null : (
        <div className="overlayImg">
          <Box sx={{ position: "absolute", top: "20%", left: "38%" }}>
            <img
              alt={currentUser.displayName}
              src={currentUser.photoURL}
              className="profileimg"
            />
          </Box>{" "}
        </div>
      )}

      {!show ? null : <div className="overlay" />}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: " 100vh",
            height: "70vh",
            zIndex: 2,
            position: "absolute",
            top: "10%",
            left: "28%",
            bgcolor: "var(--second-color)",
          },
        }}
      >
        <Paper
          elevation={16}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CloseIcon
            sx={{
              fontSize: 30,
              cursor: "pointer",
              color: "white",
              float: "right",
              pt: 1,
            }}
            onClick={() => closeProfile()}
          />

          <Box sx={{ flexGrow: 0, p: "10px" }}>
            <Avatar
              alt={currentUser.displayName}
              src={currentUser.photoURL}
              sx={{
                borderRadius: "50%",
                height: { lg: "16.5rem", xs: "3rem" },
                width: { lg: "16.5rem", xs: "3rem" },
              }}
            />
          </Box>

          <Box sx={{ mt: "35px", width: "55%" }}>
            <Box sx={{ mb: "20px", borderBottom: "3px solid white" }}>
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: 600, letterSpacing: 2 }}
              >
                Your name
              </Typography>

              {/* <label htmlFor="username">Your name</label> */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                id="user"
              >
                <input
                  type="text"
                  className="userinfo"
                  id="username"
                  defaultValue={currentUser.displayName}
                  readOnly={isReadOnlyname}
                  onChange={(e) => updateUsername(e)}
                />{" "}
                <EditIcon
                  sx={{ fontSize: "25px", cursor: "pointer", mt: 1 }}
                  onClick={toggleReadOnlyname}
                />
              </Box>
            </Box>

            <Box sx={{ borderBottom: "3px solid white" }}>
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: 600, letterSpacing: 2 }}
              >
                About
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  type="text"
                  className="userinfo"
                  id="userinfo"
                  readOnly={isReadOnlyabout}
                />{" "}
                <EditIcon
                  sx={{ fontSize: "25px", cursor: "pointer" }}
                  onClick={toggleReadOnlyabout}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <ToastContainer />
    </>
  );
}

export default OtherUserProfile;
