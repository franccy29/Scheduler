import axios from 'axios';
import { useState, useEffect } from "react";

// create and change every data pin the application.
export default function useApplicationData () {
  // create a hook for the acctual day that is selected
  const setDay = day => setState(prev => ({ ...prev, day }));
  // create an object of hook to control every data in the aplication
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  });
  // change the state of the data to set it equal to the API(using axios to make get requests)
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [state.day])
    
  // create a new interview, first it send the put request to the API then when it's over we setState and adjust the spots remaining
  function bookInterview (id, interview, changeSpot) {
    console.log(changeSpot)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() =>{ 
      if (!changeSpot) {
        const days = updateSpots(id, state, true);
        setState({...state, days, appointments})
      }
      setState({...state, appointments})
    })
  }

  // cancel interview, start but deleting witha  requeswt to the API then setState and adjust the spots remaining
  function cancelInterview (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(() =>{
      const days = updateSpots(id, state, false);
      setState({...state, days, appointments})
    })
  }
  // change the spots remaining based on the boolean value of lower, should refactor later should have a better way without the boolean
  function updateSpots (id, state, lower) {
    let index;
    state.days.forEach((uniqueDay) => {
      if (uniqueDay.appointments.includes(id)) {
        index = uniqueDay.id - 1;
        return;
      }
    })
    const newSpot = lower ? state.days[index].spots - 1 : state.days[index].spots + 1;

    const day = {
      ...state.days[index],
      spots: newSpot
    }
    const days = [
      ...state.days, 
    ]
    days[index] = day;
    return days;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}