import React from 'react'
import { useEffect } from "react"
import Card from './Card'
import { nanoid } from 'nanoid'
import Timer from './Timer'

export default function Letters(props) {
    const [letters, setLetters] = React.useState([])
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [formData, setFormData] = React.useState({
        answer: ""
    })
    const [response, setResponse] = React.useState(false)
    const [invalidWord, setInvalidWord] = React.useState(false)


    useEffect(() => {
        for (let i = 0; i < 9; i++) {
            setLetters(prevLetters => {
                return [...prevLetters, ""]
            })
        }
    }, [])

    // Mapping over the letters arrays to get JSX elements
    const letterElements = letters.map(letter => {
        return (
            <Card key={nanoid()} value={letter} />
        )
    })

    // Setting a random consonant
    function setRandomVowel() {
        const vowels = ['A', 'E', 'I', 'O', 'U']
        let vowelIndex = Math.floor(Math.random() * 5);
        setLetters(prevLetters => {
            const newLetterArray = prevLetters;
            newLetterArray[currentIndex] = vowels[vowelIndex]
            return [...newLetterArray]
        })
        setCurrentIndex(prevIndex => prevIndex + 1)
    }

    // Setting a random consonant
    function setRandomConsonant() {
        const consonants = ['B', 'C', 'D', 'F', 'G', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'S', 'T'
            , 'V', 'X', 'Z', 'H', 'R', 'W', 'Y']
        let consonantIndex = Math.floor(Math.random() * 21);
        setLetters(prevLetters => {
            const newLetterArray = prevLetters;
            newLetterArray[currentIndex] = consonants[consonantIndex]
            return [...newLetterArray]
        })
        setCurrentIndex(prevIndex => prevIndex + 1)
    }

    // Handle form Data change
    function handleChange(event) {
        const { name, value } = event.target;
        console.log(formData);
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${formData.answer}`)
            const data = await res.json()
            if (data[0].word) {
                setResponse(true)
                setInvalidWord(false)
            }
        } catch (e) {
            setResponse(false)
            setInvalidWord(true)
        }
    }

    return (
        <div className="game-container">
            <h2>LETTERS</h2>

            <div className='card-container'>
                {letterElements}
            </div>

            {currentIndex < 9 &&
                <div>
                    <button className="btn-numLetters" onClick={setRandomVowel}>VOWEL</button>
                    <button className="btn-numLetters" onClick={setRandomConsonant}>CONSONANT</button>
                </div>}

            {!(currentIndex < 9) &&
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="answer"
                        name="answer"
                        onChange={handleChange}
                        placeholder="Enter Your Answer Here"
                        maxLength="9" />
                    <button>Submit Answer</button>
                </form>}

            {response && <h1>You have a {formData.answer.length} letter word</h1>}
            {invalidWord && <h1>Not a word</h1>}

            {!(currentIndex < 9) && <Timer />}

        </div>
    )
}