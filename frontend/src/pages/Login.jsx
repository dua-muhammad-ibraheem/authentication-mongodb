import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
           const res = await API.post('/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.user.role);

            if (res.data.user.role === 'admin') {
                navigate('/admin-panel');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className="bg-[#0D0E12] min-h-screen flex items-center justify-center font-sans px-6">
            <div className="w-full max-w-md bg-[#16181F] border border-gray-800/60 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Welcome back</h2>
                    <p className="text-sm text-gray-400">Please enter your details to sign in</p>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl mb-4 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-medium tracking-wide text-gray-400 uppercase mb-2">Email Address</label>
                        <input type="email" name="email" required onChange={handleChange} className="w-full bg-[#1F222C] text-sm text-white px-4 py-3.5 rounded-xl border border-transparent focus:border-emerald-500/50 outline-none transition-all duration-200" placeholder="name@example.com" />
                    </div>

                    <div>
                        <label className="block text-xs font-medium tracking-wide text-gray-400 uppercase mb-2">Password</label>
                        <input type="password" name="password" required onChange={handleChange} className="w-full bg-[#1F222C] text-sm text-white px-4 py-3.5 rounded-xl border border-transparent focus:border-emerald-500/50 outline-none transition-all duration-200" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm py-3.5 rounded-xl shadow-lg shadow-emerald-600/10 active:scale-[0.98] transition-all duration-150 mt-2">
                        Log In
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;