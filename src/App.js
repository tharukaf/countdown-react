import React, { useState } from "react"
import TopBar from "./components/TopBar"
import GameWindow from './components/GameWindow'

import "./styles/main.css"

export default function App() {

  const [gameMode, setGameMode] = useState(0)
  const [lettersRoundCount, setLettersRoundCount] = useState(1)
  const [numbersRoundCount, setNumbersRoundCount] = useState(1)
  const [score, setScore] = useState('0')
  const [gameModeOrder, setGameModeOrder] = React.useState(['letters', 'numbers'])
  const [isSingleRound, setIsSingleRound] = React.useState(false)

  function handleSingleRoundGameClick({ target }) {
    setIsSingleRound(true)
    if (target.id === "letters") {
      setGameMode('letters')
    } else if (target.id === "numbers") {
      setGameMode('numbers')
    }
  }

  function handleLetterCount({ target }) {
    if (target.id === "sub" && lettersRoundCount > 1) {
      modifyGameOrderArray("sub", "letters")
      setLettersRoundCount(prev => prev - 1)
    } else if (target.id === "add" && lettersRoundCount < 9) {
      modifyGameOrderArray("add", "letters")
      setLettersRoundCount(prev => prev + 1)
    }
  }

  function handleNumberCount({ target }) {
    if (target.id === "sub" && numbersRoundCount > 1) {
      modifyGameOrderArray("sub", "numbers")
      setNumbersRoundCount(prev => prev - 1)
    } else if (target.id === "add" && numbersRoundCount < 9) {
      modifyGameOrderArray("add", "numbers")
      setNumbersRoundCount(prev => prev + 1)
    }
  }

  function modifyGameOrderArray(modifier, gameType) {
    let tempGameOrderArray = (lettersRoundCount === 1 && numbersRoundCount === 1) ?
      ['letters', 'numbers'] :
      [...gameModeOrder]
    if (gameType === "letters") {
      if (modifier === "add") {
        tempGameOrderArray.push('letters')
      } else if (modifier === "sub") {
        tempGameOrderArray.pop('letters')
      }
    } else if (gameType === "numbers") {
      if (modifier === "add") {
        tempGameOrderArray.push('numbers')
      } else if (modifier === "sub") {
        tempGameOrderArray.pop('numbers')
      }
    }
    setGameModeOrder(() => {
      return tempGameOrderArray
    })
  }

  function handleNewGame() {

    setGameModeOrder(prev => {
      if (gameModeOrder.length > 0) {
        setGameMode(prev.shift())
      } else {
        setGameMode(0)
      }
      return prev
    })
    console.log(gameModeOrder)
  }

  return (
    <>
      <TopBar score={score} />
      <GameWindow
        gameMode={gameMode}
        setGameMode={setGameMode}
        letterCount={lettersRoundCount}
        numberCount={numbersRoundCount}
        handleSingleRoundGameClick={handleSingleRoundGameClick}
        handleLetterCount={handleLetterCount}
        handleNumberCount={handleNumberCount}
        setScore={setScore}
        isSingleRound={isSingleRound}
        setIsSingleRound={setIsSingleRound}
        gameModeOrder={gameModeOrder}
        setGameModeOrder={setGameModeOrder}
        handleNewGame={handleNewGame} />
    </>
  )
}
