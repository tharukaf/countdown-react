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
  const [isMultiPlayer, setIsMultiPlayer] = React.useState(false)
  const [showExitButton, setShowExitButton] = useState(false)

  function handleSingleRoundGameClick({ target }) {
    setIsSingleRound(true)
    if (target.id === "letters") {
      setGameMode('letters')
    } else if (target.id === "numbers") {
      setGameMode('numbers')
    }
  }

  function handlePlayerToggle() {
    setIsMultiPlayer(prev => !prev)
  }

  function handleExitGame() {
    // Reset all game state to initial values
    setGameMode(0)
    setLettersRoundCount(1)
    setNumbersRoundCount(1)
    setScore('0')
    setGameModeOrder(['letters', 'numbers'])
    setIsSingleRound(false)
    setIsMultiPlayer(false)
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
    // Start a new game by using the current game mode order
    const currentGameModeOrder = [...gameModeOrder]; // Create a copy

    if (currentGameModeOrder.length > 0) {
      const firstGameMode = currentGameModeOrder.shift();
      setGameMode(firstGameMode);
      setGameModeOrder(currentGameModeOrder);
    } else {
      // If no game modes are set, default to letters
      setGameMode('letters');
    }

    // Reset other game state as needed
    setScore('0');
    setIsSingleRound(false);

    console.log('Starting new game with mode:', currentGameModeOrder.length > 0 ? currentGameModeOrder[0] : 'letters');
  }

  return (
    <>
      <TopBar
        score={score}
        isMultiPlayer={isMultiPlayer}
        onExitGame={handleExitGame}
        showExitButton={showExitButton}
      />
      <GameWindow
        gameMode={gameMode}
        setGameMode={setGameMode}
        letterCount={lettersRoundCount}
        numberCount={numbersRoundCount}
        handleSingleRoundGameClick={handleSingleRoundGameClick}
        handleLetterCount={handleLetterCount}
        handleNumberCount={handleNumberCount}
        handlePlayerToggle={handlePlayerToggle}
        setScore={setScore}
        isSingleRound={isSingleRound}
        setIsSingleRound={setIsSingleRound}
        gameModeOrder={gameModeOrder}
        setGameModeOrder={setGameModeOrder}
        isMultiPlayer={isMultiPlayer}
        handleNewGame={handleNewGame}
        showExitButton={showExitButton}
        setShowExitButton={setShowExitButton}
      />
    </>
  )
}
