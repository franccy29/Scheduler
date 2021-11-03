import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "./helpers/selectors";
import useApplicationData from '../hooks/useApplicationData';



// main part, creates an array of every appointment and add a last one with the kay "last" so the CSS can hide it and end the day at 5pm
// render the dayList too using the data coming from useApplicationData wich calls the API and creates every hooks(../hooks/useApplicationData)

export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const appointmentsArray = getAppointmentsForDay(state, state.day).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return <Appointment key={appointment.id} id={appointment.id} time={appointment.time} 
                        interview={interview} interviewers={interviewers} bookInterview={bookInterview} 
                        cancelInterview={cancelInterview} />
  });
  appointmentsArray.push(<Appointment key="last" time="5pm" />);

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {appointmentsArray}
      </section>
    </main>
  );
}