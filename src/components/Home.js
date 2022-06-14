import '../toggle.css'

export default function Home(props) {
    return (
        <>
            <h1>Welcome to Countdown</h1>
            <div>
                <input type="text"
                    placeholder="Player Name"
                    onChange={props.handleChange} />
                <input type="checkbox" id="switch"
                    onChange={props.gameModeToggle} />
                <label for="switch">Toggle</label>
                <button onClick={props.newGame}>New Game</button>
            </div>
        </>
    )
}