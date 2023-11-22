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

  const newGame = () => {
    setWinner("");
    setOptionBtns([null, null, null, null, null, null, null, null, null]);
    setOpenGame(false);
    setPlayerSelection("");
    setStatus({
      user: 0,
      ties: 0,
      comp: 0,
    });
    setCurrPlayer("");
  };

  const replayGame = () => {
    setWinner("");
    setOptionBtns([null, null, null, null, null, null, null, null, null]);
    setCurrPlayer(playerSelection);
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
    let occupiedPlaces = 0;
    optionBtns.forEach((ele) => {
      if (ele != null) occupiedPlaces++;
    });
    if (occupiedPlaces >= 5) {
      for (let i = 0; i < optionBtns.length; i++) {
        if (optionBtns[i] === currPlayer) currPlayerPos.push(i);
      }
      console.log(currPlayerPos);
      winPatterns.forEach((a) => {
        if (a.every((ele) => currPlayerPos.includes(ele))) {
          setWinner((prevState) => {
            let newWinner = currPlayer;
            return newWinner;
          });
          return true;
        }
      });
    }
    if (occupiedPlaces === 8) setWinner(winner);
    if (winner === "") {
      compTurn();
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
    if (currPlayer != "" && currPlayer != playerSelection && winner === "") {
      console.log("playing");
      const randomNumberFirst = [4, 0, 2, 6, 8, 1, 3, 5, 7];
      for (let i = 0; i < optionBtns.length; i++) {
        if (optionBtns[i] != null) {
          const ind = randomNumberFirst.indexOf(i);
          if (ind > -1) {
            randomNumberFirst.splice(ind, 1);
          }
        }
      }
      setOptionBtns((prevOptionBtns) => {
        const newArr = [...prevOptionBtns]; // Create a copy of the previous state
        newArr[randomNumberFirst[pickIndex(randomNumberFirst)]] = currPlayer;
        currPlayer === "x-btn"
          ? setCurrPlayer("o-btn")
          : setCurrPlayer("x-btn");
        return newArr; // Return the updated state
      });
    }
  };

  useEffect(() => {
    checkWin();
  }, [optionBtns]);

  useEffect(() => {
    console.log(winner);
    if (winner != "" && winner == playerSelection) {
      setStatus((prevState) => {
        let newObj = { ...prevState };
        newObj.user = status.user++;
        return newObj;
      });
    } else if (
      winner != "" &&
      winner === (playerSelection === "x-btn" ? "o-btn" : "x-btn")
    ) {
      console.log("entering", status, winner);
      setStatus((prevState) => {
        let newObj = { ...prevState };
        newObj.comp = status.comp++;
        return newObj;
      });
    } else if (winner === "" && optionBtns.every((ele) => ele != null)) {
      console.log("entering");
      setWinner("ties")
      setStatus((prevState) => {
        let newObj = { ...prevState };
        newObj.ties = status.ties++;
        return newObj;
      });
    }
  }, [winner,optionBtns]);

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
        <>
          <Game_Place
            playerSelection={playerSelection}
            handleOptionBtn={handleOptionBtn}
            currPlayer={currPlayer}
            optionBtns={optionBtns}
            status={status}
            winner={winner}
            handleResetBtn={newGame}
          />
          {winner != "" && (
            <>
              <div className="back-result-wrapper">
                <div className="show-result">
                  <h3>
                    {winner === playerSelection ? (
                      <>YOU WON</>
                    ) : winner === "ties" ? (
                      <>ROUND TIED</>
                    ) : (
                      <>YOU LOST</>
                    )}
                  </h3>
                  <div className="winner-selection">
                    <img src="" alt="" />
                    <p>TAKES THE ROUND</p>
                  </div>
                  <div className="show-res-btn-wrapper">
                    <button className="quit-game" onClick={newGame}>
                      QUIT
                    </button>
                    <button className="next-round" onClick={replayGame}>
                      NEXT ROUND
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
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
