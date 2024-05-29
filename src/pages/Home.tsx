/* eslint-disable @typescript-eslint/no-explicit-any */
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { Box, Hidden } from "@mui/material";
import "../index.css";
import { createContext, useState } from "react";

export const ChangeContext = createContext<any>(null);

function Home() {
  const [change, setChange] = useState(false);

  console.log("rendered");

  return (
    <>
      <ChangeContext.Provider value={{ setChange }}>
        {change}

        <Box
          sx={{
            display: "flex",
            height: "100vh",

            //  overflow: "hidden",
            flexDirection: { md: "row", sm: "column", xs: "column" },
          }}
        >
          <Box
            sx={{
              bgcolor: "var(--second-color)",

              height: { md: "100vh", xs: "20%" },
              width: { md: "30%", xs: "100%" },
            }}
          >
            <Sidebar />
          </Box>

          <Box
            sx={{
              bgcolor: "var(--light-color)",

              height: { md: "100vh", xs: "80%" },

              width: { md: "70%", xs: "100%" },
            }}
          >
            <Chat />
          </Box>
        </Box>
      </ChangeContext.Provider>
    </>
  );
}

export default Home;
