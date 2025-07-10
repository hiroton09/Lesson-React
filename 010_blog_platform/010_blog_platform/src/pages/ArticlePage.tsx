import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Article } from '../types/article';

const ArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const articles: Article[] = JSON.parse(localStorage.getItem('articles') || '[]');
        const found = articles.find(account => account.id === id);
        setArticle(found || null);
    }, [id]);

    if (!article) {
        return (
            <div className="container mx-auto py-8">
                <div className="bg-white p-6 rounded shadow text-center text-gray-500">記事が見つかりません</div>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate('/blogs')}>一覧に戻る</button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 w-full px-6">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <div className="mb-2 text-gray-600">カテゴリー: {article.category}</div>
            <div className="mb-2 text-gray-600">投稿者: {article.author}</div>
            <div className="mb-2 text-gray-400 text-sm">作成日: {article.createdAt} / 更新日: {article.updatedAt}</div>
            <div className="bg-white p-4 rounded shadow mt-6 whitespace-pre-wrap min-h-[120px]">{article.body}</div>
            <button className="mt-8 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate('/blogs')}>一覧に戻る</button>
        </div>
    );
};

export default ArticlePage;
