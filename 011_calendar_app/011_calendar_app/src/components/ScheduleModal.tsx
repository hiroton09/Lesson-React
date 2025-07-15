import React, { useState } from "react";
import type { Schedule } from "../types/schedule";

interface ScheduleModalProps {
  schedule: Schedule;
  onClose: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ schedule, onClose }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({
    title: schedule.title,
    category: schedule.category,
    fromDate: schedule.fromDate,
    fromTime: schedule.fromTime,
    toDate: schedule.toDate,
    toTime: schedule.toTime,
    body: schedule.body,
    author: schedule.author,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => setIsEdit(true);
  const handleCancelEdit = () => setIsEdit(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>×</button>
        {!isEdit ? (
          <>
            <h2 className="text-xl font-bold mb-2">{schedule.title}</h2>
            <div className="mb-2 text-sm text-gray-600">カテゴリ: {schedule.category}</div>
            <div className="mb-2 text-sm">{schedule.fromDate} {schedule.fromTime} ～ {schedule.toDate} {schedule.toTime}</div>
            <div className="mb-2 text-sm">{schedule.body}</div>
            <div className="mb-2 text-xs text-gray-400">作成者: {schedule.author}</div>
            <div className="flex gap-2 mt-4">
              <button className="px-4 py-1 bg-blue-500 text-white rounded" onClick={handleEditClick}>編集</button>
              <button className="px-4 py-1 bg-red-500 text-white rounded">削除</button>
            </div>
          </>
        ) : (
          <form className="space-y-3">
            <p>タイトル</p>
            <input name="title" value={editData.title} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="タイトル" />
            <p>カテゴリー</p>
            <input name="category" value={editData.category} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="カテゴリ" />
            <p>From</p>
            <div className="flex gap-2">
              <input name="fromDate" value={editData.fromDate} onChange={handleChange} className="border rounded px-2 py-1 w-1/2" placeholder="開始日" />
              <input name="fromTime" value={editData.fromTime} onChange={handleChange} className="border rounded px-2 py-1 w-1/2" placeholder="開始時間" />
            </div>
            <p>To</p>
            <div className="flex gap-2">
              <input name="toDate" value={editData.toDate} onChange={handleChange} className="border rounded px-2 py-1 w-1/2" placeholder="終了日" />
              <input name="toTime" value={editData.toTime} onChange={handleChange} className="border rounded px-2 py-1 w-1/2" placeholder="終了時間" />
            </div>
            <p>内容</p>
            <textarea name="body" value={editData.body} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="内容" />
            <p>作成者</p>
            <input name="author" value={editData.author} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="作成者" />
            <div className="flex gap-2 mt-6">
              <button type="button" className="px-4 py-1 bg-gray-400 text-white rounded" onClick={handleCancelEdit}>キャンセル</button>
              <button type="submit" className="px-4 py-1 bg-blue-500 text-white rounded">保存</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ScheduleModal;
