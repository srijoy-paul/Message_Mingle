import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home"
import Error from "./pages/Error";

export const router= createBrowserRouter([
{
    path:"/",
    element:<SignUp/>
},
{
    path:"/signin",
    element:<SignIn/>
},
{
    path:"/message_mingle",
    element:<Home/>
},
{
    path:"/*",
    element:<Error/>
}
])