import { useState } from "react";
import "./Game.css";
import Game_Home from "./Game_Home";
import Game_Place from "./Game_Place";
import xLogo from "../assets/x.svg";
import oLogo from "../assets/o.svg";

export default function Game() {
  const [openGame, setOpenGame] = useState(false);
  const [playerSelection, setPlayerSelection] = useState("");
  const [currPlayer, setCurrPlayer] = useState("");
  const [optionBtns, setOptionBtns] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const handleOptionBtn = (e) => {
    if (optionBtns[parseInt(e.target.id)] === null) {
      setOptionBtns((prevOptionBtns) => {
        const newArr = [...prevOptionBtns]; // Create a copy of the previous state
        newArr[parseInt(e.target.id)] = currPlayer;
        console.log(optionBtns);
        currPlayer === "x-btn"
          ? setCurrPlayer("o-btn")
          : setCurrPlayer("x-btn");
        return newArr; // Return the updated state
      });
    }
  };

  if(currPlayer!="" && currPlayer != playerSelection){
    console.log(Math.floor(Math.random()*10))
    setTimeout(()=>{
        setOptionBtns((prevOptionBtns) => {
            const newArr = [...prevOptionBtns]; // Create a copy of the previous state
            newArr[Math.floor(Math.random()*10)] = currPlayer;
            console.log(optionBtns);
            currPlayer === "x-btn"
              ? setCurrPlayer("o-btn")
              : setCurrPlayer("x-btn");
            return newArr; // Return the updated state
          });
    },2000)
    
  }

  function handleSelectionClick(e) {
    console.log(e.target.id);
    setPlayerSelection(e.target.id);
    setCurrPlayer(e.target.id);
  }

  function handleClickToGame() {
    setOpenGame(true);
  }

  return (
    <div className="game-home">
      {openGame ? (
        <Game_Place
          playerSelection={playerSelection}
          handleOptionBtn={handleOptionBtn}
          currPlayer={currPlayer}
          optionBtns={optionBtns}
        />
      ) : (
        <Game_Home
          handleClickNewGame={handleClickToGame}
          handlePlayerSelection={handleSelectionClick}
          playerSelection={playerSelection}
        />
      )}
    </div>
  );
}
