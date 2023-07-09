import React from "react";
import OperatorButton from "./OperatorButton";
import { nanoid } from "nanoid";

export default function Solver(props) {

    const [currentOperator, setCurrentOperator] = React.useState(undefined)
    const [currentLine, setCurrentLine] = React.useState({})
    const [solverDisplay, setSolverDisplay] = React.useState([])


    const solverElements = solverDisplay.map(line => {
        return <div key={nanoid()}>
            {line.operand1} {line.operator} {line.operand2} = {line.computed}
        </div>
    })

    function selectOperator(op) {
        setCurrentOperator(op)
        setCurrentLine(prev => {
            return {
                ...prev,
                operator: op,
            }
        })
    }

    function setCurrentLineHelper(value, operandN) {
        setCurrentLine(prev => {
            return {
                ...prev,
                [operandN]: value
            }
        })
    }

    React.useEffect(() => {
        if (currentLine.operand1 === undefined) {
            setCurrentLineHelper(props.answerNum.value, "operand1")
        } else if (currentLine.operand1) {
            setCurrentLineHelper(props.answerNum.value, "operand2")
        }
    }, [props.answerNum.id, props.answerNum.value])


    function handleOperatorClick({ target }) {
        if (target.id === "add") {
            selectOperator("add")
        } else if (target.id === "subtract") {
            selectOperator("subtract")
        } else if (target.id === "multiply") {
            selectOperator("multiply")
        } else if (target.id === "divide") {
            selectOperator("divide")
        }
    }

    function currentLineOperatorView() {
        if (currentLine.operator === "add") { return "+" }
        else if (currentLine.operator === "subtract") { return "-" }
        else if (currentLine.operator === "multiply") { return "*" }
        else if (currentLine.operator === "divide") { return "/" }
    }

    function handleCompute() {

        if (!currentLine.operand1 ||
            !currentLine.operand2 ||
            !currentLine.operator) {
            return;
        }

        let output;

        if (currentLine.operator === "add") {
            output = currentLine.operand1 + currentLine.operand2
            currentLine.operator = "+"
        } else if (currentLine.operator === "subtract") {
            output = currentLine.operand1 - currentLine.operand2
            currentLine.operator = "-"
        } else if (currentLine.operator === "multiply") {
            output = currentLine.operand1 * currentLine.operand2
            currentLine.operator = "*"
        } else if (currentLine.operator === "divide") {
            output = currentLine.operand1 / currentLine.operand2
            currentLine.operator = "/"
        }

        currentLine.computed = output

        setSolverDisplay(prev => {
            return [...prev, currentLine]
        })

        if (output === props.target) {
            assignScore()
            props.setShowRoundOver(() => {
                // props.setSolveForMe(false)
                return true
            })
        }

        props.setCards(prev => {
            const tempNums = prev.map(card => {
                if (card.id === props.availableCardId) {
                    return {
                        ...card,
                        value: output
                    }
                } else {
                    return card
                }
            })
            return tempNums
        })

        setCurrentOperator(undefined)
        setCurrentLine({
            operand1: undefined,
            operand2: undefined,
            operator: undefined
        })
    }

    function assignScore(aAnswer, isCorrectAnswer) {
        props.setScore(prev => {
            let score = parseInt(prev) + 10
            return score
        })
    }

    return (
        <>
            {props.showRoundOver && <div>ANSWER CORRECT</div>}
            <div className="solverTarger">
                Your target is: <b>{props.target}</b>
            </div>
            <div className="answer-board">
                {solverElements}
                <div>
                    {currentLine.operand1 !== undefined ? currentLine.operand1 : ""}
                    {currentLine.operator !== undefined ? currentLineOperatorView() : ""}
                    {currentLine.operand2 !== undefined ? currentLine.operand2 : ""}
                </div>
            </div>
            <div className="operator-container">
                <OperatorButton
                    handleOperatorClick={handleOperatorClick}
                    operator={"+"}
                    name="add"
                    currentOperator={currentOperator} />
                <OperatorButton
                    handleOperatorClick={handleOperatorClick}
                    operator={"-"}
                    name="subtract"
                    currentOperator={currentOperator} />
                <OperatorButton
                    handleOperatorClick={handleOperatorClick}
                    operator={"x"}
                    name="multiply"
                    currentOperator={currentOperator} />
                <OperatorButton
                    handleOperatorClick={handleOperatorClick}
                    operator={"/"}
                    name="divide"
                    currentOperator={currentOperator} />
                <div
                    onClick={handleCompute}
                    className="clicked-operator-equals"
                >=</div>
            </div>
        </>
    )
}
