import React, { useState } from "react";
import CalendarHeader from "../components/CalendarHeader";
import CalendarView from "../components/CalendarView";
import ScheduleCreateModal from "../components/ScheduleCreateModal";
import type { Schedule } from "../types/schedule";
import { getSunday, getCurrentWeekSunday } from "../utils/dateUtils";

const CalendarPage: React.FC = () => {
  // 今日ボタン押下時の処理
  const handleGoToday = () => {
    const now = new Date();
    if (view === 'week') {
      // 今週の日曜
      const sunday = getSunday(now);
      setYear(sunday.getFullYear());
      setMonth(sunday.getMonth() + 1);
      setDate(sunday.getDate());
    } else if (view === 'month') {
      setYear(now.getFullYear());
      setMonth(now.getMonth() + 1);
      setDate(now.getDate());
    } else if (view === 'year') {
      setYear(now.getFullYear());
      // 月・日はそのまま
    }
  };
  const [showCreateModal, setShowCreateModal] = useState(false);

  // 新規作成用の初期値
  const emptySchedule = {
    id: -1,
    title: '',
    category: 1,
    fromDate: '',
    fromTime: '',
    toDate: '',
    toTime: '',
    body: '',
    author: ''
  };

  const handleCreateSchedule = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleRegisterSchedule = (newData: Omit<Schedule, 'id'>) => {
    setSchedules(prev => [
      ...prev,
      { ...newData, id: prev.length > 0 ? Math.max(...prev.map(s => s.id)) + 1 : 1 }
    ]);
    setShowCreateModal(false);
  };
  // 年選択時のハンドラ
  const handleYearSelect = (selectedYear: number) => {
    setYear(selectedYear);
    setMonth(1);
    setDate(1);
    setView('month');
  };
  // 年月日を個別に管理
  const initSunday = getCurrentWeekSunday();
  const [year, setYear] = useState(initSunday.getFullYear());
  const [month, setMonth] = useState(initSunday.getMonth() + 1);
  const [date, setDate] = useState(initSunday.getDate());
  const [view, setView] = useState<'week' | 'month' | 'year'>('month');
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      title: "打ち合わせ",
      category: 1,
      fromDate: "2025-07-13",
      fromTime: "10:00",
      toDate: "2025-07-13",
      toTime: "11:00",
      body: "プロジェクトの進捗確認",
      author: "山田"
    },
    {
      id: 2,
      title: "開発作業",
      category: 2,
      fromDate: "2025-07-15",
      fromTime: "13:00",
      toDate: "2025-07-15",
      toTime: "18:00",
      body: "新機能実装",
      author: "佐藤"
    }
  ]);

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

  const handleSaveSchedule = (id: number, newData: Partial<Schedule>) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, ...newData } : s));
  };
  
  const handleDeleteSchedule = (id: number) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  // 月viewで日付クリック時の週遷移
  const handleDaySelect = (y: number, m: number, d: number) => {
    // その日を含む週の日曜を求める
    const clicked = new Date(y, m - 1, d);
    const sunday = getSunday(clicked);
    setYear(sunday.getFullYear());
    setMonth(sunday.getMonth() + 1);
    setDate(sunday.getDate());
    setView('week');
  };

  return (
    <div className="mx-auto p-4">
      <CalendarHeader
        view={view}
        onChangeView={handleChangeView}
        onPrev={handlePrev}
        onNext={handleNext}
        label={getLabel()}
        onCreateSchedule={handleCreateSchedule}
        onGoToday={handleGoToday}
      />
      <CalendarView
        year={year}
        month={month}
        date={date}
        view={view}
        schedules={schedules}
        onSave={handleSaveSchedule}
        onDelete={handleDeleteSchedule}
        onYearSelect={handleYearSelect}
        onDaySelect={handleDaySelect}
      />
      {showCreateModal && (
        <ScheduleCreateModal
          schedule={emptySchedule}
          onClose={handleCloseCreateModal}
          onRegister={handleRegisterSchedule}
        />
      )}
      {/* 他のコンポーネント（CategoryFilterなど）をここに追加予定 */}
    </div>
  );
};

export default CalendarPage;
