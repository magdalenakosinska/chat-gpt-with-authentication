import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './components/Login/Login.tsx'
import Signup from './components/Signup/Signup.tsx'
import AuthRoute from './components/AuthRoute/AuthRoute.tsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB_xiV1PHXhxzk6wh3W-q_gY67wtnKXSK8",
  authDomain: "chat-gpt-with-authentication.firebaseapp.com",
  projectId: "chat-gpt-with-authentication",
  storageBucket: "chat-gpt-with-authentication.firebasestorage.app",
  messagingSenderId: "348351542265",
  appId: "1:348351542265:web:b91b92c10aac3d9c83c328"
};

initializeApp(firebaseConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Router>
      <Routes>
        <Route path="/" element={<AuthRoute><App /></AuthRoute>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  
  </StrictMode>,
)
