import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Same Firebase project as mcnid.net (kiai-project)
const firebaseConfig = {
  apiKey: "AIzaSyDa6Kje0CtsK-2q-dvT7WoRS1DKmL_evdg",
  authDomain: "kiai-project.firebaseapp.com",
  projectId: "kiai-project",
  storageBucket: "kiai-project.firebasestorage.app",
  messagingSenderId: "22860297992",
  appId: "1:22860297992:web:0a9334bceaa59f5b521ebd",
  measurementId: "G-T4X44Y4BV9",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
