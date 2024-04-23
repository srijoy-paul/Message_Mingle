import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home"
import Error from "./pages/Error";
import ProtectedRoute from './components/ProtectedRoute'

export const router= createBrowserRouter([
{
    path:"signup",
    element:<SignUp/>
},
{
    path:"/signin",
    element:<SignIn/>
},
{
   
    path:"/", 
    element: (<ProtectedRoute> <Home/> </ProtectedRoute>) 
},
{
    path:"/*",
    element:<Error/>
}
])