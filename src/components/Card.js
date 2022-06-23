import React from 'react'

export default function Card(prop) {
    return (
        <div className={prop.value === "" ? "card-empty" : "card"}>{prop.value}</div>
    )
}