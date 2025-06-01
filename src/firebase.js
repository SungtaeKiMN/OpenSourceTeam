// src/firebase.js

// Firebase SDK ��������
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase ���� ��ü (���� �ɷ� ��ü!)
const firebaseConfig = {
    apiKey: "AIzaSyBDyiAYZIfLXTVwgijhUzIQNlvlUOMgRq4",
    authDomain: "chatapp-895d8.firebaseapp.com",
    projectId: "chatapp-895d8",
    storageBucket: "chatapp-895d8.firebasestorage.app",
    messagingSenderId: "133151094410",
    appId: "1:133151094410:web:467072ed5400b5acffdf73",
    measurementId: "G-NQ6L2BVFQ1"
};

// Firebase �ʱ�ȭ
const app = initializeApp(firebaseConfig);

// ����, �����ͺ��̽� ��ü �ҷ�����
export const auth = getAuth(app);
export const db = getFirestore(app);