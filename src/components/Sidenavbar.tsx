/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { SiArlo } from "react-icons/si";
import { MenuItem } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import Profile from "./Profile";
import "../index.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";

type PopupContextType = any;

export const PopupContext = createContext<PopupContextType | undefined>(
  undefined
);

function Sidenavbar() {
  // const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const currentUser = useContext(AuthContext);
  const settings = ["Profile", "Logout"];
  const [popup, setPopup] = useState(true);
  const [camera, setCamera] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  function handleCloseUserMenu(setting: string) {
    if (setting === "Profile") {
      setAnchorElUser(null);
      setPopup(false);
    }

    if (setting === "Logout") {
      signOut(auth);
    }

    setAnchorElUser(null);
  }

  const closeCamera = () => {
    setCamera(false);
  };

  return (
    <>
      <PopupContext.Provider value={{ setPopup }}>
        {!popup ? <Profile setcamera={setCamera} /> : null}
        {popup}

        <div className={`${camera ? "overlayCamera" : "cameraNotactive"}`}>
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "35%",
              height: 480,
              width: 580,
              backgroundColor: "var(--main-color)",
              pt: 2,
              textAlign: "center",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <CloseIcon
              sx={{ fontSize: 40, cursor: "pointer", float: "left", pl: 2 }}
              onClick={() => closeCamera()}
            />
            <video src=""></video>
            <PhotoCameraIcon
              sx={{
                fontSize: 50,
                cursor: "pointer",
                "&:hover": { boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" },
              }}
            />
          </Box>{" "}
        </div>

        <AppBar
          position="static"
          sx={{
            height: { xs: "30%", md: "10%" },
            bgcolor: "var(--main-color)",
            // border: "5px solid blue",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              // border: "2px solid yellow",
              justifyContent: { sm: "space-between" },
            }}
          >
            <Toolbar disableGutters sx={{ width: "100%" }}>
              <SiArlo id="logo" />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: { lg: "space-between", md: "end", xs: "end" },
                  alignItems: "center",
                  width: { lg: "100%", md: "80%", xs: "100%" },
                  // border: "5px solid blue",
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  // href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    ml: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "sans-serif",
                    fontWeight: 700,
                    // fontsize:{lg:'35px', xs:'50px'},
                    letterSpacing: ".2rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Message Mingle
                </Typography>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={currentUser.displayName}
                        src={currentUser.photoURL}
                        sx={{
                          borderRadius: "50%",
                          height: { lg: "3.5rem", xs: "2rem" },
                          width: { lg: "3.5rem", xs: "2rem" },
                        }}
                      />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{ mt: "45px" }}
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
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </PopupContext.Provider>
    </>
  );
}

export default Sidenavbar;
