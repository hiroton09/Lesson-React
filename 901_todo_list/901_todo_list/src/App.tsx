import { useState } from 'react'
import './App.css'
import type { Task } from './type/task.ts'

function App() {

  const [tasks, setTasks] = useState<Task[]>([
    { id: '0001', title: 'タスク0001', content: '内容0001', completed: false},
    { id: '0002', title: 'タスク0002', content: '内容0002', completed: false},
    { id: '0003', title: 'タスク0003', content: '内容0003', completed: false},
  ]);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskContent, setTaskContent] = useState('');

  // タスク追加処理
  const handleAddTask = () => {

    // タイトルと内容がブランクの場合は追加しない
    if(taskTitle.trim() === '' || taskContent.trim() === '' ) {
      alert('タイトルと内容を入力してください。');
      return;
    }

    const maxId = Math.max(...tasks.map((task) => parseInt(task.id, 10)), 0);
    const newId = (maxId + 1).toString().padStart(4, '0');
    const newTasks = [...tasks, {id: newId, title: taskTitle, content: taskContent, completed: false} as Task];
    setTasks(newTasks);
    setTaskTitle('');
    setTaskContent('');
  }

  // タスク完了処理
  const handleCompleteTask = (taskId: string) => {
    const newTasks: Task[] = tasks.map((task) => {
      if (task.id === taskId) {
        const newTask = {...task};
        newTask.completed = !newTask.completed;
        return newTask;
      }
      return task;
    });
    setTasks(newTasks);
  }

  return (
    <>
      <section className="app-header">
        <h1>901_Todo_List</h1>
        <p>React学習用のToDoリストアプリケーションです。</p>
      </section>
      <section>
        <div className="task-form">
          <label htmlFor="task-title">＜ タイトル ＞</label>
          <input type="text" id="task-title" placeholder="タイトル" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
          <label htmlFor="task-content">＜ 内容 ＞</label>
          <textarea id="task-content" placeholder="内容" value={taskContent} onChange={(e) => setTaskContent(e.target.value)}></textarea>
          <button onClick={handleAddTask}>タスクを追加</button>
        </div>
        <table className="task-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>タイトル</th>
              <th>内容</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className={task.completed ? 'completed' : ''}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.content}</td>
                <td><input type="checkbox" checked={task.completed} onChange={() => handleCompleteTask(task.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default App
