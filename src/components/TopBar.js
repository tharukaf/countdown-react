import React, { useState } from 'react'
import '../styles/topBar.css'

export default function TopBar({ score, isMultiPlayer, onExitGame, showExitButton }) {
    const [showToast, setShowToast] = useState(false);

    const generateSessionId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    const handlePlayer2Click = () => {
        const sessionId = generateSessionId();

        // Copy to clipboard
        navigator.clipboard.writeText(sessionId).then(() => {
            setShowToast(true);

            // Hide toast after 3 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className='top-bar'>
            <div className='player-section'>
                <div className='score-text2'>Player 1</div>
                <div className='score-text'>{score}</div>
            </div>
            {isMultiPlayer && (
                <div className='player-section'>
                    <div
                        className='score-text2 player-clickable'
                        onClick={handlePlayer2Click}
                        title="Click to copy game session ID"
                    >
                        Player 2
                    </div>
                    <div className='score-text'>0</div>
                </div>
            )}

            {showExitButton && <div className='exit-game-section'>
                <button
                    className='exit-game-button'
                    onClick={onExitGame}
                    title="Exit Game"
                >
                    Exit Game
                </button>
            </div>}

            {showToast && (
                <div className='toast-notification'>
                    Copied Game Session ID
                </div>
            )}
        </div>
    )
}