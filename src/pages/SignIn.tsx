import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../index.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiArlo } from "react-icons/si";
import "../index.css";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleIcon from "@mui/icons-material/Google";

const defaultTheme = createTheme();

export default function SignIn() {
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

  const [user] = useAuthState(auth);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  React.useEffect(() => {
    console.log("user=", user);
  }, [user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { name } = event.target;

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
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    const email: string = data.get("email") as string;
    const password: string = data.get("password") as string;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
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
          height: "75vh",
          width: "80vw",

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
            <Box sx={{ fontSize: "35px" }}>Welcome Back!</Box>
            <Box>{<SiArlo />}</Box>
            <Box sx={{ color: "var(--main-color)" }}>Message Mingle</Box>
            <Box sx={{ fontSize: "25px", mt: "25px" }}>
              {" "}
              "Join the conversation! Sign in and discover a world of
              connections waiting for you. Your journey begins with just a click
              –let's mingle!"
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
              {/* <LockOutlinedIcon /> */}
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onBlur={handleFocus}
                sx={{ borderColor: "var(--main-color)" }}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                // autoComplete="current-password"
              />
              {!isValid.password && focuse.password && (
                <span className="errorMessage">
                  *Password should be 8-20 characters and include atleast 1
                  capital letter, 1 number, 1 letter and 1 special character!
                </span>
              )}
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  p: 4,
                  fontSize: 20,
                  backgroundColor: "var(--main-color)",
                  "&:hover": {
                    backgroundColor: "var(--second-color)",
                  },
                }}
              >
                Sign In
              </Button>
              {err && <span>Email not exist, please do signup</span>}
              <Grid container>
                <Grid item xs>
                  <Link to="/forgotpassword">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">Don't have an account? Sign Up</Link>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
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
                  <GoogleIcon sx={{ color: "var(--main-color)" }} />
                </button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
