import React, { useState } from "react";
import CalendarHeader from "../components/CalendarHeader";
import CalendarView from "../components/CalendarView";
import { getSunday, getCurrentWeekSunday } from "../utils/dateUtils";

const CalendarPage: React.FC = () => {
  // 年月日を個別に管理
  const initSunday = getCurrentWeekSunday();
  const [year, setYear] = useState(initSunday.getFullYear());
  const [month, setMonth] = useState(initSunday.getMonth() + 1);
  const [date, setDate] = useState(initSunday.getDate());
  const [view, setView] = useState<'week' | 'month' | 'year'>('month');

  // ラベル生成
  const getLabel = () => {
    if (view === 'week') {
      return `${year}年${month}月${date}日`;
    }
    if (view === 'month') {
      return `${year}年${month}月`;
    }
    return `${year}年`;
  };

  // ページネーションの更新
  const handlePrev = () => {
    if (view === 'week') {
      // 1週前の日曜
      const prev = new Date(year, month - 1, date);
      prev.setDate(prev.getDate() - 7);
      const sunday = getSunday(prev);
      setYear(sunday.getFullYear());
      setMonth(sunday.getMonth() + 1);
      setDate(sunday.getDate());
    }
    if (view === 'month') {
      // 1ヶ月前
      let newMonth = month - 1;
      let newYear = year;
      if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      }
      setYear(newYear);
      setMonth(newMonth);
      // 日付はそのまま
    }
    if (view === 'year') {
      setYear(year - 1);
      // 月日はそのまま
    }
  };
  const handleNext = () => {
    if (view === 'week') {
      // 1週後の日曜
      const next = new Date(year, month - 1, date);
      next.setDate(next.getDate() + 7);
      const sunday = getSunday(next);
      setYear(sunday.getFullYear());
      setMonth(sunday.getMonth() + 1);
      setDate(sunday.getDate());
    }
    if (view === 'month') {
      // 1ヶ月後
      let newMonth = month + 1;
      let newYear = year;
      if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }
      setYear(newYear);
      setMonth(newMonth);
      // 日付はそのまま
    }
    if (view === 'year') {
      setYear(year + 1);
      // 月日はそのまま
    }
  };
  const handleChangeView = (v: 'week' | 'month' | 'year') => {
    if (v === 'week') {
      // date変数が保持している日付の週の日曜に補正
      const base = new Date(year, month - 1, date);
      const sunday = getSunday(base);
      setYear(sunday.getFullYear());
      setMonth(sunday.getMonth() + 1);
      setDate(sunday.getDate());
    }
    setView(v);
  };

  // 仮のスケジュールデータ
  const schedules = [
    { id: 1, title: "打合せ", fromDate: `${year}-${String(month).padStart(2,'0')}-${String(date).padStart(2,'0')}`, toDate: `${year}-${String(month).padStart(2,'0')}-${String(date).padStart(2,'0')}`, fromTime: "00:00", toTime: "12:00", category: 1, body: '打ち合わせ', author: "admin" },
    { id: 2, title: "会議", fromDate: `${year}-${String(month).padStart(2,'0')}-${String(date+2).padStart(2,'0')}`, toDate: `${year}-${String(month).padStart(2,'0')}-${String(date+2).padStart(2,'0')}`, fromTime: "01:00", toTime: "02:00", category: 2, body: '開発作業', author: "test"},
  ];

  return (
    <div className="mx-auto p-4">
      <CalendarHeader
        view={view}
        onChangeView={handleChangeView}
        onPrev={handlePrev}
        onNext={handleNext}
        label={getLabel()}
      />
      <CalendarView
        year={year}
        month={month}
        date={date}
        view={view}
        schedules={schedules}
      />
      {/* 他のコンポーネント（CategoryFilterなど）をここに追加予定 */}
    </div>
  );
};

export default CalendarPage;
