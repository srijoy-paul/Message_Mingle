import React from "react";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext'
import { Navigate} from 'react-router-dom'

type Props={children:React.ReactNode}

 

const ProtectedRoute = ({children}:Props)=>{  
    const currentUser = useContext(AuthContext);
    console.log("currentuser=",currentUser)
    
    return ((currentUser)? children: <Navigate to='/signin'/>) 

}
export default ProtectedRoute