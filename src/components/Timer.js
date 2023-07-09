import React from 'react';
import TinyTimer from 'tiny-timer';

export default function Timer(props) {

    const [clock, setClock] = React.useState(31)
    const timer = new TinyTimer()

    // To be executed on every tick (200ms)
    React.useEffect(() => {
        timer.on('tick', () => {
            if (clock > 0) {
                setClock(prev => prev - 1)
            }
        })

        timer.start(30000, 1000)
    }, [])

    return (
        <div className="timer" style={{ background: `conic-gradient(from ${clock * 6}deg at 50% 50%, rgba(255, 0, 0, 0) -359.5deg, #FF0000 0.08deg, rgba(255, 0, 0, 0) 0.5deg, #FF0000 360.08deg)` }}>
            {props.endTimer && <div className='timer-text-main'>0</div>}
            {!props.endTimer && <div className='timer-text-main'>{clock > 0 ? clock : "0"}</div>}
            <div className='timer-text-secondary'>SECONDS</div>
        </div>
    )
}

// import React from 'react'
// import Two from "two.js";
// import TinyTimer from 'tiny-timer';
// import useSound from 'use-sound';
// import soundFx from '../audio/countdown_timer.mp3'

// export default function Timer() {
//     const domElement = React.useRef();

//     React.useEffect(setup, []);
//     const [play] = useSound(soundFx)

//     function setup() {
//         const two = new Two({
//             type: Two.Types.svg,
//             fullscreen: false,
//             autostart: true,
//         }).appendTo(domElement.current);

//         two.renderer.domElement.style.background = '#0000ff';

//         const TWO_PI = Math.PI * 2;
//         const drag = 0.125;
//         const radius = Math.min(two.width, two.height) * 0.33;
//         const styles = {
//             size: radius * 0.33,
//             weight: 'bold',
//             family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
//             fill: 'black',
//             opacity: 0.5
//         };

//         const backCirc = two.makeCircle(0, 0, radius + 70);
//         const midCirc = two.makeCircle(0, 0, radius + 50);
//         const ticks = two.makeCircle(0, 0, radius);
//         backCirc.fill = 'rgb(0,0,100)'
//         ticks.fill = 'rgb(255,255,255)'
//         ticks.dashes = [1, (TWO_PI * radius / 12 - 1)];
//         ticks.linewidth = 50;
//         ticks.stroke = 'rgba(0, 0, 0, 1)';

//         const hands = {
//             second: new Two.Line(0, 0, 0, - radius * 0.9)
//         };

//         hands.second.cap = 'round';
//         hands.second.stroke = 'rgb(255,0,0)'

//         two.add(hands.second);

//         two.bind('resize', resize)
//             .bind('update', update);

//         resize();

//         function resize() {
//             two.scene.position.set(two.width / 2, two.height / 2);
//         }

//         const timer = new TinyTimer()
//         let seconds = 30;

//         timer.on('tick', (ms) => { seconds = ms / 1000 })
//         timer.start(30000, 100)



//         function update(frameCount, timeDelta) {
//             const sr = TWO_PI * (seconds / 60);
//             hands.second.rotation += (sr - hands.second.rotation) * drag;
//         }
//     }

//     return (
//         <>
//             <div ref={domElement} />
//             {play()}
//         </>
//     );
// }