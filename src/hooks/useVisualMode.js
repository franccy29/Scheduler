import { useState } from "react";

// control the state in wich every element is in
export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  // change the state the what ever is asked and keep track of the history, replace is to skip back twice(used with the loading mode)
  function transition (update, replace = false) {
    if (replace) {
      back()
      transition(update)
    } else {
      setHistory(prev => [...prev, update]);
      setMode(update);
      return {mode};
    }
  }

  // goes back to the last mode based on the history
  function back () {
    if (history.length > 1) {
      const previous = history[history.length - 2];
      setHistory(prev => {
        history.pop();
        return history;
      })
      setMode(previous);
      return {mode}
    } else {
      return {mode:initial}
    }
  }

  return {mode, transition, back};
}
