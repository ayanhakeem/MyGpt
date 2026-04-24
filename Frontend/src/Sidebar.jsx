import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
    const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats, token} = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch("/api/thread", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const res = await response.json();
            
            if (response.status === 401) {
                // Token might be expired, logout would be handled by App or here
                return;
            }

            const filteredData = Array.isArray(res) ? res.map(thread => ({threadId: thread.threadId, title: thread.title})) : [];
            setAllThreads(filteredData);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (token) {
            getAllThreads();
        }
    }, [currThreadId, token]);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    };

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);
        try {
            const response = await fetch(`/api/thread/${newThreadId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const res = await response.json();
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch(err) {
            console.log(err);
        }
    };

    const deleteThread = async (threadId) => {
        try {
            await fetch(`/api/thread/${threadId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));
            if(threadId === currThreadId) createNewChat();
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <section className="sidebar">
            <div className="sidebar-header">
                <button className="new-chat-btn" onClick={createNewChat}>
                    <div className="btn-brand">
                        <div className="logo-orb">M</div>
                        <span>MyGPT</span>
                    </div>
                    <span className="btn-icon">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </span>
                </button>
            </div>

            {allThreads?.length > 0 && (
                <p className="history-label">Recent</p>
            )}

            <ul className="history">
                {allThreads?.map((thread, idx) => (
                    <li
                        key={idx}
                        onClick={() => changeThread(thread.threadId)}
                        className={thread.threadId === currThreadId ? "highlighted" : ""}
                    >
                        <span className="thread-title">{thread.title}</span>
                        <i
                            className="fa-solid fa-trash"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteThread(thread.threadId);
                            }}
                        ></i>
                    </li>
                ))}
            </ul>

            <div className="sign">
                <span className="sign-by">Made by Ayan</span>
            </div>
        </section>
    );
}

export default Sidebar;