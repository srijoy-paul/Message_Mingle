import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home"
import Error from "./pages/Error";
import ProtectedRoute from './components/ProtectedRoute'
import Forgotpassword from "./pages/Forgotpassword";

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
   
    path:"/forgotpassword", 
    element: <Forgotpassword/>
},
{
    path:"/*",
    element:<Error/>
}
])