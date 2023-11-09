import "./Game_Place.css";
import xLogo from "../assets/x.svg";
import oLogo from "../assets/o.svg";
import { useState } from "react";

export default function Game_Place({playerSelection,handleOptionBtn,currPlayer,optionBtns}) {
    
  return (
    <>
      <div className="top-game-place">
        <div className="logo-game-place">
          <img src={xLogo} alt="X" />
          <img src={oLogo} alt="O" />
        </div>
        <div className="turn-display">
            <img src={playerSelection==="x-btn" ? xLogo : oLogo} alt="" />
            <p>TURN</p>
        </div>
      </div>
      <div className="threexthree">
        {
            optionBtns.map((btn,index)=>(
                <button key={index} id={index} className="option-btn" onClick={handleOptionBtn}>
                    {btn &&<img src={btn === "x-btn" ? xLogo :oLogo} alt="" />}
                </button>
            ))
        }
      </div>
    </>
  );
}
