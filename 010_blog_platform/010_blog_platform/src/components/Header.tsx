import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    userName: string;
    onSignOut: () => void;
}

const Header = ({ userName, onSignOut }: HeaderProps) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        onSignOut();
        navigate('/login');
    };

    return (
        <header className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
            <div className="font-bold text-lg">ブログプラットフォーム</div>
            <div className="flex items-center gap-4">
                <span>ようこそ、{userName} さん</span>
                <button
                    onClick={handleSignOut}
                    className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 border border-blue-600"
                >
                    サインアウト
                </button>
            </div>
        </header>
    );
};

export default Header;
