import { nanoid } from "nanoid";
import TinyTimer from 'tiny-timer';

import React from "react"
import Card from "./Card";
import Timer from "./Timer";
import Solver from "./Solver"

export default function Numbers(props) {

    const [cards, setCards] = React.useState(initializeCards());
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [showTarget, setShowTarget] = React.useState(false);
    const [target, setTarget] = React.useState(0);
    const [targetRecall, setTargetRecall] = React.useState([])
    const [showTimerView, setShowTimerView] = React.useState(false)
    const [showSolve, setShowSolve] = React.useState(false)
    const [solveForMe, setSolveForMe] = React.useState(false)
    const [answerNum, setAnswerNum] = React.useState({})
    const [availableCardID, setAvailableCardID] = React.useState(0)
    const [showRoundOver, setShowRoundOver] = React.useState(false)

    function initializeCards() {
        const newCards = []
        for (let i = 0; i < 6; i++) {
            newCards.push({
                id: nanoid(),
                value: null
            })
        }
        return newCards
    }

    const numberElements = cards.map(number => {
        return <Card
            key={number.id}
            value={number.value}
            id={number.id}
            solveForMe={solveForMe}
            handleCardClick={handleCardClick} />
    })

    function handleSolve() {
        setSolveForMe(true)
    }

    function handleCardClick(clickedValue, id) {

        setAnswerNum(() => {
            return { value: clickedValue, id: id }
        })
        setCards(prev => {
            const tempNums = prev.map(card => {
                if (card.id === id) {
                    setAvailableCardID(id)
                    return {
                        id: card.id,
                        value: null
                    }
                } else return card
            })
            return tempNums
        })

    }

    function handleSelectNumber({ target }) {
        const { id } = target;

        if (id === "big") {
            const bigNums = [10, 25, 50, 75, 100];
            const bigNumIndex = selectRandomIndex(5);
            setNumbersArray(bigNums[bigNumIndex])

        } else if (id === "small") {
            const smallNums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            const smallNumIndex = selectRandomIndex(9);
            setNumbersArray(smallNums[smallNumIndex])
        }
        setCurrentIndex(prevState => prevState + 1)
    }

    function selectRandomIndex(size) {
        return Math.floor(Math.random() * size);
    }

    function setNumbersArray(num) {
        setCards(prevNumbers => {
            const newNumbers = prevNumbers;
            newNumbers[currentIndex].value = num;
            return newNumbers;
        })
    }

    function selectRandOperator() {
        const operatorArray = ['+', '-', '*', '/']
        const randomOpIndex = Math.floor(Math.random() * 4);

        return operatorArray[randomOpIndex]
    }

    // function pushToRecall(operator, num1, num2, result) {
    //     setTargetRecall(prevState => {
    //         return [...prevState, {
    //             operator: operator,
    //             num1: num1,
    //             num2: num2,
    //             result: result
    //         }]
    //     })
    // }

    function pushToRecallString(expression) {
        setTargetRecall(prev => {
            return [...prev, expression]
        })
    }

    // Returns a set containing two unique indices to access 
    // the localNumArray
    function getRandomIndices(quantity, upperBound) {
        const set = new Set()
        while (set.size < quantity) {
            const num = Math.floor(Math.random() * upperBound) + 1
            if (!set.has(num)) {
                set.add(num)
            }
        }
        return set
    }


    // TODO: Fix the generate number function
    // Generates the Target value
    function handleGenerateTarget() {

        setShowSolve(true)

        const localNumArray = cards.map(number => number.value);
        const OPMAP = {
            '*': (n1, n2) => n1 * n2,
            '/': (n1, n2) => n1 / n2,
            '+': (n1, n2) => n1 + n2,
            '-': (n1, n2) => n1 - n2
        }
        let steps = 0
        let count = 0
        while (steps < 5) {
            // 
            count++
            console.log(`looping ${count}`)
            // 
            const [randIndex1, randIndex2] = localNumArray.length > 2 ?
                getRandomIndices(2, localNumArray.length - 1) :
                [0, 1];

            if (count > 20) {
                break;
            }
            const randOperator = selectRandOperator()
            const operand_1 = localNumArray[randIndex1]
            const operand_2 = localNumArray[randIndex2]

            const tempTarget = OPMAP[randOperator](operand_1, operand_2)

            if (tempTarget > 0 && tempTarget % 1 === 0 && tempTarget <= 1000) {
                steps += 1

                const indexArray = [randIndex1, randIndex2]
                for (let i = 0; i < 2; i++) {
                    localNumArray[indexArray[i]] = localNumArray[localNumArray.length - 1]
                    localNumArray.pop()
                }
                localNumArray.push(tempTarget)
                // debugger;
                console.log(`${operand_1} ${randOperator} ${operand_2}= ${tempTarget}`)
                pushToRecallString(`${operand_1} ${randOperator} ${operand_2}= ${tempTarget}`)
            }
        }
        for (let line of targetRecall) {
            console.log(line)
        }

        setShowTarget(true)

        // 3 second timer to display random target before showing the acutal target
        const timer = new TinyTimer()

        // To be executed on every tick (200ms)
        timer.on('tick', () => {
            const randTarget = Math.floor(Math.random() * 999)
            setTarget(randTarget)
        })

        // To be executed once the timer is done
        timer.on('done', () => {
            setShowTimerView(true)
        })

        // Start the timer
        timer.start(3000, 200)
        // Show the actual target
        setTarget(localNumArray[0])
    }

    function handleEndRound() {
        if (props.isSingleRound === true) {
            props.setGameMode(0)
            props.setIsSingleRound(false)
        } else {
            props.setGameMode(props.gameModeOrder.shift())
        }
    }

    return (
        <div className="game-container">

            <div className={!showTimerView ?
                "game-info-card-timer" :
                solveForMe ? "game-info-solver" : "game-info-card"}>

                <h1>{!solveForMe && !showTarget && "NUMBERS"}</h1>
                <h1>{!solveForMe && showTarget && <div className="target-view-text">{target}</div>}</h1>
                {solveForMe && <Solver
                    answerNum={answerNum}
                    target={target}
                    setAnswerNum={setAnswerNum}
                    setCards={setCards}
                    availableCardId={availableCardID}
                    setSolveForMe={setSolveForMe}
                    setScore={props.setScore}
                    showRoundOver={showRoundOver}
                    setShowRoundOver={setShowRoundOver} />}
                {!solveForMe && showTimerView && <Timer />}
            </div>


            <div className="card-container">
                {numberElements}
            </div>

            {!solveForMe && currentIndex < 6 && <div className="numLetters-container">
                <div
                    className="btn-numLetters"
                    id="big"
                    title="[10, 25, 50, 75, 100]"
                    onClick={handleSelectNumber}>BIG</div>
                <div
                    className="btn-numLetters"
                    id="small"
                    title="Random number from 0-9"
                    onClick={handleSelectNumber}>SMALL</div>
            </div>}

            {currentIndex >= 6 && <div className="numLetters-container">
                {!solveForMe && !showSolve &&
                    <div
                        className="btn-numLetters-long"
                        onClick={handleGenerateTarget}>GENERATE NUMBER</div>}
                {!solveForMe && showSolve &&
                    <div
                        className="btn-numLetters"
                        onClick={handleSolve}>SOLVE</div>}
                {solveForMe && !showRoundOver &&
                    <div
                        className="btn-numLetters-long">SOLVE FOR ME</div>}
                {showRoundOver &&
                    <div
                        onClick={handleEndRound}
                        className="btn-numLetters-long">End Round</div>}

            </div>}

        </div>
    )
}