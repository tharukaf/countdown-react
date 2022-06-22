import { nanoid } from "nanoid";
import React from "react"
import Card from "./Card";

export default function Numbers() {

    const [numbers, setNumbers] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [showTarget, setShowTarget] = React.useState(false);
    const [target, setTarget] = React.useState(0);
    const [targetRecall, setTargetRecall] = React.useState([])

    React.useEffect(() => {
        for (let i = 0; i < 6; i++) {
            setNumbers(prevNumbers => {
                return [...prevNumbers, "*"]
            })
        }
    }, [])

    const numberElements = numbers.map(number => {
        return <Card key={nanoid()} value={number} />
    })

    function selectRandomIndex(size) {
        return Math.floor(Math.random() * size);
    }

    function setNumbersArray(num) {
        setNumbers(prevNumbers => {
            const newNumbers = prevNumbers;
            newNumbers[currentIndex] = num;
            return newNumbers;
        })
    }

    function selectNumber(event) {
        const { id } = event.target;

        if (id === "big") {
            const bigNums = [10, 25, 50, 75, 100];
            const bigNumIndex = selectRandomIndex(5);
            setNumbersArray(bigNums[bigNumIndex])

            console.log("big")

        } else if (id === "small") {
            const smallNums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            const smallNumIndex = selectRandomIndex(9);
            setNumbersArray(smallNums[smallNumIndex])

            console.log("small")
        }
        setCurrentIndex(prevState => prevState + 1)
    }

    function selectRandOperator() {
        const operatorArray = ['+', '-', '*', '/']
        const randomOpIndex = Math.floor(Math.random() * 4);

        return operatorArray[randomOpIndex]
    }

    function pushToRecall(operator, num1, num2, result) {
        setTargetRecall(prevState => {
            return [...prevState, {
                operator: operator,
                num1: num1,
                num2: num2,
                result: result
            }]
        })
    }

    function randomIndex(quantity, max) {
        const set = new Set()
        if (max === 1) {
            set.add(1)
            return set
        }
        while (set.size < quantity) {
            set.add(Math.floor(Math.random() * max) + 1)
        }
        return set
    }

    function generateTarget() {
        const localNumArray = [...numbers];
        const OPMAP = {
            '*': (n1, n2) => n1 * n2,
            '/': (n1, n2) => n1 / n2,
            '+': (n1, n2) => n1 + n2,
            '-': (n1, n2) => n1 - n2
        }
        while (localNumArray.length > 1) {


            const [randIndex1, randIndex2] = localNumArray.length > 2 ?
                randomIndex(2, localNumArray.length - 1) :
                [0, 1];

            const randOperator = selectRandOperator();
            const operand_1 = localNumArray[randIndex1];
            const operand_2 = localNumArray[randIndex2]

            const tempTarget = OPMAP[randOperator](operand_1, operand_2);

            if (tempTarget > 0 && tempTarget % 1 === 0 && tempTarget <= 1000) {

                pushToRecall(randOperator, operand_1, operand_2, tempTarget)

                const indexArray = [randIndex1, randIndex2];
                for (let i = 0; i < 2; i++) {
                    for (let j = indexArray[i] + 1; j < localNumArray.length; j++) {
                        if (indexArray[i] === localNumArray.length - 1) {
                            localNumArray.pop()
                        } else {
                            localNumArray[j - 1] = localNumArray[j];
                        }
                    }
                    localNumArray.length--;
                }
                localNumArray.push(tempTarget)

            }
            console.log(localNumArray)
        }


        setTarget(localNumArray[0])
        setShowTarget(true)
        console.log(targetRecall)
    }

    return (
        <div>
            <h1>
                Numbers
            </h1>
            {numberElements}
            {currentIndex < 6 && <div>
                <button id="big" onClick={selectNumber}>Big</button>
                <button id="small" onClick={selectNumber}>Small</button>
            </div>}

            {currentIndex >= 6 && <div>
                <button onClick={generateTarget}>Generate Target</button>
            </div>}

            {showTarget && <>
                {target}
            </>}
        </div>
    )
}