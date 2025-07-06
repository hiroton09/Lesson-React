import { useState } from "react";
import type { User } from "../types/user";
import { ERROR_MESSAGES } from '../constants/messages';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }: { onLogin?: (user: User) => void }) => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/src/config/accounts.json');
            const accounts: User[] = await res.json();
            const user = accounts.find((account) => account.id === id && account.pw === pw);
            if (user) {
                onLogin?.(user);
                navigate('/blogs');
            } else {
                setError(ERROR_MESSAGES.E_MSG_001);
            }
        } catch {
            setError(ERROR_MESSAGES.E_MSG_002);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">ログイン</h2>
                <div className="mb-4">
                    <label className="block mb-1">ID</label>
                    <input type="text" value={id} onChange={e => setId(e.target.value)} className="w-full border px-3 py-2 rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">パスワード</label>
                    <input type="password" value={pw} onChange={e => setPw(e.target.value)} className="w-full border px-3 py-2 rounded" required />
                </div>
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">ログイン</button>
            </form>
        </div>
    );
};

export default Login;