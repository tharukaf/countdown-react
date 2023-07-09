import React, { useState } from "react"
import TopBar from "./components/TopBar"
import GameWindow from './components/GameWindow'

import "./styles/main.css"

export default function App() {

  const [gameMode, setGameMode] = useState(0)
  const [letterCount, setLetterCount] = useState(1)
  const [numberCount, setNumberCount] = useState(1)
  const [score, setScore] = useState('0')
  const [gameModeOrder, setGameModeOrder] = React.useState([])
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
    if (target.id === "sub" && letterCount > 1) {
      modifyGameOrderArray("sub", "letters")
      setLetterCount(prev => prev - 1)
    } else if (target.id === "add" && letterCount < 9) {
      modifyGameOrderArray("add", "letters")
      setLetterCount(prev => prev + 1)
    }


  }

  function handleNumberCount({ target }) {
    if (target.id === "sub" && numberCount > 1) {
      modifyGameOrderArray("sub", "numbers")
      setNumberCount(prev => prev - 1)
    } else if (target.id === "add" && numberCount < 9) {
      modifyGameOrderArray("add", "numbers")
      setNumberCount(prev => prev + 1)
    }
  }

  function modifyGameOrderArray(modifier, gameType) {
    let tempGameOrderArray = (letterCount === 1 && numberCount === 1) ?
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

  return (
    <>
      <TopBar score={score} />
      <GameWindow
        gameMode={gameMode}
        setGameMode={setGameMode}
        letterCount={letterCount}
        numberCount={numberCount}
        handleSingleRoundGameClick={handleSingleRoundGameClick}
        handleLetterCount={handleLetterCount}
        handleNumberCount={handleNumberCount}
        setScore={setScore}
        isSingleRound={isSingleRound}
        setIsSingleRound={setIsSingleRound}
        gameModeOrder={gameModeOrder}
        setGameModeOrder={setGameModeOrder} />
    </>
  )
}
