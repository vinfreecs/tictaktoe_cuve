import { useState, useEffect } from "react";
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

  useEffect(() => {
    setTimeout(() => {
      if (currPlayer != "" && currPlayer != playerSelection) {
        const randomNumber = [];
        for (let i = 0; i < optionBtns.length; i++) {
          if (optionBtns[i] === null) randomNumber.push(i);
        }
        setOptionBtns((prevOptionBtns) => {
          const newArr = [...prevOptionBtns]; // Create a copy of the previous state
          newArr[
            randomNumber[Math.floor(Math.random() * randomNumber.length)]
          ] = currPlayer;
          currPlayer === "x-btn"
            ? setCurrPlayer("o-btn")
            : setCurrPlayer("x-btn");
          return newArr; // Return the updated state
        });
      }
    }, 2000);
  }, [currPlayer]);

  const handleOptionBtn = (e) => {
    if (
      currPlayer === playerSelection &&
      optionBtns[parseInt(e.target.id)] === null
    ) {
      setOptionBtns((prevOptionBtns) => {
        const newArr = [...prevOptionBtns]; // Create a copy of the previous state
        newArr[parseInt(e.target.id)] = currPlayer;
        currPlayer === "x-btn"
          ? setCurrPlayer("o-btn")
          : setCurrPlayer("x-btn");
        return newArr; // Return the updated state
      });
    }
  };

  const checkWin = () => {
    const winPatterns = [
      [0, 1, 2],
      [0, 3, 6],
      [3, 4, 5],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [6, 7, 8],
    ];
    const currPlayerPos = []
    for(let i=0;i<optionBtns.length;i++){
      if(optionBtns[i]===currPlayer) currPlayerPos.push(i)
    }
    winPatterns.forEach((a) => {
      if (a.every((ele) => currPlayerPos.includes(ele))) {
        let winner = currPlayer;
        console.log(winner+"won the game")
      }
    });
  };
  checkWin();
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
