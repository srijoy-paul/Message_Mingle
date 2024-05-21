import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { Box } from "@mui/material";
import "../index.css";

function Home() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          flexDirection: { md: "row", sm: "column", xs: "column" },
        
        }}
      >
        <Box
          sx={{
            bgcolor: "var(--second-color)",

            height: { md: "100%", xs: "20%" },
            width: { md: "30%", xs: "100%" },
           
          }}
        >
          <Sidebar />
        </Box>

        <Box
          sx={{
            bgcolor: "var(--light-color)",

            height: { md: "100%", xs: "80%" },

            width: { md: "70%", xs: "100%" },
          }}
        >
          <Chat />
        </Box>
      </Box>
    </>
  );
}

export default Home;
