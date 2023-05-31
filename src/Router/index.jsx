import { createBrowserRouter } from 'react-router-dom'
import App from '../App';
import ChatPage from '../pages/ChatPage/index';
import LoginPage from '../pages/LoginPage/index';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/chat",
        element: <ChatPage />,
    },
]);
