import React from 'react'
import '../styles/topBar.css'

export default function TopBar({ score }) {
    return (
        <div className='top-bar'>
            <div className='score-text2'>Player 1</div>
            <div className='score-text'>{score}</div>
        </div>
    )
}