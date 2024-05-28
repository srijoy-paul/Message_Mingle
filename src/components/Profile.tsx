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
import { deleteObject } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeContext } from "../pages/Home";

function Profile(props: any) {
  const show = true;
  let username;
  const [viewimg, setViewImg] = useState(false);
  const currentUser = useContext(AuthContext);
  const { setChange } = useContext(ChangeContext);

  const { setPopup } = useContext(PopupContext);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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
      (document.getElementById("file") as HTMLElement | null)?.click();
    }

    if (setting === "Take Photo") {
      var front = false;
      var video = document.querySelector("video") as HTMLVideoElement | null;
      front = !front;
      var constraints = {
        video: {
          facingMode: front ? "user" : "environment",
          width: 540,
          height: 380,
        },
      };
      if (video) {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((mediaStream) => {
            if (video === null) return;
            video.srcObject = mediaStream;
            video.onloadedmetadata = function () {
              video?.play();
            };
            setPopup(true);
            props.setcamera(true);
          })
          .catch((err) => {
            console.log(err.name + ": " + err.message);
          });
      } else {
        console.error("Video element not found");
      }
    }

    if (setting === "Remove Photo") {
      const profile_Name =
        localStorage.getItem("profile_name") ?? "default-profile-name";

      const desertRef = ref(storage, profile_Name);

      if (profile_Name === null) {
        toast.info("There is no photo to remove");
      }
      localStorage.removeItem("profile_name");

      deleteObject(desertRef)
        .then(() => {
          setPopup(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setAnchorElUser(null);
  }

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

  const updateUsername = (e) => {
    username = e.target.value;
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

  // useEffect(() => {

  //     setChange(true);

  // });

  const handleFileChange = (event: any) => {
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

          localStorage.setItem(
            "profile_name",
            currentUser.displayName + "_" + token
          );

          await updateDoc(doc(db, "users", currentUser.uid), {
            photoURL: downloadURL,
          });
        });
        setChange(true);
        setPopup(true);
      }
    );
    //  setShow(false)
  };

  const closeProfile = () => {
    setPopup(true);
  };

  return (
    <>
      {console.log("currentusername=", currentUser)}
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

export default Profile;
