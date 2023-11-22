import "./Game_Place.css";
import xLogo from "../assets/x.svg";
import oLogo from "../assets/o.svg";
import reset from "../assets/reset.svg";
import { useState } from "react";

export default function Game_Place({
  playerSelection,
  handleOptionBtn,
  currPlayer,
  optionBtns,
  status,
  winner,
  handleResetBtn
}) {
  return (
    <>
      <div className="top-game-place">
        <div className="logo-game-place">
          <img src={xLogo} alt="X" />
          <img src={oLogo} alt="O" />
        </div>
        <div className="turn-display">
          <img src={currPlayer === "x-btn" ? xLogo : oLogo} alt="" />
          <p>TURN</p>
        </div>
        <div className="reset-btn">
          <button onClick={handleResetBtn}>
            <img src={reset} alt="" />
          </button>
        </div>
      </div>
      <div className="threexthree">
        {optionBtns.map((btn, index) => (
          <button
            key={index}
            id={index}
            className="option-btn"
            onClick={handleOptionBtn}
          >
            {btn && <img src={btn === "x-btn" ? xLogo : oLogo} alt="" />}
          </button>
        ))}
      </div>
      <div className="game-scores-container">
        <div className="player-score">
          <p>
          {playerSelection === "x-btn" ? <>X</> : <>O</>}
            (YOU)
          </p>
          <p>{status.user}</p>
        </div>
        <div className="tie-score">
          <p>TIES</p>
          <p>{status.ties}</p>
        </div>
        <div className="comp-score">
          <p>
          {playerSelection === "x-btn" ? <>O</>: <>X</>} 
            (CPU)
          </p>
          <p>{status.comp}</p>
        </div>
      </div>
      
    </>
  );
}
