import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                {/* 1. Root route: Jab koi main URL khole, usay login pe bhej do */}
               <Route path="/" element={<Navigate to="/signup" />} />

                {/* Authentication Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                    
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />

                <Route path="/admin-panel" element={
                    <ProtectedRoute adminOnly={true}>
                        <AdminPanel />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;