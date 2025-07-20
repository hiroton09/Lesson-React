import React, { useState } from "react";
import type { Schedule } from "../types/schedule";
import ScheduleModal from "./ScheduleModal";

interface CalendarViewProps {
  year: number;
  month: number;
  date: number;
  view: 'week' | 'month' | 'year';
  schedules: Schedule[];
  onSave: (id: number, newData: Partial<Schedule>) => void;
  onDelete: (id: number) => void;
  onYearSelect?: (year: number) => void;
  onDaySelect?: (year: number, month: number, date: number) => void;
}

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

const CalendarView: React.FC<CalendarViewProps> = ({ year, month, date, view, schedules, onSave, onDelete, onYearSelect, onDaySelect }) => {
  // 年viewのページネーション用: 9年セットの先頭年
  const [yearPageStart, setYearPageStart] = useState<number>(year - (year % 9));
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  // 年が選択された場合のハンドラ
  const handleYearClick = (y: number) => {
    if (onYearSelect) {
      onYearSelect(y);
    }
  };

  if (view === 'year') {
    // 9個の年を3x3で表示、ページネーション対応
    const years = Array.from({ length: 9 }, (_, i) => yearPageStart + i);
    const today = new Date();
    const thisYear = today.getFullYear();
    return (
      <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center">
        <div className="flex justify-between items-center w-full max-w-lg mb-4 bg-green-100 p-4 rounded">
          <button
            className="px-4 py-2 rounded hover:bg-green-300"
            onClick={() => setYearPageStart(prev => prev - 9)}
          >
            ＜
          </button>
          <span className="text-lg font-bold">{years[0]}年 ～ {years[8]}年</span>
          <button
            className="px-4 py-2 rounded hover:bg-green-300"
            onClick={() => setYearPageStart(prev => prev + 9)}
          >
            ＞
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
          {years.map((y) => (
            <button
              key={y}
              className={`border-2 rounded p-8 text-2xl font-bold transition-colors ${y === year ? 'bg-blue-200 text-blue-800' : 'bg-white hover:bg-blue-50'} ${y === thisYear ? 'border-green-500' : 'border-gray-400'}`}
              onClick={() => handleYearClick(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 週表示用: 日曜から土曜までの日付を計算
  const getWeekDates = () => {
    const base = new Date(year, month - 1, date); // 週の開始日（日曜）
    return Array.from({ length: daysOfWeek.length }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d;
    });
  };

  const handleItemClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
  };

  const handleCloseModal = () => {
    setSelectedSchedule(null);
  };

  if (view === 'week') {
    const weekDates = getWeekDates();
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    return (
      <>
        <div className="grid grid-cols-7 gap-2 mt-6 calendar-week-grid">
          {weekDates.map((d, idx) => {
            const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
            const daySchedules = schedules.filter(s => s.fromDate === dateStr);
            const isToday = dateStr === todayStr;
            return (
              <div key={idx} className={`border rounded p-2 bg-white calendar-week-cell ${isToday ? 'border-green-500 border-2' : ''}`}>
                <div className="font-bold text-center mb-2 py-1 bg-green-100 rounded">{daysOfWeek[d.getDay()]}<br />{d.getMonth()+1}/{d.getDate()}</div>
                <ul className="mt-2">
                  {daySchedules.length === 0 ? (
                    <li className="text-gray-400 text-sm">予定なし</li>
                  ) : (
                    daySchedules.map(s => (
                      <li key={s.id} className="text-sm mb-1 bg-blue-100 rounded px-2 py-1 cursor-pointer" onClick={() => handleItemClick(s)}>
                        <div className="font-bold">{s.title}</div>
                        <div className="text-xs text-gray-600">{s.category}</div>
                        <div className="text-xs">{s.fromTime} - {s.toTime}</div>
                        <div className="text-xs">{s.body}</div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            );
          })}
        </div>
        {selectedSchedule && (
          <ScheduleModal
            schedule={selectedSchedule}
            onClose={handleCloseModal}
            onSave={onSave}
            onDelete={onDelete}
          />
        )}
      </>
    );
  }

  if (view === 'month') {
    // 月の1日が何曜日か
    const firstDay = new Date(year, month - 1, 1);
    const firstDayOfWeek = firstDay.getDay();
    // 月末日
    const lastDate = new Date(year, month, 0).getDate();
    // 前月末日
    const prevLastDate = new Date(year, month - 1, 0).getDate();
    // 表示する日付配列（42日分: 6週×7日）
    const days: {date: number, month: number, year: number, isCurrentMonth: boolean}[] = [];
    // 前月分
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const d = prevLastDate - i;
      const prevMonth = month - 1 < 1 ? 12 : month - 1;
      const prevYear = month - 1 < 1 ? year - 1 : year;
      days.push({ date: d, month: prevMonth, year: prevYear, isCurrentMonth: false });
    }
    // 今月分
    for (let d = 1; d <= lastDate; d++) {
      days.push({ date: d, month, year, isCurrentMonth: true });
    }
    // 翌月分
    const nextDays = 42 - days.length;
    for (let d = 1; d <= nextDays; d++) {
      const nextMonth = month + 1 > 12 ? 1 : month + 1;
      const nextYear = month + 1 > 12 ? year + 1 : year;
      days.push({ date: d, month: nextMonth, year: nextYear, isCurrentMonth: false });
    }
    // 週ごとに分割
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    return (
      <>
        <div className="h-[calc(100vh-120px)] flex flex-col">
          <div className="grid grid-cols-7 gap-2 flex-1 calendar-month-grid">
            {daysOfWeek.map((d, idx) => (
              <div key={idx} className="text-center font-bold text-gray-600 py-2 bg-green-100 rounded">{d}</div>
            ))}
            {days.map((d, idx) => {
              const dateStr = `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.date).padStart(2, '0')}`;
              const daySchedules = schedules.filter(s => s.fromDate === dateStr);
              const isToday = dateStr === todayStr;
              const handleDayClick = () => {
                if (d.isCurrentMonth && typeof onDaySelect === 'function') {
                  onDaySelect(d.year, d.month, d.date);
                }
              };
              return (
                <div
                  key={idx}
                  className={`border rounded p-2 bg-white calendar-month-cell flex flex-col ${!d.isCurrentMonth ? 'text-gray-400 bg-gray-100' : ''} ${isToday ? 'border-green-500 border-2' : ''} ${d.isCurrentMonth ? 'cursor-pointer hover:bg-green-50' : ''}`}
                  style={{ minHeight: 0 }}
                  onClick={handleDayClick}
                >
                  <div className="font-bold text-center mb-2 py-1 rounded">{d.month}/{d.date}</div>
                  <ul className="mt-2 flex-1 overflow-y-auto">
                    {daySchedules.length === 0 ? null :
                      daySchedules.map(s => (
                        <li key={s.id} className="text-xs mb-1 bg-blue-100 rounded px-2 py-1 cursor-pointer" onClick={e => { e.stopPropagation(); handleItemClick(s); }}>
                          {s.title}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        {selectedSchedule && (
          <ScheduleModal
            schedule={selectedSchedule}
            onClose={handleCloseModal}
            onSave={onSave}
            onDelete={onDelete}
          />
        )}
      </>
    );
  }
  return null;
}

export default CalendarView;
