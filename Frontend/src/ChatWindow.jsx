import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import Settings from "./Settings.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, setNewChat, token, logout, user, setPrevChats} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const getReply = async () => {
        if (!prompt.trim()) return;
        
        const userMsg = prompt;
        setPrompt(""); // Clear input immediately for better UX
        setLoading(true);
        setNewChat(false);

        // Optimistically add user message to the UI
        setPrevChats(prev => [...prev, { role: "user", content: userMsg }]);

        const options = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ message: userMsg, threadId: currThreadId })
        };

        try {
            const response = await fetch("/api/chat", options);
            const res = await response.json();
            
            if (response.status === 401) {
                logout();
                return;
            }

            if (res.reply) {
                setReply(res.reply);
                // Update local chats with assistant reply
                setPrevChats(prev => [...prev, { role: "assistant", content: res.reply }]);
            }
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    };


    return (
        <div className="chatWindow">
            <div className="navbar">
                <div className="navbar-brand">
                    <div className="navbar-logo">M</div>
                    <span className="navbar-brand-text">MyGPT</span>
                    <i className="fa-solid fa-chevron-down navbar-chevron"></i>
                </div>
                <div className="user-profile-section">
                    <div className="userIconDiv" onClick={() => setIsOpen(!isOpen)}>
                        <div className="userIcon">
                            {user ? user[0].toUpperCase() : <i className="fa-solid fa-user"></i>}
                        </div>
                    </div>
                    {isOpen && (
                        <div className="dropDown">
                            <div className="dropDownItem user-label">
                                <strong>{user || 'Account'}</strong>
                            </div>
                            <div className="dropDownItem" onClick={() => { setIsSettingsOpen(true); setIsOpen(false); }}>
                                <i className="fa-solid fa-gear"></i> Settings
                            </div>
                            <div className="dropDownItem" onClick={logout}>
                                <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {isSettingsOpen && <Settings onClose={() => setIsSettingsOpen(false)} />}

            <Chat />

            {loading && (
                <div style={{ position: 'relative', zIndex: 30, padding: '0.5rem 0 0' }}>
                    <ScaleLoader color="var(--accent-1)" height={18} width={2} margin={2} loading={loading} />
                </div>
            )}

            <div className="chatInput">
                <div className="inputBox">
                    <input
                        id="chat-input"
                        placeholder="Ask anything…"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
                        autoComplete="off"
                    />
                    <div id="submit" onClick={getReply}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
                <p className="info">
                    MyGPT can make mistakes. Always verify important information.
                </p>
            </div>
        </div>
    );
}

export default ChatWindow;