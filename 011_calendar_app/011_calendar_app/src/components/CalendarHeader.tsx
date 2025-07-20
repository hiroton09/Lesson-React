import React from "react";
import categories from "../config/categories.json";

interface CalendarHeaderProps {
    view: 'week' | 'month' | 'year';
    onChangeView: (view: 'week' | 'month' | 'year') => void;
    onPrev: () => void;
    onNext: () => void;
    label: string;
    onCreateSchedule: () => void;
    onGoToday: () => void;
    selectedCategories: number[];
    onChangeCategories: (ids: number[]) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    view, onChangeView, onPrev, onNext, label, onCreateSchedule, onGoToday, selectedCategories, onChangeCategories
}) => {
    const handleCategoryCheck = (id: number) => {
        if (selectedCategories.includes(id)) {
            onChangeCategories(selectedCategories.filter(cid => cid !== id));
        } else {
            onChangeCategories([...selectedCategories, id]);
        }
    };
    return (
        <header className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex gap-2 mr-4">
                <button
                    className={`px-3 py-1 rounded ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    onClick={() => onChangeView('week')}
                >週</button>
                <button
                    className={`px-3 py-1 rounded ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    onClick={() => onChangeView('month')}
                >月</button>
                <button
                    className={`px-3 py-1 rounded ${view === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    onClick={() => onChangeView('year')}
                >年</button>
                <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={onCreateSchedule}>スケジュール作成</button>
                <button className="ml-2 px-4 py-2 bg-green-500 text-white rounded" onClick={() => onGoToday()}>本日</button>
                <div className="flex items-center gap-2 ml-4">
                    <span className="font-bold">カテゴリー : </span>
                    <ul className="flex flex-wrap gap-2">
                        {categories.map(c => (
                            <li>
                                <label key={c.id} className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(c.id)}
                                        onChange={() => handleCategoryCheck(c.id)}
                                    />
                                    <span>{c.name}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className="px-2 py-1" onClick={onPrev}>&lt;</button>
                <span className="font-bold text-lg">{label}</span>
                <button className="px-2 py-1" onClick={onNext}>&gt;</button>
            </div>
        </header>
    );
};

export default CalendarHeader;