import React, { useState } from 'react'

import QuestionCard from './components/QuestionCard'
import { Difficulty, QuestionState, fetchQuizQuestions } from './API'
import { GlobalStyle, Wrapper } from './App.styles'

const TOTEL_QUESTIONS = 10

export type AnswerObject = {
  question: string
  answer: string
  isCorrect: boolean
  correctAnswer: string
}

function App() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [questionNum, setQuestionNum] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestions = await fetchQuizQuestions(
      TOTEL_QUESTIONS,
      Difficulty.EASY,
    )
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setQuestionNum(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const isCorrect = questions[questionNum].correct_answer === answer
      // add score if answer is correct
      if (isCorrect) {
        setScore((prev) => prev + 1)
      }
      // save answer in the array for user answers
      const answerObject = {
        question: questions[questionNum].question,
        answer,
        isCorrect,
        correctAnswer: questions[questionNum].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = questionNum + 1

    if (nextQuestion === TOTEL_QUESTIONS) {
      setGameOver(true)
    } else {
      setQuestionNum(nextQuestion)
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div className='App'>
          <h1>REACT QUIZ</h1>
          {/* userAnswers.length === TOTEL_QUESTIONS : on the last question  */}
          {gameOver || userAnswers.length === TOTEL_QUESTIONS ? (
            <button className='start' onClick={startTrivia}>
              Start
            </button>
          ) : null}
          {!gameOver ? <p className='score'>Score: {score}</p> : null}
          {loading ? <p>Loading Questions ...</p> : null}
          {/* quesionNum + 1, as the array index start from 0 */}
          {!loading && !gameOver && (
            <QuestionCard
              questionNum={questionNum + 1}
              totalQuestions={TOTEL_QUESTIONS}
              question={questions[questionNum]?.question}
              answers={questions[questionNum]?.answers}
              userAnswer={userAnswers ? userAnswers[questionNum] : undefined}
              callback={checkAnswer}
            />
          )}
          {!gameOver &&
          !loading &&
          userAnswers.length === questionNum + 1 && // if the user has answer the current question
          questionNum !== TOTEL_QUESTIONS - 1 ? (
            <button className='next' onClick={nextQuestion}>
              Next Question
            </button>
          ) : null}
        </div>
      </Wrapper>
    </>
  )
}

export default App
