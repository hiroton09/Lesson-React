import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../types/article';

const ArticleList = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('articles');
        if (data) {
            setArticles(JSON.parse(data));
        }
    }, []);

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">記事一覧</h1>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => navigate('/blogs/new')}
                >
                    新規投稿
                </button>
            </div>
            {articles.length === 0 ? (
                <div className="bg-white p-4 rounded shadow text-gray-500 text-center">
                    記事データがありません
                </div>
            ) : (
                <ul className="space-y-4">
                    {articles.map(article => (
                        <li key={article.id} className="bg-white p-4 rounded shadow">
                            <div className="font-bold text-lg">{article.title}</div>
                            <div className="text-sm text-gray-500">カテゴリー: {article.category} / 投稿者: {article.author}</div>
                            <div className="text-xs text-gray-400">作成日: {article.createdAt} / 更新日: {article.updatedAt}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ArticleList;
