import { useState } from "react";

// control the state in wich every element is in
export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  // change the state the what ever is asked and keep track of the history, replace is to skip back twice(used with the loading mode)
  function transition (update, replace = false) {
    if(replace){
      setHistory(prev => [...prev.slice(0, -1), update]);
      } else {
      setHistory(prev => ([...prev, update]));
      }
      setMode(update)
  }
  
  // goes back to the last mode based on the history
  function back () {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
      setHistory(history);

    } 
  }

  return {mode, transition, back};
}
