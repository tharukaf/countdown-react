import React from 'react'
import Card from './Card'
import { nanoid } from 'nanoid'
import Timer from './Timer'
import "../styles/main.css"
import { mTrie } from "../util/dictionaryHelper"
import DictionaryView from './DictionaryView'

export default function Letters(props) {

    const [letters, setLetters] = React.useState(initializeCards())
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [answer, setAnswer] = React.useState([])
    const [response, setResponse] = React.useState(false)
    const [invalidWord, setInvalidWord] = React.useState(false)
    const [showEnterAnswerView, setShowEnterAnswerView] = React.useState(false)
    const [solveForMe, setSolveForMe] = React.useState(false)
    const [lastMaxAnswerLength, setLastMaxAnswerLength] = React.useState(0)
    const [showEndRound, setShowEndRound] = React.useState(false)
    const [letterCopy, setLetterCopy] = React.useState([])
    const [largest, setLargest] = React.useState({})
    const TrieData = React.useRef(mTrie)

    function initializeCards() {
        const newCards = []
        for (let i = 0; i < 9; i++) {
            newCards.push({
                id: nanoid(),
                value: null,
            })
        }
        return newCards
    }

    // Mapping over the letters arrays to get JSX elements
    const letterElements = letters.map(letter => {
        return (
            <Card
                key={letter.id}
                id={letter.id}
                value={letter.value}
                solveForMe={solveForMe}
                handleCardClick={handleCardClick} />
        )
    })

    const anagramElements = Object.keys(largest).map(word => {
        return (
            <dt
                key={nanoid()}
                title={largest[word]}>{word}</dt>
        )
    })

    function handleCardClick(clickedValue, id) {

        setLetters(prev => {
            const tempLetters = prev.map(card => {
                if (card.id === id) {
                    return {
                        id: card.id,
                        value: null
                    }
                } else return card
            })
            return tempLetters
        })

        setAnswer(prev => {
            return [...prev, clickedValue]
        })
        console.log(answer)
    }

    // Setting a random consonant
    function setRandomVowel() {
        const vowels = ['A', 'E', 'I', 'O', 'U', 'E', 'E', 'A', 'E', 'I']
        let vowelIndex = Math.floor(Math.random() * 10);
        setLetters(prevLetters => {
            const newLetterArray = prevLetters;
            newLetterArray[currentIndex].value = vowels[vowelIndex]
            return [...newLetterArray]
        })
        setCurrentIndex(prevIndex => prevIndex + 1)
    }

    // Setting a random consonant
    function setRandomConsonant() {
        const consonants = ['B', 'C', 'D', 'F', 'G', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'S', 'T'
            , 'V', 'X', 'Z', 'H', 'R', 'W', 'Y', 'T', 'T', 'N', 'N', 'S', 'R', 'H', 'L']
        let consonantIndex = Math.floor(Math.random() * 29);
        setLetters(prevLetters => {
            const newLetterArray = prevLetters;
            newLetterArray[currentIndex].value = consonants[consonantIndex]
            return [...newLetterArray]
        })
        setCurrentIndex(prevIndex => prevIndex + 1)
    }

    // Handles the End Timer button click
    function handleEnterAnswer() {
        setShowEnterAnswerView(true)
        setSolveForMe(true)
        const items = letters.map(letter => letter.value)
        setLetterCopy(items)
    }

    function handleEndRound() {
        if (props.isSingleRound === true) {
            props.setGameMode(0)
            props.setIsSingleRound(false)
        } else {
            props.setGameModeOrder(prev => {
                if (props.gameModeOrder.length > 0) {
                    props.setGameMode(prev.shift())
                } else {
                    props.setGameMode(0)
                }
                return prev
            })
        }
    }

    function assignScore(aAnswer) {
        let tempScore = 0
        if (aAnswer.length === 9) {
            tempScore = 9
        } else {
            tempScore = aAnswer.length
        }
        props.setScore(prev => {
            let score = parseInt(prev) + tempScore
            return score
        })
    }

    // Finds the largest possible anagram
    function handleGetLargestWordPossible() {

        const str = letterCopy.join('').toLowerCase()
        const ans = TrieData.current.getLargestAnagram(str)
        console.log(ans)
        setLargest(ans)
    }

    async function handleSubmit(event) {
        // debugger;
        handleGetLargestWordPossible()
        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${answer.join('')}`)
            const data = await res.json()
            if (data[0].word) {
                setResponse(true)
                setInvalidWord(false)
                setLastMaxAnswerLength(answer.length)
                assignScore(answer)
            }
        } catch (e) {
            setResponse(false)
            setInvalidWord(true)
        }
        setSolveForMe(false)
        setShowEndRound(true)
    }

    return (
        <div className="game-container">
            {!showEnterAnswerView && <div className={currentIndex < 9 ? "game-info-card" : "letters-info-card"}>
                {(currentIndex < 9) && <h1>LETTERS</h1>}
                {!(currentIndex < 9) && !showEnterAnswerView &&
                    <Timer />}
            </div>}
            {showEnterAnswerView &&
                <DictionaryView
                    currentIndex={currentIndex}
                    response={response}
                    lastMaxAnswerLength={lastMaxAnswerLength}
                    invalidWord={invalidWord}
                    showEndRound={showEndRound}
                    anagramElements={anagramElements}
                    answer={answer}
                    showEnterAnswerView={showEnterAnswerView}
                    wordList={Object.keys(largest)} />}
            <div className='card-container'>
                {letterElements}
            </div>

            {currentIndex < 9 &&
                <div className="numLetters-container">
                    <div className="btn-numLetters" onClick={setRandomVowel}>VOWEL</div>
                    <div className="btn-numLetters" onClick={setRandomConsonant}>CONSONANT</div>
                </div>}

            {!(currentIndex < 9) &&
                <>
                    {!showEnterAnswerView && <div className="btn-numLetters-long" onClick={handleEnterAnswer}>Enter Answer</div>}

                    <div className='letterAnswerBox'>

                        {showEnterAnswerView && !showEndRound &&
                            <div
                                className="btn-numLetters-long"
                                onClick={handleSubmit}>Submit Answer</div>}
                        {showEndRound &&
                            <div
                                onClick={handleEndRound}
                                className="btn-numLetters-long"
                            >End Round</div>}

                    </div>
                </>}
        </div>
    )
}

