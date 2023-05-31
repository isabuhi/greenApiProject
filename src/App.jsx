import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux'

import LoginPage from './pages/LoginPage/index';
import ChatPage from './pages/ChatPage/index';
import ProtectedRoute from './components/ProtectedRoute/index';

function App() {
    const auth = useSelector((store) => { return store.auth })
    const flag = JSON.stringify(auth) === "{}"
    return (
        <>
            <Routes>
                <Route path={'/chat'} element={<ProtectedRoute flag={flag}  to="/"><ChatPage /></ProtectedRoute>} />
                <Route path={'/'} element={<ProtectedRoute flag={!flag} to="/chat"><LoginPage /></ProtectedRoute>} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={700}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    
    );
}

export default App;