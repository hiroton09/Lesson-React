import { useEffect, useState } from 'react';
import type { Article } from '../types/article';

const ArticleList = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const data = localStorage.getItem('articles');
        if (data) {
            setArticles(JSON.parse(data));
        }
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">記事一覧</h1>
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
