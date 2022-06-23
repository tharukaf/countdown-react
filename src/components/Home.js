import '../styles/toggle.css'

export default function Home(props) {
    return (
        <>

            <div className="form-container">
                <input type="text"
                    placeholder="Player Name"
                    onChange={props.handleChange}
                    name="playerName"
                    value={props.playerName}
                />
                <div className="toggler">
                    <p className="toggler-text">LETTERS</p>
                    <input type="checkbox" id="switch"
                        onChange={props.gameModeToggle} />
                    <label for="switch">Toggle</label>
                    <p className="toggler-text">NUMBERS</p>
                </div>
                <button className="btn-numLetters" onClick={props.newGame}>New Game</button>
            </div>
        </>
    )
}