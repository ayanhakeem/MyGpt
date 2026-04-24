import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import Auth from "./Auth.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  
  // Auth state
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Auto-login or session restoration
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (token && savedUsername) {
      setUser(savedUsername);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUser(null);
    // Reset chat state
    setPrevChats([]);
    setAllThreads([]);
    setNewChat(true);
    setCurrThreadId(uuidv1());
  };

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    user, setUser,
    token, setToken,
    logout
  };

  return (
    <div className='app'>
      <MyContext.Provider value={providerValues}>
        {token ? (
          <>
            <Sidebar />
            <ChatWindow />
          </>
        ) : (
          <Auth />
        )}
      </MyContext.Provider>
    </div>
  );
}

export default App;
