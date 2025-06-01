// src/App.jsx
import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";

export default function App() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // 로그인 상태 감지
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // 실시간 메시지 가져오기
    useEffect(() => {
        if (!user) {
            setMessages([]);
            return;
        }
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt", "asc")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() });
            });
            setMessages(msgs);
        });
        return () => unsubscribe();
    }, [user]);

    // 구글 로그인
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            alert("Login Error: " + error.message);
        }
    };

    // 로그아웃
    const logout = async () => {
        await signOut(auth);
    };

    // 메시지 전송
    const sendMessage = async (e) => {
        e.preventDefault();
        if (message.trim() === "") return;

        try {
            await addDoc(collection(db, "messages"), {
                text: message,
                uid: user.uid,
                displayName: user.displayName,
                createdAt: serverTimestamp(),
            });
            setMessage("");
        } catch (error) {
            alert("Message Error: " + error.message);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Firebase React Chatting</h1>

            {!user ? (
                <button
                    onClick={signInWithGoogle}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Google Login
                </button>
            ) : (
                <>
                    <div className="mb-4">
                        <span className="mr-2">Hello, {user.displayName}!</span>
                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </div>

                    <div
                        className="border rounded p-4 mb-4 h-96 overflow-y-scroll"
                        style={{ backgroundColor: "#f9f9f9" }}
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`mb-2 p-2 rounded ${msg.uid === user.uid ? "bg-blue-200 text-right" : "bg-gray-200 text-left"
                                    }`}
                            >
                                <div className="text-sm font-semibold">{msg.displayName}</div>
                                <div>{msg.text}</div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={sendMessage} className="flex">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                                placeholder="Please enter a message..."
                            className="flex-grow border rounded-l px-3 py-2"
                        />
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-r"
                        >
                            Send
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}
