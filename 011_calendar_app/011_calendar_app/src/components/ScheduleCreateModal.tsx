import React, { useState } from "react";
import type { Schedule } from "../types/schedule";
import categories from "../config/categories.json";

interface ScheduleCreateModalProps {
    schedule: Omit<Schedule, 'id'> & { id?: number };
    onClose: () => void;
    onRegister: (data: Omit<Schedule, 'id'>) => void;
}

const ScheduleCreateModal: React.FC<ScheduleCreateModalProps> = ({ schedule, onClose, onRegister }) => {
    const [form, setForm] = useState<Omit<Schedule, 'id'>>({
        title: schedule.title,
        category: schedule.category,
        fromDate: schedule.fromDate,
        fromTime: schedule.fromTime,
        toDate: schedule.toDate,
        toTime: schedule.toTime,
        body: schedule.body,
        author: schedule.author,
    });

    // 必須項目バリデーション
    const isValid =
        form.title.trim() !== '' &&
        form.fromDate.trim() !== '' &&
        form.fromTime.trim() !== '' &&
        form.toDate.trim() !== '' &&
        form.toTime.trim() !== '' &&
        form.body.trim() !== '' &&
        form.author.trim() !== '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "category") {
            setForm({ ...form, category: Number(value) });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (window.confirm('この内容で登録しますか？')) {
            onRegister(form);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg p-6 w-full max-w-md relative">
                <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>×</button>
                <h2 className="text-xl font-bold mb-4">スケジュール新規作成</h2>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <p>タイトル</p>
                    <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="タイトル" />
                    <p>カテゴリー</p>
                    <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-2 py-1">
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <p>From</p>
                    <div className="flex gap-2">
                        <input name="fromDate" value={form.fromDate} onChange={handleChange} className="border rounded px-2 py-1 w-1/2" placeholder="開始日" />
                        <input name="fromTime" value={form.fromTime} onChange={handleChange} className="border rounded px-2 py-1 w-1/2" placeholder="開始時間" />
                    </div>
                    <p>To</p>
                    <div className="flex gap-2">
                        <input name="toDate" value={form.toDate} onChange={handleChange} className="border rounded px-2 py-1 w-1/2" placeholder="終了日" />
                        <input name="toTime" value={form.toTime} onChange={handleChange} className="border rounded px-2 py-1 w-1/2" placeholder="終了時間" />
                    </div>
                    <p>内容</p>
                    <textarea name="body" value={form.body} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="内容" />
                    <p>作成者</p>
                    <input name="author" value={form.author} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="作成者" />
                    <div className="flex gap-2 mt-6">
                        <button type="button" className="px-4 py-1 bg-gray-400 text-white rounded" onClick={onClose}>キャンセル</button>
                        <button type="submit" className="px-4 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={!isValid}>登録</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleCreateModal;
