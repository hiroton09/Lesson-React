import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../types/article';

const ArticleNew = ({ userName }: { userName: string }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const now = new Date().toISOString();
        const articles: Article[] = JSON.parse(localStorage.getItem('articles') || '[]');
        const maxId = articles.length > 0 ? Math.max(...articles.map(a => Number(a.id))) : 0; 
        const newId = (maxId + 1).toString();
        const newArticle: Article = {
            id: newId,
            title,
            category,
            body,
            author: userName,
            createdAt: now,
            updatedAt: now,
        };
        localStorage.setItem('articles', JSON.stringify([newArticle, ...articles]));
        window.alert('記事が投稿されました');
        navigate('/blogs/update/' + newId);
    };

    return (
        <div className="container mx-auto w-full px-6 py-8">
            <h1 className="text-2xl font-bold mb-6">新規記事投稿</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full mx-auto">
                <div className="mb-4">
                    <label className="block mb-1">タイトル</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">カテゴリー</label>
                    <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full border px-3 py-2 rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">本文</label>
                    <textarea value={body} onChange={e => setBody(e.target.value)} className="w-full border px-3 py-2 rounded h-32" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">投稿者名</label>
                    <input type="text" value={userName} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">投稿</button>
            </form>
            <button className="mt-8 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate('/blogs')}>一覧に戻る</button>
        </div>
    );
};

export default ArticleNew;
