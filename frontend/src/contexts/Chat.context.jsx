import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth.context";
import {
  getAllUsers,
  getAllMessages,
  markMessage,
  sendMessage,
} from "../services/message.service";

const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
  // store all message
  const [message, setmessage] = useState([]);
  // store all user
  const [user, setuser] = useState([]);
  // select user id store
  const [selectedUser, setSelectedUser] = useState(null);
  // unsent/unread counter map keyed by senderId
  const [unsendmessage, setunsendmessage] = useState({});

  // auth context file unse sockit and api in axiow
  const backendurl = import.meta.env.VITE_API_URL;
  const {Sockit} = useContext(AuthContext)||{};

  // all messages router  hooks

  const Alluser = async () => {
    try {
      const  data  = await getAllUsers();
      setuser(data.users);
      console.log(data.users);
      console.log(data.UnsendMessage);
      setunsendmessage(data.UnsendMessage || {});

    } catch (error) {
      console.log(error);
    }
  };

  //get select user messate
  const selectusermessate = async (userId) => {
    try {
      const  data  = await getAllMessages(userId);
      setmessage(data.message);
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // send select user messate

const sendmessagesuser = async (fromdata) => {
  try {
    const data = await sendMessage(selectedUser._id, fromdata);
    console.log("Backend response data:", data);
    
    // 1. Safely grab the newly created message object from 'data.data'
    const newMessage = data?.data; 
    
    if (newMessage) {
      setmessage((prevMessages) => {
        // 2. Defensive check: Fallback to an empty array if prevMessages isn't an array yet
        const currentMessages = Array.isArray(prevMessages) ? prevMessages : [];
        return [...currentMessages, newMessage];
      });
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

  // mark all message
  const markallmessage = async () => {
    try {
      if (!Sockit) return;
      const handler = (newmessage) => {
        if (selectedUser && selectedUser._id === newmessage.sender) {
          selectusermessate(selectedUser._id);
          return;
        }

        setunsendmessage((prevunsendmessage) => {
          const current = prevunsendmessage?.[newmessage.sender] || 0;
          return {
            ...prevunsendmessage,
            [newmessage.sender]: current + 1,
          };
        });
      };

      Sockit.on("newmessage", handler);


      const  data  = await markMessage(selectedUser._id);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // un subscribe form message

  const unsuberibemessage = () => {
    if (!Sockit) return;
    Sockit.off("newmessage");
  };


  useEffect(() => {
    markallmessage();
    return () => unsuberibemessage();
  }, [Sockit,selectedUser ]);

  const value = {
    message,
    setmessage,
    user,
    setuser,
    selectedUser,
    setSelectedUser,
    markallmessage,
    unsuberibemessage,
    backendurl,
    Sockit,
    unsendmessage,
    setunsendmessage,
    Alluser,
    selectusermessate,
    sendmessagesuser,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
export { ChatContext };
