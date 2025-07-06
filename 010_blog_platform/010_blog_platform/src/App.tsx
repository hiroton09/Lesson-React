import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import ArticleList from './pages/ArticleList';
import Header from './components/Header';
import './tailwind.css';
import type { User } from './types/user';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (user: User) => setUser(user);
  const handleSignOut = () => setUser(null);

  return (
    <BrowserRouter>
      {user && window.location.pathname !== '/login' && (
        <Header userName={user.name} onSignOut={handleSignOut} />
      )}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/blogs" element={user ? <ArticleList /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/blogs" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
