import React, { useState } from "react";
import type { Schedule } from "../types/schedule";
import ScheduleModal from "./ScheduleModal";

interface CalendarViewProps {
  year: number;
  month: number;
  date: number;
  view: 'week' | 'month' | 'year';
  schedules: Schedule[];
}

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

const CalendarView: React.FC<CalendarViewProps> = ({ year, month, date, view, schedules }) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

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
    return (
      <>
        <div className="grid grid-cols-7 gap-2 mt-6 calendar-week-grid">
          {weekDates.map((d, idx) => {
            const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
            const daySchedules = schedules.filter(s => s.fromDate === dateStr);
            return (
              <div key={idx} className="border rounded p-2 bg-white calendar-week-cell">
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
          <ScheduleModal schedule={selectedSchedule} onClose={handleCloseModal} />
        )}
      </>
    );
  }

  // 月・年表示は未実装
  return <div className="mt-6 text-gray-400">月・年表示は未実装です</div>;
};

export default CalendarView;
