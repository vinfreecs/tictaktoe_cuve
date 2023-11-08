import { useEffect, useState } from "react";
import "./Toast.css";
import axios from "axios";

export default function Toast() {
  const [add, setAdd] = useState("");
  useEffect(() => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((res) => {
        setAdd(res.data.slip.advice);
      })
      .catch((error) => {
        console.log(error);
      });
    let interval = setInterval(() => {
      axios
        .get("https://api.adviceslip.com/advice")
        .then((res) => {
          setAdd(res.data.slip.advice);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="toast">
      <h1>QUOTE #1</h1>
      {add ? <p>“{add}”</p> : <p>Loading</p>}
    </div>
  );
}
