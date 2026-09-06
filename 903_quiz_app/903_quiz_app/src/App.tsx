import { useState } from 'react'
import './App.css'

const quizData = [
  { question: 'パンはパンでも食べられないパンは何？', answer: 1, options: ['フランスパン', 'フライパン', 'あんぱん'] },
  { question: '「一石二鳥」の意味は？', answer: 0, options: ['一つの行動で二つの利益を得ること', '一つの行動で二つの損失を得ること', '一つの行動で二つの問題を解決すること'] },
  { question: '「花より団子」の意味は？', answer: 2, options: ['見た目より香りを重視すること', '見た目より味を重視すること', '見た目より実用性を重視すること'] },
  { question: '「猿も木から落ちる」の意味は？', answer: 1, options: ['誰でも成功することがあるということ', '誰でも失敗することがあるということ', '誰でも努力すれば成功するということ'] },
];

function App() {

  const [quizIndex, setQuizIndex] = useState<number>(0);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);


  const quiz = quizData[quizIndex];

  const clickAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  }

  const handlePrev = () => {
    // 前の問題に戻る処理
    if (quizIndex > 0) {
      setQuizIndex(quizIndex - 1);
      setSelectedAnswer(null);
    }
  }

  const handleNext = () => {
    // 次の問題に進む処理
    if (quizIndex < quizData.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer(null);
    }
  }

  return (
    <>
      <section>
        <div className="app-header">
          <h1>903_Quiz_App</h1>
          <p>React学習用のQuizアプリケーションです。</p>
        </div>
      </section>
      <section>
        <div className="quiz">
          <h2>Q.{quizIndex + 1} {quiz.question}</h2>
          <ul>
            {quiz.options.map((option: string, optionIndex: number) => (
              <li key={optionIndex}>
                <button className={selectedAnswer !== null ? optionIndex === quiz.answer ? 'correct' : 'incorrect' : ''}
                  onClick={() => clickAnswer(optionIndex)}
                  disabled={selectedAnswer !== null}>
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {selectedAnswer !== null && (
          <div className="quiz-result">
            <p>
              {selectedAnswer === quiz.answer ? '正解です。' : '不正解です。'}
            </p>
            <p>
              {selectedAnswer === quiz.answer ? '' : '正解は「' + quiz.options[quiz.answer] + '」です。'}
            </p>
          </div>
        )}
        <div className="quiz-change">
          <button className="quiz-prev-button" onClick={handlePrev} disabled={quizIndex <= 0}>前の問題</button>
          <button className="quiz-next-button" onClick={handleNext} disabled={quizIndex >= quizData.length - 1}>次の問題</button>
        </div>
      </section>
    </>
  )
}

export default App
