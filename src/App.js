import React from "react"
import Numbers from './components/Numbers'
import Letters from './components/Letters'
import Home from './components/Home'

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
    const { name, value } = event.target
    setPlayerName(prevFormData => {
      console.log(value)
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  function createNewGame() {
    setNewGame(prevState => !prevState)
  }

  console.log(gameMode)
  return (
    <>
      {/* {newGame && <Home
        gameModeToggle={gameModeToggle}
        handleChange={handleChange}
        playerName={playerName}
        newGame={createNewGame} />}

      {gameMode}

      {gameMode === "letters" && !newGame && <Letters letters={letters} />}
      {gameMode === "numbers" && !newGame && <Numbers />} */}


      <Letters />
    </>
  )
}
