import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOGy5i5bKYMRaKwtpa9QaqethyAPlciD8",
  authDomain: "madick-studio-89228.firebaseapp.com",
  projectId: "madick-studio-89228",
  storageBucket: "madick-studio-89228.firebasestorage.app",
  messagingSenderId: "401704705955",
  appId: "1:401704705955:web:4419dfafc871eb0431c416"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };