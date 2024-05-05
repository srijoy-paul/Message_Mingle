import React, { useState } from 'react'
import { getAuth,sendPasswordResetEmail} from "firebase/auth"
import { toast, ToastContainer } from 'react-toastify';
import { Box, Button, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import 'react-toastify/dist/ReactToastify.css';


function Forgotpassword() {
   
     
    

    const handleSubmit = async(event:any)=>{
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email: string = data.get("email") as string;
        


        try {
            const auth = getAuth()
            

       const emailid = await sendPasswordResetEmail(auth, email)
       console.log('emailid=', emailid)
        toast.success('Email sent')

        } catch (error) {
            toast.error('Could not resend email')
            console.log(error)
        }
    }

       

       

    
  return (
 
            <Box
              component="form"
            
              onSubmit={handleSubmit}
              sx={{  height:'65vh', width:'35%', m:'auto', my:8, boxShadow:'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', textAlign:'center', borderRadius:'3%',  display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}
            >
                <LockIcon sx={{fontSize:'5rem' ,mb:'30px'}}/>

                <Typography variant='h4' >Forgot Password ?</Typography>
                <Typography variant='h6'>You can reset your password here </Typography>
              <TextField
                margin="normal"
                required
                
                id="email"
                label="Email Address"
                name="email"
                type="email"
           
                className="textfield"
             sx={{  width:'80%',}}
                
               
              />

                <Button
                type="submit"
               
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  p: 3,
                    width:'80%',
                  fontSize: 20,
                  backgroundColor: "var(--main-color)",
                  "&:hover": {
                    backgroundColor: "var(--second-color)",
                  },
                }}
              >
             Send my Email
              </Button>

              <ToastContainer/>
              </Box>
 
  )
}

export default Forgotpassword