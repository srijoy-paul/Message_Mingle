import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext: React.Context<any> = createContext({});

type Props = { children: React.ReactNode };

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    console.log('auth=',auth)
    if(auth){
    const unsub = onAuthStateChanged(auth, (user: any) => {
     console.log("USER FROM AUTH",user);
     
      setCurrentUser(user.auth.currentUser);
     
    });

    return () => {
      unsub();
    };
  }
  });

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
