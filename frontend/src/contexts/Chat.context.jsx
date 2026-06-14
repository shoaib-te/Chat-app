import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "./Auth.context";
import {
  getAllUsers,
  getAllMessages,
  markMessage,
  sendMessage,
} from "../services/message.service";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [message, setmessage] = useState([]);
  const [user, setuser] = useState([]);
  // FIX 1: Initialised as null because selectedUser represents a single user object, not an array
  const [selectedUser, setSelectedUser] = useState(null); 
  const [unsendmessage, setunsendmessage] = useState({});
      
  const backendurl = import.meta.env.VITE_API_URL;
  const { Sockit } = useContext(AuthContext) || {};

  // 1. Fetch all users on mount
  const Alluser = useCallback(async () => {
    try {
      const data = await getAllUsers();
      setuser(data.users || []);
      setunsendmessage(data.UnsendMessage || {});
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  }, []);

  useEffect(() => {
    void Alluser();
  }, [Alluser]);

  // 2. Fetch specific user conversation
  const selectusermessate = useCallback(async (userId) => {
    if (!userId) return;
    try {
      const data = await getAllMessages(userId);
      setmessage(data.message || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, []);

  // 3. Mark messages as read when a user is selected
  const markallmessage = useCallback(async (userId) => {
    if (!userId) return;
    try {
      const data = await markMessage(userId);
      setunsendmessage((prev) => {
        if (!prev || !(userId in prev)) return prev || {}; // Safety guard
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
      console.log("Messages marked as read:", data);
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  }, []);

  // Sync message fetching and marking read when selected user changes
  useEffect(() => {
    // FIX 2: Added optional chaining check for selectedUser._id
    if (!selectedUser?._id) return; 
    
  }, [selectedUser, selectusermessate, markallmessage]);

  // 4. Send Message API call
  const sendmessagesuser = async (fromdata) => {
    if (!selectedUser?._id) return;
    try {
      const data = await sendMessage(selectedUser._id, fromdata);
      const newMessage = data?.data;
      
      if (newMessage) {
        setmessage((prevMessages) => [...(Array.isArray(prevMessages) ? prevMessages : []), newMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // 5. Global Real-time Socket Event Listener Setup
  useEffect(() => {
    if (!Sockit) return;

    const handleIncomingMessage = (newmessage) => {
      const incomingSenderId = newmessage?.sender != null ? String(newmessage.sender) : null;
      const activeReceiverId = selectedUser?._id != null ? String(selectedUser._id) : null;

      if (activeReceiverId && incomingSenderId && activeReceiverId === incomingSenderId) {
        setmessage((prev) => [...prev, newmessage]);
        markMessage(selectedUser._id).catch(console.error);
      } else if (incomingSenderId) { // Safety guard to ensure sender ID exists
        setunsendmessage((prevUnsend) => {
          const currentCount = prevUnsend?.[incomingSenderId] || 0;
          return {
            ...prevUnsend,
            [incomingSenderId]: currentCount + 1,
          };
        });
      }
    };

    Sockit.on("newmessage", handleIncomingMessage);

    return () => {
      Sockit.off("newmessage", handleIncomingMessage);
    };
    // FIX 3: Removed 'markMessage' from dependencies since it is an imported static service utility
  }, [Sockit, selectedUser]); 

  const value = {
    message,
    setmessage,
    user,
    setuser,
    selectedUser,
    setSelectedUser,
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
