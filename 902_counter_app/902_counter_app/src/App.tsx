import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState<number>(0)

  const addCount = () => {
    setCount((currentCount) => currentCount + 1);
  }

  const minusCount = () => {
    setCount((currentCount) => currentCount - 1);
  }

  return (
    <>
      <section>
        <div className="app-header">
          <h1>902_Counter_App</h1>
          <p>React学習用のCounterアプリケーションです。</p>
        </div>
      </section>
      <section>
        <div className="counter">
          <p>カウント数： {count}</p>
          <button className="add-button" onClick={addCount}>増やす</button>
          <button className="minus-button" disabled={count <= 0} onClick={minusCount}>減らす</button>
        </div>
      </section>
    </>
  )
}

export default App
