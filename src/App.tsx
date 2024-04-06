import React from 'react'
import Signin from './pages/SignIn'
import SignUp from './pages/SignUp'
import {router} from './routes'
import { RouterProvider } from 'react-router-dom'


function App() {
  return (
   
   
    <RouterProvider router={router}/>
  )
}

export default App