import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // 1. Agar token nahi hai, toh login pe bhej do
    if (!token) {
        return <Navigate to="/login" />;
    }

    // 2. Agar page sirf admin ke liye hai aur user admin nahi hai
    if (adminOnly && role !== 'admin') {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;