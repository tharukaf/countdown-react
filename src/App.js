import React from "react"
import Numbers from './components/Numbers'
import Letters from './components/Letters'
import Home from './components/Home'
import Navbar from './components/Navbar'
import '../src/styles/main.css'
import './styles/card.css'

export default function App() {

  const [newGame, setNewGame] = React.useState(true)
  const [gameMode, setGameMode] = React.useState("letters")
  const [playerName, setPlayerName] = React.useState("")

  function gameModeToggle() {
    setGameMode(prevState => {
      return prevState === "letters" ? "numbers" : "letters"
    })
  }

  function handleChange(event) {
    setPlayerName(event.target.value)
  }

  function createNewGame() {
    setNewGame(prevState => !prevState)
  }

  function reset() {
    setNewGame(true)
  }

  console.log(gameMode)
  return (
    <div className="container">

      <nav>
        <Navbar />
      </nav>
      <main>
        {newGame && <Home
          gameModeToggle={gameModeToggle}
          handleChange={handleChange}
          playerName={playerName}
          newGame={createNewGame} />}

        {gameMode === "letters" && !newGame && <Letters />}
        {gameMode === "numbers" && !newGame && <Numbers />}

        {!newGame && <button className="btn-numLetters btn-reset" onClick={reset}>Reset</button>}
      </main>
    </div>
  )
}
