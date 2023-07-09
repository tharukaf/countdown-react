import React from 'react'
import Letters from './Letters'
import Numbers from './Numbers'
import '../styles/gameWindow.css'
import GameInitForm from './GameInitForm'

export default function GameWindow(props) {

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
                    setGameModeOrder={props.setGameModeOrder} />}
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
            </div>
        </div>
    )
}