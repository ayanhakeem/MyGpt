import "./Chat.css";
import React, { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import TubesBackground from "./TubesBackground.jsx";

function Chat() {
    const { newChat, prevChats, reply } = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);
    const chatsEndRef = useRef(null);

    const scrollToBottom = () => {
        chatsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [prevChats, latestReply]);

    useEffect(() => {
        if (reply === null) {
            setLatestReply(null);
            return;
        }

        if (!prevChats?.length) return;

        const content = reply.split(" ");
        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx + 1).join(" "));
            idx++;
            if (idx >= content.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);
    }, [prevChats, reply]);

    return (
        <>
            <div className={`chats ${!newChat ? 'chat-active' : ''}`}>
                {/* ── Welcome Screen ── */}
                {newChat && (
                    <div className="tubes-bg-wrap">
                        <TubesBackground>
                            <div className="tubes-welcome">
                                <h1 className="tubes-welcome-title">MyGPT</h1>
                                <p className="tubes-welcome-sub">Next-gen intelligence at your fingertips</p>
                                <div className="tubes-hint">
                                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                                    Move cursor & click to randomize
                                </div>
                            </div>
                        </TubesBackground>
                    </div>
                )}

                {/* ── Active Chat Background ── */}
                {!newChat && (
                    <div className="chat-tubes-bg">
                         <TubesBackground enableClickInteraction={false} />
                    </div>
                )}

                {/* ── Message List ── */}
                {!newChat && (
                    <div className="msg-container">
                        {prevChats?.slice(0, -1).map((chat, idx) => (
                            <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
                                {chat.role === "user" ? (
                                    <p className="userMessage">{chat.content}</p>
                                ) : (
                                    <>
                                        <div className="gpt-avatar">M</div>
                                        <div className="gpt-content">
                                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                {chat.content}
                                            </ReactMarkdown>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}

                        {prevChats.length > 0 && (
                            <div className={prevChats[prevChats.length - 1].role === "user" ? "userDiv" : "gptDiv"}>
                                {prevChats[prevChats.length - 1].role === "user" ? (
                                    <p className="userMessage">{prevChats[prevChats.length - 1].content}</p>
                                ) : (
                                    <>
                                        <div className="gpt-avatar">M</div>
                                        <div className="gpt-content">
                                            {latestReply === null ? (
                                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                    {prevChats[prevChats.length - 1].content}
                                                </ReactMarkdown>
                                            ) : (
                                                <div className="typing-cursor">
                                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                        {latestReply}
                                                    </ReactMarkdown>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        <div ref={chatsEndRef} style={{ height: '2rem' }} />
                    </div>
                )}
            </div>
        </>
    );
}

export default Chat;