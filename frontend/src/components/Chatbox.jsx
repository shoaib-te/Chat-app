import React, { useState, useRef, useEffect } from "react";

function Chatbox() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "Obi-Wan Kenobi",
      avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
      time: "12:45",
      text: "You were the Chosen One!",
      side: "start",
      status: "Delivered",
    },
    {
      id: 2,
      author: "Anakin",
      avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
      time: "12:46",
      text: "I hate you!",
      side: "end",
      status: "Seen at 12:46",
    },
  ]);
  const [text, setText] = useState("");
  const listRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const outgoing = {
      id: Date.now(),
      author: "You",
      avatar: "https://img.daisyui.com/static/examples/avatar-2.png",
      time,
      text: trimmed,
      side: "end",
      status: "Sent",
    };

    setMessages((prev) => [...prev, outgoing]);
    setText("");

    // optional: simulate a short reply for demo purposes
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const reply = {
        id: Date.now() + 1,
        author: "Anakin",
        avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
        time: replyTime,
        text: "...",
        side: "start",
        status: "Seen at " + replyTime,
      };
      setMessages((prev) => [...prev, reply]);
    }, 700);
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-4 border rounded-box shadow-xl bg-base-100">
      {/* Chat Messages Container */}
      <div ref={listRef} className="flex-1 overflow-y-auto mb-4 space-y-4" aria-live="polite">
        {messages.map((m) => (
          <div key={m.id} className={`chat ${m.side === "start" ? "chat-start" : "chat-end"}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt={m.author} src={m.avatar} />
              </div>
            </div>
            <div className="chat-header">
              {m.author}
              <time className="text-xs opacity-50 ml-1">{m.time}</time>
            </div>
            <div className={`chat-bubble ${m.side === "start" ? "chat-bubble-primary" : "chat-bubble-secondary"}`}>
              {m.text}
            </div>
            <div className="chat-footer opacity-50">{m.status}</div>
          </div>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={sendMessage} className="join w-full" aria-label="Send message">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input join-item"
          aria-label="Message input"
        />
        <button type="submit" className="btn btn-primary join-item">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chatbox;
