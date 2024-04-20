import { Box, InputAdornment, InputBase, Paper } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function Searchbar() {
  return (
    <Box>
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "default",
              p: 1,
              m:2,
              backgroundColor: "transparent", 
              border: "none",
            }}
          >
            <InputBase
              placeholder="Search or start new chat"
              sx={{
                ml: 1,
                flex: 1,
                color: "white",
                border: "none",
              }}
                  
              
              startAdornment={
                <InputAdornment position="start">
                <SearchIcon/>
                </InputAdornment>
              }
            />
          </Paper>
        </Box>
  )
}

export default Searchbar