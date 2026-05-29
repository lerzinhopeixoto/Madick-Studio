import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyApsDtXYebxRTd9Zk5WjOeWfU_603GGLms",
  authDomain: "madick-studio.firebaseapp.com",
  projectId: "madick-studio",
  storageBucket: "madick-studio.firebasestorage.app",
  messagingSenderId: "447163798682",
  appId: "1:447163798682:web:a6ae3eeed7d3e7d37bfb23"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };