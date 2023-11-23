import { useState, useEffect, useMemo, useCallback } from "react";
import "./Game.css";
import Game_Home from "./Game_Home";
import Game_Place from "./Game_Place";
import xLogo from "../assets/x.svg";
import oLogo from "../assets/o.svg";

export default function Game() {
  const [openGame, setOpenGame] = useState(false);
  const [winner, setWinner] = useState("");
  const [playerSelection, setPlayerSelection] = useState("");
  const [compSelection, setCompSelection] = useState("");
  const [currPlayer, setCurrPlayer] = useState("");
  const [status, setStatus] = useState({
    user: 0,
    ties: 0,
    comp: 0,
  });
  const checking=JSON.parse(localStorage.getItem('items')) 
  console.log(checking);
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
  const [showResult,setShowResult] = useState(false);
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
    setCompSelection("");
    setShowResult(false)
  };

  const replayGame = () => {
    setWinner("");
    setOptionBtns([null, null, null, null, null, null, null, null, null]);
    setCurrPlayer(playerSelection);
    setShowResult(false)
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
    const playerPos = [];
    const compPos = [];
    let occupiedPlaces = 0;
    optionBtns.forEach((ele) => {
      if (ele != null) occupiedPlaces++;
    });
    if (occupiedPlaces < 5) {
      console.log("trigeereded");
      currPlayer === "x-btn" ? setCurrPlayer("o-btn") : setCurrPlayer("x-btn");
    }
    if (occupiedPlaces >= 5) {
      for (let i = 0; i < optionBtns.length; i++) {
        if (optionBtns[i] === playerSelection) playerPos.push(i);
        else if (optionBtns[i] === compSelection) compPos.push(i);
      }
      winPatterns.forEach((a) => {
        if (a.every((ele) => playerPos.includes(ele))) {
          setStatus((prevState) => {
            let newObj = { ...prevState };
            newObj.user = prevState.user++;
            return newObj;
          });

          setWinner(playerSelection);
          setShowResult(true)
        } else if (
          winner === "" &&
          occupiedPlaces >= 6 &&
          a.every((ele) => compPos.includes(ele))
        ) {
          setStatus((prevState) => {
            let newObj = { ...prevState };
            newObj.comp = prevState.comp++;
            return newObj;
          });
          setWinner(compSelection);
          setShowResult(true)
        }
      });
      currPlayer === "x-btn" ? setCurrPlayer("o-btn") : setCurrPlayer("x-btn");
    }
    if (occupiedPlaces === 9 && winner === "") {
      if (checkTie(winPatterns)) {
        
        setStatus((prevState) => {
          let newObj = { ...prevState };
          newObj.ties = prevState.ties++;
          return newObj;
        });
        setWinner("ties");
        setShowResult(true)
        console.log("tie trigger---befor this is winner", winner);
      }
    }
    return;
  };
  const checkTie = (winPatterns) => {
    console.log(winner)
    const playerPos = [];
    const compPos = [];
    let occupiedPlaces = 0;
    optionBtns.forEach((ele) => {
      if (ele != null) occupiedPlaces++;
    });
    for (let i = 0; i < optionBtns.length; i++) {
      if (optionBtns[i] === playerSelection) playerPos.push(i);
      else if (optionBtns[i] === compSelection) compPos.push(i);
    }
    winPatterns.forEach((a) => {
      if (a.every((ele) => playerPos.includes(ele))) {
        setStatus((prevState) => {
          let newObj = { ...prevState };
          newObj.user = prevState.user++;
          return newObj;
        });

        setWinner(playerSelection);
        return false;
      } else if (
        winner === "" &&
        occupiedPlaces >= 6 &&
        a.every((ele) => compPos.includes(ele))
      ) {
        setStatus((prevState) => {
          let newObj = { ...prevState };
          newObj.comp = prevState.comp++;
          return newObj;
        });
        setWinner(compSelection);
        return false;
      }
    });
    return true;
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

  useEffect(() => {
    if (currPlayer != "" && currPlayer === compSelection && winner === "") {
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
        newArr[randomNumberFirst[pickIndex(randomNumberFirst)]] = compSelection;

        return newArr; // Return the updated state
      });
      checkWin();
    }
  }, [currPlayer]);
  const compTurn = () => {};
  // useEffect(() => {
  //   checkWin();
  // }, [optionBtns]);

  // useEffect(() => {
  //   if (winner != "" && winner == playerSelection) {
  //     console.log(" 1 entering", status, winner);
  //     setStatus((prevState) => {
  //       let newObj = { ...prevState };
  //       newObj.user = status.user++;
  //       console.log("newObj", newObj);
  //       return newObj;
  //     });
  //     console.log(" 2 entering", status, winner);
  //   } else if (
  //     winner != "" &&
  //     winner === (playerSelection === "x-btn" ? "o-btn" : "x-btn")
  //   ) {
  //     console.log(" 1 entering", status, winner);
  //     setStatus((prevState) => {
  //       let newObj = { ...prevState };
  //       newObj.comp = status.comp++;
  //       console.log("newObj", newObj);
  //       return newObj;
  //     });
  //     console.log(" 2 entering", status, winner);
  //   } else if (winner === "" && optionBtns.every((ele) => ele != null)) {
  //     console.log(" 1 entering", status, winner);
  //     setWinner("ties");
  //     setStatus((prevState) => {
  //       let newObj = { ...prevState };
  //       newObj.ties = status.ties++;
  //       console.log("newObj", newObj);
  //       return newObj;
  //     });
  //     console.log(" 2 entering", status, winner);
  //   }
  // }, [winner]);

  const handleOptionBtn = (e) => {
    if (optionBtns[parseInt(e.target.id)] === null && winner === "") {
      setOptionBtns((prevOptionBtns) => {
        const newArr = [...prevOptionBtns]; // Create a copy of the previous state
        newArr[parseInt(e.target.id)] = playerSelection;
        return newArr; // Return the updated state
      });
      checkWin();
    }
  };

  function handleSelectionClick(e) {
    console.log(e.target.id);
    setPlayerSelection(e.target.id);
    setCurrPlayer(e.target.id);
    e.target.id === "x-btn"
      ? setCompSelection("o-btn")
      : setCompSelection("x-btn");
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
          {showResult && (
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
