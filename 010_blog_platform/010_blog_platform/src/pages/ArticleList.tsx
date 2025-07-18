import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../types/article';

const ArticleList = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('articles');
        if (data) {
            setArticles(JSON.parse(data));
        }
    }, []);

    const handleDelete = (id: string) => {
        if (window.confirm('本当に削除しますか？')) {
            const newArticles = articles.filter(article => article.id !== id);
            localStorage.setItem('articles', JSON.stringify(newArticles));
            setArticles(newArticles);
            window.alert('削除が完了しました');
        }
    };

    // 検索フィルタリング
    const filteredArticles = articles.filter(article =>
        article.title.includes(searchTitle) &&
        article.category.includes(searchCategory)
    );

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">記事一覧</h1>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => navigate('/blogs/new')}
                >
                    新規投稿
                </button>
            </div>
            <form className='mb-6 flex gap-4'>
                <input type="text" placeholder='タイトルで検索' value={searchTitle} onChange={e => setSearchTitle(e.target.value)} className="border px-4 py-1 rounted w-1/2" />
                <input type="text" placeholder='カテゴリーで検索' value={searchCategory} onChange={e => setSearchCategory(e.target.value)} className="border px-4 py-1 rounted w-1/2" />
            </form>
            {filteredArticles.length === 0 ? (
                <div className="bg-white p-4 rounded shadow text-gray-500 text-center">
                    記事データがありません
                </div>
            ) : (
                <ul className="space-y-4">
                    {filteredArticles.map(article => (
                        <li key={article.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                            <div onClick={() => navigate('/blogs/' + article.id)} className="flex-1 cursor-pointer">
                                <div className="font-bold text-lg">{article.title}</div>
                                <div className="text-sm text-gray-500">カテゴリー: {article.category} / 投稿者: {article.author}</div>
                                <div className="text-xs text-gray-400">作成日: {article.createdAt} / 更新日: {article.updatedAt}</div>
                            </div>
                            <div>
                                <button
                                    className="bg-gray-500 text-white px-6 py-1 mr-2 rounded hover:bg-gray-600"
                                    onClick={() => navigate('/blogs/' + article.id)}>詳細</button>
                                <button
                                    className="bg-blue-500 text-white px-6 py-1 mr-2 rounded hover:bg-blue-600"
                                    onClick={() => navigate('/blogs/update/' + article.id)}>編集</button>
                                <button
                                    className="bg-red-500 text-white px-6 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDelete(article.id)}>削除</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ArticleList;
