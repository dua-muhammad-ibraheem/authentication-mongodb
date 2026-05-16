import React from 'react';

const Dashboard = () => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to User Dashboard</h1>
            <p className="text-gray-400 mb-8">Aapka account successfully login ho gaya hai.</p>
            <button 
                onClick={handleLogout}
                className="bg-red-500 px-6 py-2 rounded hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;