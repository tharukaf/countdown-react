import React from 'react'
import "../styles/card.css"

export default function Card(props) {

    // const [cardValue, setCardValue] = React.useState(props.value)

    function handleClick() {
        if (props.solveForMe === true) {
            props.handleCardClick(props.value, props.id)
        }
    }

    return (
        <div
            onClick={handleClick}
            className={props.value === null ? "card-empty" : "card"}>{props.value}
        </div>
    )
}