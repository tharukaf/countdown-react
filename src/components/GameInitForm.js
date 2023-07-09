import React from "react";
import '../styles/gameWindow.css'

export default function GameInitForm(props) {


    return (
        <div className="init-form">
            <div>NUMBER OF PLAYERS</div>
            <div className="player-toggle-section">
                <div>ONE</div>
                <input type="checkbox" id="switch" hidden />
                <label htmlFor="switch">Toggle</label>
                <div>TWO</div>

            </div>
            <div className="text-mode">MODES</div>
            <div>-----------------------</div>
            <div className="text-round-type">SINGLE ROUND GAME</div>
            <div className="init-form-button-flex">
                <button id="letters" onClick={props.handleSingleRoundGameClick} className="single-round-buttons">LETTERS</button>
                <button id="numbers" onClick={props.handleSingleRoundGameClick} className="single-round-buttons">NUMBERS</button>
            </div >
            <div className="text-round-type">MULTI ROUND GAME</div>
            <div className="init-form-button-flex">
                <div className="counter-block">
                    <div>LETTERS</div>
                    <div className="counter">
                        <div id="sub" onClick={props.handleLetterCount} className="btn-subtract btn-click">-</div>
                        <div className="btn-number">{props.letterCount}</div>
                        <div id="add" onClick={props.handleLetterCount} className="btn-add">+</div>
                    </div>
                </div>
                <div className="counter-block">
                    <div>NUMBERS</div>
                    <div className="counter">
                        <div id="sub" onClick={props.handleNumberCount} className="btn-subtract">-</div>
                        <div className="btn-number">{props.numberCount}</div>
                        <div id="add" onClick={props.handleNumberCount} className="btn-add">+</div>
                    </div>
                </div>
            </div>
            <div className="button-new-game">
                <div className="text-new-game-button">
                    NEW GAME
                </div>
            </div>
        </div >
    )
}