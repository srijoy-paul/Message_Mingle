import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import "../index.css";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { updateProfile } from "firebase/auth";
import { PopupContext } from "./Sidenavbar";
import {  deleteObject } from "firebase/storage";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile(props) {
  // const [show, setShow] = useState(true)
console.log(props)
  const show = true;
  const [viewimg, setViewImg] = useState(false);

  const { popup, setPopup } = useContext(PopupContext);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const currentUser = useContext(AuthContext);
  console.log("currentuser", currentUser);
  const [isReadOnlyname, setIsReadOnlyname] = useState(true);
  const [isReadOnlyabout, setIsReadOnlyabout] = useState(true);
  const settings = [
    "View Photo",
    "Upload Photo",
    "Take Photo",
    "Remove Photo",
    "Generate Photo",
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  function handleCloseUserMenu(setting: string) {
    if (setting === "View Photo") {
      setViewImg(true);
    }

    if (setting === "Upload Photo") {
      document.getElementById("file").click();
    }

    if (setting === "Take Photo") {
      var front = false;
      var video = document.querySelector("video");
      front = !front;
      var constraints = {
        video: {
          facingMode: front ? "user" : "environment",
          width: 640,
          height: 480,
         
        },
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (mediaStream) {
          video.srcObject = mediaStream;
          video.onloadedmetadata = function (e) {
            video.play();
          };
          setPopup(true);
          props.setcamera(true)
        })
        .catch(function (err) {
          console.log(err.name + ": " + err.message);
        });
    }

    if(setting === 'Remove Photo')
      {
        const data = localStorage.getItem('profile_name')
        console.log('data=', data)
        const desertRef = ref(storage, localStorage.getItem('profile_name'));
        if(data === null)
          {
            toast.info('There is no photo to remove')
           
          }
        localStorage.removeItem('profile_name')


deleteObject(desertRef).then(() => {
 
  
  setPopup(true);
}).catch((error) => {
  console.log(error)
});
      }

    setAnchorElUser(null);
  }

  const toggleReadOnlyname = () => {
    setIsReadOnlyname(!isReadOnlyname);
  };

  const toggleReadOnlyabout = () => {
    setIsReadOnlyabout(!isReadOnlyabout);
  };

  useEffect(() => {
    const ignoreClickOnImg = document.getElementsByClassName("profileimg")[0];

    const overlayimg = document.getElementsByClassName("overlayImg")[0];

    overlayimg?.addEventListener("click", function (e) {
      const isClick = ignoreClickOnImg.contains(e.target);

      if (!isClick) {
        setViewImg(false);
      }
    });
  }, [viewimg]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const token = nanoid();
    const storageRef = ref(storage, currentUser.displayName + "_" + token);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(currentUser, {
            photoURL: downloadURL,
          });

          localStorage.setItem('profile_name', currentUser.displayName+'_'+token)

          await updateDoc(doc(db, "users", currentUser.uid), {
            photoURL: downloadURL,
          });
        });

        
      }
    );
    //  setShow(false)
    setPopup(true);
  };

  return (
    <>
      <div>
        <TextField
          margin="normal"
          required
          fullWidth
          name="file"
          type="file"
          id="file"
          autoComplete="file"
          onChange={handleFileChange}
          sx={{ display: "none" }}
        />
      </div>

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
          <Box sx={{ flexGrow: 0, p: "30px" }}>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, position: "relative", overflow: "hidden" }}
              id="profilephoto"
            >
              <Avatar
                alt={currentUser.displayName}
                src={currentUser.photoURL}
                sx={{
                  borderRadius: "50%",
                  height: { lg: "16.5rem", xs: "3rem" },
                  width: { lg: "16.5rem", xs: "3rem" },
                }}
              />

              <Box
                sx={{
                  bgcolor: "rgb(6,0,0)",

                  color: "#fff",
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  opacity: "0.8",
                  transition: "0.6s",
                  height: { lg: "16.5rem", xs: "3rem" },
                  width: { lg: "16.5rem", xs: "3rem" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                id="profileimghover"
              >
                <Box>
                  <CameraAltIcon sx={{ color: "white", fontSize: "35px" }} />
                  <Typography variant="h5">UPDATE PROFILE IMAGE</Typography>
                </Box>
              </Box>
            </IconButton>

            <Menu
              sx={{ mt: "120px", ml: "130px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center" variant="h6">
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ mt: "40px", width: "55%" }}>
            <Box sx={{ mb: "20px" }}>
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
                  boxShadow: "2px 4px 6px rgba(0,0,0,0.5)",
                }}
                id="user"
              >
                <input
                  type="text"
                  className="userinfo"
                  id="username"
                  readOnly={isReadOnlyname}
                  autoFocus={!isReadOnlyname}
                />{" "}
                <EditIcon
                  sx={{ fontSize: "30px", cursor: "pointer", mt: 1 }}
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
                  readOnly={isReadOnlyabout}
                  autoFocus={!isReadOnlyabout}
                />{" "}
                <EditIcon
                  sx={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={toggleReadOnlyabout}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <ToastContainer/>
    </>
  );
}

export default Profile;
