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

export function getInterview (state, interview) {
  if (interview) {
    return {student:interview.student, interviewer: state.interviewers[interview.interviewer]};
  }
  return null;
}
