import * as React from "react";
import "../index.css";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Add from "../image/AddAvatar.png";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../index.css";
import { Link } from "react-router-dom";
import { SiArlo } from "react-icons/si";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleIcon from "@mui/icons-material/Google";

import { nanoid } from "nanoid";

const defaultTheme = createTheme();

export default function SignUp() {
  const [err, setErr] = useState(false);

  const [isValid, setIsValid] = useState({
    username: true,
    email: true,
    password: true,
  });

  const [focuse, setFocused] = useState({
    username: false,
    email: false,
    password: false,
  });

  // google authentication

  const [user] = useAuthState(auth);

  const signInWithGoogle = async () => {
    try {
      const userdata = await signInWithPopup(auth, googleProvider);
      console.log("userData", userdata);
      
      await setDoc(doc(db, "users", userdata.user.uid), {
        uid: userdata.user.uid,
        displayName: userdata.user.displayName,
        email: userdata.user.email,
        photoURL: userdata.user.photoURL,
      });

      await setDoc(doc(db, "userChats", userdata.user.uid), {});
      

      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  React.useEffect(() => {
    
    console.log("users=", user);
  
  }, [user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { name } = event.target;

    if (name == "username") {
      setIsValid((prevState) => {
        return {
          ...prevState,
          username: /^[a-zA-Z][a-zA-Z0-9-_]{3,32}$/.test(value),
        };
      });
    }
    if (name == "email") {
      setIsValid((prevState) => {
        return {
          ...prevState,
          email: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(value),
        };
      });
    }
    if (name == "password") {
      setIsValid((prevState) => {
        return {
          ...prevState,
          password:
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value),
        };
      });
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    if (name == "username") {
      setFocused((prevState) => {
        return { ...prevState, username: true };
      });
    }

    if (name == "email") {
      setFocused((prevState) => {
        return { ...prevState, email: true };
      });
    }

    if (name == "password") {
      setFocused((prevState) => {
        return { ...prevState, password: true };
      });
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const displayName: string = data.get("username") as string;

    const email: string = data.get("email") as string;
    const password: string = data.get("password") as string;
    const file: File = data.get("file") as File;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("res=", res);
      const token = nanoid();

      const storageRef = ref(storage, displayName + "_" + token);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.log(error);
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // console.log("File available at", downloadURL);

            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            localStorage.setItem('profile_name', displayName+'_'+token)

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        id="mainCard"
        sx={{
          height: "75%",
          width: "80%",

          position: "relative",
          overflow: "hidden",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",

          margin: {
            xs: " 6rem auto",
            lg: "6rem auto",
          },
        }}
      >
        <CssBaseline />

        <Box
          id="hoverEfft"
          sx={{
            bgcolor: "rgb(6,0,0)",
            height: { xs: "100vh", lg: "100%" },

            color: "#fff",
            position: "absolute",
            top: 0,
            left: "-100%",
            opacity: "0.7",
            transition: "1s",

            justifyContent: "center",
            alignItems: "center",

            fontSize: 35,

            width: {
              lg: "58.5%",
            },
            display: {
              xs: "none",
              lg: "flex",
              sm: "none",
            },
          }}
        >
          <Box
            sx={{
              width: "70%",
              height: "70%",
              // display: "flex",
              // justifyContent: "center",
              m: "auto",
              textAlign: "center",
              pt: "2rem",
            }}
          >
            <Box sx={{ fontSize: "35px" }}>Welcome to </Box>
            <Box>{<SiArlo />}</Box>
            <Box sx={{ color: "var(--main-color)" }}>Message Mingle</Box>
            <Box sx={{ fontSize: "25px", mt: "25px" }}>
              {" "}
              " Where Every Interaction Counts! Discover a world of connections,
              tailored just for you. Join us and make every chat a special
              moment."
            </Box>
          </Box>
        </Box>

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "var(--main-color)" }}>
              <SiArlo />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="username"
                label="User Name"
                name="username"
                type="text"
                className="textfield"
                required={true}
                onChange={handleInputChange}
                onBlur={handleFocus}
                error={!isValid.username}
              />
              {!isValid.username && focuse.username && (
                <span className="errorMessage">
                  *Username should be 3-16 characters and shouldn't contain any
                  special character!
                </span>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                onBlur={handleFocus}
                className="textfield"
                onChange={handleInputChange}
                error={!isValid.email}
              />
              {!isValid.email && focuse.email && (
                <span className="errorMessage">
                  *It should be a valid email address!{" "}
                </span>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onBlur={handleFocus}
                className="textfield"
                onChange={handleInputChange}
                error={!isValid.password}
              />
              {!isValid.password && focuse.password && (
                <span className="errorMessage">
                  *Password should be 8-20 characters and include atleast 1
                  capital letter, 1 number, 1 letter and 1 special character!
                </span>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                autoComplete="file"
                // className="textfield"
                sx={{ display: "none" }}
              />

              <label htmlFor="file" id="avatar">
                <img src={Add} alt="image" height="45px" width="45px" />{" "}
                <span style={{ color: "gray" }}>Add your Profile image</span>
              </label>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  p: 3,
                  fontSize: 20,
                  backgroundColor: "var(--main-color)",
                  "&:hover": {
                    backgroundColor: "var(--second-color)",
                  },
                }}
              >
                Sign up
              </Button>
              {err && <span>Email is already in use</span>}
              <Grid container>
                <Grid item>
                  <Link to="/signin">Already have an account? Sign In</Link>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  mt: 2,
                }}
              >
                <div id="line"></div>
                <span id="or">or</span>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                <button
                  onClick={signInWithGoogle}
                  style={{ border: "none", cursor: "pointer" }}
                >
                  <GoogleIcon sx={{ color: "var(--main-color)" }} />{" "}
                </button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
