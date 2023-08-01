/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { useAuth } from "./AuthContext";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    isLoading: false,
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "LOADING":
        return { ...state, isLoading: true };
      case "CHANGE_USER":
        return {
          ...state,
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
          isLoading: false,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  console.log(state);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

function useChat() {
  const context = useContext(ChatContext);
  if (context == undefined) {
    throw new Error("The Chat Context was used outside its provider");
  }
  return context;
}

export { ChatProvider, useChat };
