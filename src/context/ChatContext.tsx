
import { Dispatch, createContext, useContext } from "react";


import { AuthContext } from "./AuthContext";

import { useReducer } from "react";


// export const ChatContext = createContext({data:{}, dispatch:()=>{}});

export const ChatContext = createContext<{
    data: StateType;
    dispatch: Dispatch<ActionType>;
  }>({
    data: {user:{}, chatId:"", uid:''}, // Initial state
    dispatch: () => {}, // Initial dispatch function
  });

type Props = {children: React.ReactNode}

type StateType = {
    user: any;
    chatId: any;
    uid:any;
  };
  
 
  type ActionType = {
    type: string;
    payload: any; 
  };

export const ChatContextProvider = ({children}:Props)=>{

    const currentUser:any = useContext(AuthContext);

    const INITIAL_STATE={
        chatId:'null',
        user:{}
    }

    const chatReducer = (state:StateType, action:ActionType)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                }
                default:
                    return state

                    
        }
    }
const [state,dispatch]=useReducer(chatReducer,INITIAL_STATE)

return(
<ChatContext.Provider value={{data:state,dispatch}}>
{children}
</ChatContext.Provider>
)


} 

