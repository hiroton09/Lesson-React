import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import ArticleList from './pages/ArticleList';
import ArticleNew from './pages/ArticleNew';
import ArticlePage from './pages/ArticlePage';
import ArticleUpdatePage from './pages/ArticleUpdatePage';
import Header from './components/Header';
import './tailwind.css';
import type { User } from './types/user';

function App() {
  const [user, setUser] = useState<User | null>(null);

  // ログイン時にユーザー情報を保持
  useEffect(() => {
    const saved = localStorage.getItem('loginUser');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // ログイン処理
  const handleLogin = (user: User) => {
    setUser(user);
    localStorage.setItem('loginUser', JSON.stringify(user));
  }

  // サインアウト処理
  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('loginUser');
  }

  return (
    <BrowserRouter>
      {user && window.location.pathname !== '/login' && (
        <Header userName={user.name} onSignOut={handleSignOut} />
      )}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/blogs" element={user ? <ArticleList /> : <Navigate to="/login" />} />
        <Route path="/blogs/new" element={user ? <ArticleNew userName={user.name} /> : <Navigate to="/login" />} />
        <Route path="/blogs/:id" element={user ? <ArticlePage /> : <Navigate to="/login" />} />
        <Route path="/blogs/update/:id" element={user ? <ArticleUpdatePage userName={user.name} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/blogs" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
