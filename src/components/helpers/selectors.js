// sort to keep only the appointment for the specefic day we're on
export function getAppointmentsForDay (state, day) {
  const finalArray = [];
  state.days.forEach((select) => {
    if (select.name === day) {
      select.appointments.forEach(((num) => {
        finalArray.push(state.appointments[num])
      }))
    }
  })
  return finalArray;
}

// add the interviewer information in the interview if there's an appointment program at that moment, else return null
export function getInterview (state, interview) {
  if (interview) {
    return {student:interview.student, interviewer: state.interviewers[interview.interviewer]};
  }
  return null;
}

// sort to keep only the interview for the specefic day we're on
export function getInterviewersForDay (state, day) {
  const finalArray = [];
  state.days.forEach((select) => {
    if (select.name === day) {
      select.interviewers.forEach(((num) => {
        finalArray.push(state.interviewers[num])
      }))
    }
  })
  return finalArray;
}