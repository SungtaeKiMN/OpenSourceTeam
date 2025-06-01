// src/firebase.js

// Firebase SDK 가져오기
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase 설정 객체 (본인 걸로 교체!)
const firebaseConfig = {
    apiKey: "AIzaSyBDyiAYZIfLXTVwgijhUzIQNlvlUOMgRq4",
    authDomain: "chatapp-895d8.firebaseapp.com",
    projectId: "chatapp-895d8",
    storageBucket: "chatapp-895d8.firebasestorage.app",
    messagingSenderId: "133151094410",
    appId: "1:133151094410:web:467072ed5400b5acffdf73",
    measurementId: "G-NQ6L2BVFQ1"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// 인증, 데이터베이스 객체 불러오기
export const auth = getAuth(app);
export const db = getFirestore(app);