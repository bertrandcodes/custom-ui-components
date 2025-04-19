"use client";

import { useState, useEffect, useRef } from "react";
import "./ChatRoom.css";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize IndexedDB
  useEffect(() => {
    const initDB = async () => {
      const request = indexedDB.open("ChatDB", 1);

      request.onerror = (event) => {
        console.error("Database error:", event.target.error);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("messages")) {
          db.createObjectStore("messages", { keyPath: "id", autoIncrement: true });
        }
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        // Load existing messages from IndexedDB
        const transaction = db.transaction(["messages"], "readonly");
        const store = transaction.objectStore("messages");
        const request = store.getAll();

        request.onsuccess = () => {
          setMessages(request.result || []);
        };
      };
    };

    initDB();
  }, []);

  // WebSocket connection
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      setIsConnected(true);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);

      // Store in IndexedDB
      const request = indexedDB.open("ChatDB", 1);
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(["messages"], "readwrite");
        const store = transaction.objectStore("messages");
        store.add(message);
      };
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !username) return;

    const message = {
      id: Date.now(),
      username,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }

    setNewMessage("");
  };

  if (!username) {
    return (
      <div className="chat-container">
        <div className="username-form">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && setUsername(e.target.value)}
          />
          <button onClick={() => setUsername(username)}>Join Chat</button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
        <div className="connection-status">
          Status: {isConnected ? "Connected" : "Disconnected"}
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.username === username ? "own-message" : ""}`}
          >
            <div className="message-header">
              <span className="username">{message.username}</span>
              <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
            </div>
            <div className="message-text">{message.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" disabled={!isConnected}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
