import React from 'react'

export default function DictionaryView(props) {

    function findTheLargestWordFromList(words) {
        let currentLargestWord = ''
        for (let word of words) {
            if (word.length > currentLargestWord.length) {
                currentLargestWord = word
            }
        }
        return currentLargestWord
    }

    return <div className={props.showEndRound ? 'game-info-letters' : "game-info-solver-small"}>
        <div className={!props.showEndRound ? 'letter-answer-board' : "letter-answer-board-scroll"}>
            {!(props.currentIndex < 9) && !props.showEndRound && <div className='text-emphasised'>{props.answer.join('')}</div>}
            {props.response && <div className='letter-response-section'>
                <div className='emphasised-block'>
                    <div className='text-emphasised'>{props.answer}</div>
                    <div>You have a {props.lastMaxAnswerLength} letter word</div>
                </div>
                <div className='emphasised-block'>
                    <div>The largest word possible is</div>
                    <div className='text-emphasised'>{findTheLargestWordFromList(props.wordList)}</div>
                </div>
            </div>}
            {props.invalidWord && <div className='letter-response-section'>
                {props.answer.length > 0 &&
                    <div className='emphasised-block'>
                        <div className='text-emphasised'>{props.answer.join('')}</div>
                        <div>is not a word</div>
                    </div>}
                {props.answer.length === 0 &&
                    <div className='emphasised-block'>
                        <div className='text-emphasised'>No Answer Entered</div>
                    </div>}
                <div className='emphasised-block'>
                    <div>The largest word possible is</div>
                    <div className='text-emphasised'>{findTheLargestWordFromList(props.wordList)}</div>
                </div>
            </div>}
            {props.showEndRound && <dl className='found-anagram-list'>{props.anagramElements}</dl>}

        </div>

    </div>
}