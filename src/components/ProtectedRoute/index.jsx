import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRoute({children, flag, to }) {
    if (flag)
        return <Navigate to={ to } />
    
    return children 
}

export default ProtectedRoute;