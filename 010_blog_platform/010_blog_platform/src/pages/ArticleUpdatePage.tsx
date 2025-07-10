import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Article } from '../types/article';

const ArticleUpdatePage = ({ userName }: { userName: string }) => {
    const { id } = useParams();
    const [articles, setArticles] = useState<Article[]>([]);
    const [article, setArticle] = useState<Article | null>(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
        setArticles(loadedArticles);
        const found = loadedArticles.find((a: Article) => a.id === id);
        setArticle(found || null);
        if (found) {
            setTitle(found.title);
            setCategory(found.category);
            setBody(found.body);
        }
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (window.confirm('更新しますか？')) {
            const now = new Date().toISOString();
            if (article) {
                const updatedArticle: Article = {
                    ...article,
                    title,
                    category,
                    body,
                    author: userName,
                    updatedAt: now,
                };
                const updatedArticles = articles.map(a => a.id === id ? updatedArticle : a);
                localStorage.setItem('articles', JSON.stringify(updatedArticles));
                window.alert('更新が完了しました');
            }
        }
    };

    if (!article) {
        return (
            <div className="container mx-auto py-8">
                <div className="bg-white p-6 rounded shadow text-center text-gray-500">記事が見つかりません</div>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate('/blogs')}>一覧に戻る</button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">記事編集</h1>
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
                <div className='mb-4'>
                    <label className='block mb-1'>作成日</label>
                    <input type="text" value={article.createdAt} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
                </div>
                <div className='mb-4'>
                    <label className='block mb-1'>更新日</label>
                    <input type="text" value={article.updatedAt} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">更新</button>
            </form>
            <button className="mt-8 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate('/blogs')}>一覧に戻る</button>
        </div>
    );
};

export default ArticleUpdatePage;
