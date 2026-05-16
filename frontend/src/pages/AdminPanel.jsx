import { useEffect, useState, useCallback } from 'react';
import API from '../api';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = useCallback(async () => {
        try {
            const res = await API.get('/users');
            setUsers(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

 const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await API.delete(`/user/${id}`);
                alert("User deleted!");
                
                // Seedha data refresh karein bina kisi external function ke
                const res = await API.get('/users');
                setUsers(res.data);
            } catch (err) {
                alert("Delete failed!");
            }
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    // Pehla return (sirf loading ke waqt)
    if (loading) {
        return <div className="bg-gray-900 h-screen flex items-center justify-center text-white text-xl">Loading...</div>;
    }

    // Doosra main return (jab data load ho jaye)
    return (
        <div className="p-10 bg-gray-900 min-h-screen text-white">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Admin Panel</h2>
                <button onClick={handleLogout} className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition">Logout</button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <table className="w-full text-left">
                    <thead className="bg-gray-700 text-gray-300 text-xs uppercase">
                        <tr>
                            <th className="p-4">Username</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-750 transition">
                                <td className="p-4 font-medium">{user.username}</td>
                                <td className="p-4 text-right">
                                    <button 
                                        onClick={() => handleDelete(user._id)} 
                                        className="text-red-500 hover:underline font-semibold"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;