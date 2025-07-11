import React from 'react'
import Letters from './Letters'
import Numbers from './Numbers'
import '../styles/gameWindow.css'
import hostimg from '../img/hostImgGroup.png'
import GameInitForm from './GameInitForm'

export default function GameWindow(props) {

    if (props.gameMode !== 0) {
        props.setShowExitButton(true)
    }
    if (props.gameMode === 0) {
        props.setShowExitButton(false)
    }

    return (
        <div className='game-body'>
            <div className='game-window'>
                <div className='title-section'>
                    COUNTDOWN
                </div>
                {props.gameMode === 0 && <GameInitForm
                    letterCount={props.letterCount}
                    numberCount={props.numberCount}
                    handleSingleRoundGameClick={props.handleSingleRoundGameClick}
                    handleLetterCount={props.handleLetterCount}
                    handleNumberCount={props.handleNumberCount}
                    handlePlayerToggle={props.handlePlayerToggle}
                    isMultiPlayer={props.isMultiPlayer}
                    setGameModeOrder={props.setGameModeOrder}
                    gameModeOrder={props.setGameModeOrder}
                    gameMode={props.gameMode}
                    setGameMode={props.setGameMode}
                    handleNewGame={props.handleNewGame} />}
                {props.gameMode === "letters" &&
                    <Letters
                        setScore={props.setScore}
                        gameMode={props.gameMode}
                        setGameMode={props.setGameMode}
                        setGameModeOrder={props.setGameModeOrder}
                        gameModeOrder={props.gameModeOrder}
                        isSingleRound={props.isSingleRound}
                        setIsSingleRound={props.setIsSingleRound} />}
                {props.gameMode === "numbers" &&
                    <Numbers
                        setScore={props.setScore}
                        gameMode={props.gameMode}
                        setGameMode={props.setGameMode}
                        setGameModeOrder={props.setGameModeOrder}
                        gameModeOrder={props.gameModeOrder}
                        isSingleRound={props.isSingleRound}
                        setIsSingleRound={props.setIsSingleRound} />}
                {/* <img className="background-img" src={hostimg}>
                </img> */}
            </div>
        </div>
    )
}