import axios from 'axios';
import { useState, useEffect } from "react";

export default function useApplicationData () {

  const setDay = day => setState(prev => ({ ...prev, day }));

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

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [state.day])
    

  function bookInterview (id, interview) {
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
      const days = updateSpots(id, state, true);
      setState({...state, days, appointments})
    })
  }

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