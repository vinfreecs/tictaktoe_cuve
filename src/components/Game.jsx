import { useState, useEffect } from "react";
import "./Game.css";
import Game_Home from "./Game_Home";
import Game_Place from "./Game_Place";
import xLogo from "../assets/x.svg";
import oLogo from "../assets/o.svg";

export default function Game() {
  const [openGame, setOpenGame] = useState(false);
  const [winner, setWinner] = useState("");
  const [playerSelection, setPlayerSelection] = useState("");
  const [currPlayer, setCurrPlayer] = useState("");
  const [status, setStatus] = useState({
    user: 0,
    ties: 0,
    comp: 0,
  });
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

  const replayGame = () => {
    setWinner("");
    setOptionBtns([null, null, null, null, null, null, null, null, null]);
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
    const currPlayerPos = [];
    for (let i = 0; i < optionBtns.length; i++) {
      if (optionBtns[i] === currPlayer) currPlayerPos.push(i);
    }
    winPatterns.forEach((a) => {
      if (a.every((ele) => currPlayerPos.includes(ele))) {
        setWinner(currPlayer);
        replayGame();
        return true;
      }
    });
    if (optionBtns.every((ele) => ele != null)) {
      setWinner("ties");
    }
    return;
  };

  const pickIndex = (compPlayer) => {
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
    const userPlayer = [];
    for (let i = 0; i < optionBtns.length; i++) {
      if (optionBtns[i] === playerSelection) {
        userPlayer.push(i);
      }
    }
    if (userPlayer.length === 1) {
      return 0;
    }
    let ans = [];
    let inde = 0;
    winPatterns.forEach((a) => {
      let len = 0;
      let ele = 0;
      a.forEach((i) => {
        if (userPlayer.includes(i)) len++;
        else ele = i;
      });
      if (len == 2) {
        ans.push(ele);
        console.log(ele, ans);
      }
    });
    ans.forEach((item) => {
      if (compPlayer.includes(item)) {
        inde = compPlayer.indexOf(item);
        return;
      }
      if (inde != 0) return;
    });
    return inde;
  };
  const compTurn = () => {
    setTimeout(() => {
      if (currPlayer != "" && currPlayer != playerSelection) {
        const randomNumberFirst = [4, 0, 2, 6, 8, 1, 3, 5, 7];
        for (let i = 0; i < optionBtns.length; i++) {
          if (optionBtns[i] != null) {
            const ind = randomNumberFirst.indexOf(i);
            if (ind > -1) {
              randomNumberFirst.splice(ind, 1);
            }
          }
        }
        console.log(randomNumberFirst);
        setOptionBtns((prevOptionBtns) => {
          const newArr = [...prevOptionBtns]; // Create a copy of the previous state
          newArr[randomNumberFirst[pickIndex(randomNumberFirst)]] = currPlayer;
          currPlayer === "x-btn"
            ? setCurrPlayer("o-btn")
            : setCurrPlayer("x-btn");
          return newArr; // Return the updated state
        });
      }
    }, 0);
  };

  useEffect(() => {
    let ans = checkWin();
    compTurn();
    console.log(winner, ans);
    if (winner != "") {
      console.log("entering", status);
      setStatus({ ...status, ties: status.ties++ });
      console.log(status)
      replayGame();
    }
    // if(winner === ""){
    //   console.log("testing")
    // }else if(winner === playerSelection){
    //   setStatus((prev) =>{
    //     let newScore = {...prev}
    //     console.log(newScore)
    //     newScore.user = prev.user+1;
    //     replayGame();
    //   })
    // }else if(winner === "tie"){
    //   setStatus((prev) =>{
    //     let newScore = {...prev}
    //     newScore.ties = prev.ties+1;
    //     replayGame();
    //   })
    // }else if(winner != "tie" && winner != playerSelection){
    //   setStatus((prev) =>{
    //     let newScore = {...prev}
    //     newScore.comp = prev.comp+1;
    //     replayGame();
    //   })
    // }
  }, [optionBtns]);

  const handleOptionBtn = (e) => {
    if (
      currPlayer === playerSelection &&
      optionBtns[parseInt(e.target.id)] === null &&
      winner === ""
    ) {
      setOptionBtns((prevOptionBtns) => {
        const newArr = [...prevOptionBtns]; // Create a copy of the previous state
        newArr[parseInt(e.target.id)] = currPlayer;
        return newArr; // Return the updated state
      });
      currPlayer === "x-btn" ? setCurrPlayer("o-btn") : setCurrPlayer("x-btn");
    }
  };

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
          status={status}
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
