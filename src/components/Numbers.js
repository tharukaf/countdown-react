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
    const [showSolveForMeBtn, setShowSolveForMeBtn] = React.useState(true)
    const [showSolve, setShowSolve] = React.useState(false)
    const [solveForMe, setSolveForMe] = React.useState(false)
    const [answerNum, setAnswerNum] = React.useState({})
    const [availableCardID, setAvailableCardID] = React.useState(0)
    const [showRoundOver, setShowRoundOver] = React.useState(false)
    const [showSteps, setShowSteps] = React.useState(false)
    const tempTarget = React.useRef(0)

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
        if (showTimerView) {
            setSolveForMe(true)
        }
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
        let stepBool = localNumArray.length > 1
        while (stepBool) {
            let [randIndex1, randIndex2] = localNumArray.length > 2 ?
                getRandomIndices(2, localNumArray.length - 1) :
                [0, 1]

            const randOperator = selectRandOperator()
            const operand_1 = localNumArray[randIndex1]
            const operand_2 = localNumArray[randIndex2]

            tempTarget.current = OPMAP[randOperator](operand_1, operand_2)
            const isPossibleTarget = tempTarget.current > 0 && tempTarget.current <= 1000 && tempTarget.current % 1 === 0

            if (isPossibleTarget) {
                steps++

                for (let i = 0; i < localNumArray.length; i++) {
                    if (localNumArray[i] === operand_1) {
                        localNumArray[i] = tempTarget.current
                        break;
                    }
                }
                for (let i = 0; i < localNumArray.length; i++) {
                    if (localNumArray[i] === operand_2) {
                        localNumArray.splice(randIndex2, 1)
                        break;
                    }
                }

                console.log(`${operand_1} ${randOperator} ${operand_2}= ${tempTarget.current}`)
                if (!(operand_2 === 1 && (randOperator === '*' || randOperator === '/'))) {
                    pushToRecallString(`${operand_1} ${randOperator} ${operand_2} = ${tempTarget.current}`)
                }

            }
            if (steps >= 3 && tempTarget.current > 100 && tempTarget.current < 1000) {
                setTarget(tempTarget.current)
                console.log(`target = ${tempTarget.current}`);
                stepBool = false
            }
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
            setTarget(tempTarget.current)
        })

        // Start the timer
        timer.start(3000, 200)
        // Show the actual target
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

    function handleSolveForMe() {
        setShowSteps(true)
        setShowSolveForMeBtn(false)
    }

    return (
        <div className="game-container">

            <div className={!showTimerView ?
                "game-info-card" :
                solveForMe ? "game-info-solver" : "game-info-card-timer"}>

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
                    showSteps={showSteps}
                    targetRecall={targetRecall}
                    setShowRoundOver={setShowRoundOver}
                    setShowSolveForMeBtn={setShowSolveForMeBtn} />}
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
                {showSolveForMeBtn && solveForMe && !showRoundOver &&
                    <div
                        className="btn-numLetters-long"
                        onClick={handleSolveForMe}>SOLVE FOR ME</div>}
                {(showRoundOver || showSteps) &&
                    <div
                        onClick={handleEndRound}
                        className="btn-numLetters-long">End Round</div>}

            </div>}

        </div>
    )
}

