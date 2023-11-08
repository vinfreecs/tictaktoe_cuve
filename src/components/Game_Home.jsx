import xLogo from "../assets/x.svg"
import oLogo from "../assets/o.svg"
import { useState } from "react"

export default function Game_Home (){
    const [playerSelection,setPlayerSelection] = useState("")
    function handleClick(e){
        console.log(e.target.id)
        setPlayerSelection(e.target.id)
    }
    const xBtnStyle ={
        backgroundColor:playerSelection === "x-btn" ? "white" : "inherit"
    }
    const oBtnStyle ={
        backgroundColor:playerSelection === "o-btn" ? "white" : "inherit"
    }
    return(
        <section className="game-home">
            <div className="logo-head">
                <img src={xLogo} alt="X" />
                <img src={oLogo} alt="O" />
            </div>
            <div className="pick-player">
                <p>PICK PLAYER</p>
                <div className="options">
                    <button id="x-btn" className="option xlogo" onClick={handleClick} style={xBtnStyle}>
                        <img id="x-btn" src={xLogo} alt="X" />
                    </button>
                    <button id="o-btn" className="option ologo" onClick={handleClick} style={oBtnStyle}>
                        <img id="o-btn" src={oLogo} alt="O" />
                    </button>
                </div>
            </div>
            <div className="new-game">
                <button>NEW GAME (VS CPU)</button>
                <button>NEW GAME ( VS HUMAN ) Coming soon</button>
            </div>
            <button className="invite-btn">Invite your friend</button>
        </section>
    )
}