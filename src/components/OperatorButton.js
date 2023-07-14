import React from "react";

export default function OperatorButton(props) {

    return (
        <>
            <button
                onClick={props.handleOperatorClick}
                id={props.name}
                className={
                    props.currentOperator === props.name ?
                        "clicked-operator"
                        : "unclicked-operator"
                }>{props.operator}</button>
        </>
    )
}