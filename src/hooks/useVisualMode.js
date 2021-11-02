import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
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
