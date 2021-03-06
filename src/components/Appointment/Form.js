import React, { useState } from 'react';
import Button from '../Button.js'
import InterviewerList from '../InterviewerList';

export default function Form (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset () {
    setStudent("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }
  
  function validate() {
    console.log(interviewer)
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    } else if (!interviewer) {
      setError("You have to choose an interviewer");
      return;
    } else {
      setError("");
      props.onSave(student, interviewer, props.edit);
    }
  }
  
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={e => e.preventDefault()} >
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={e => setStudent(e.target.value)}
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
      value={interviewer}
      interviewers={props.interviewers}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel} >Cancel</Button>
      <Button confirm onClick={() => validate()} >Save</Button>
    </section>
  </section>
</main>
  );
}
