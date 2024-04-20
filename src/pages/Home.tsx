import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { Box,Grid } from '@mui/material'
import '../index.css'

function Home() {
  return (
    <>
   
    <Grid container spacing={1} sx={{height:'100vh'}}>
  
  <Grid  xs={4} sx={{bgcolor:'var(--second-color)',overflowY:'hidden',height:"100%"}}>
  <Sidebar/>
  </Grid>
 
  <Grid xs={8} sx={{bgcolor:'var(--light-color)',overflowY:'hidden',height:"100%"}}>
  <Chat/>
  </Grid>
</Grid>
   
   
   
      
  
    
    </>
   

  )
}

export default Home