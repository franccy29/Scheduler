import React, { useState } from 'react';
import Button from '../Button.js'
import InterviewerList from '../InterviewerList';

export default function Form (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  function reset () {
    setInterviewer("");
    setStudent("");
  }
  function cancel () {
    reset();
    props.onCancel();
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
      />
    </form>
    <InterviewerList 
      value={interviewer}
      interviewers={props.interviewers}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={() => cancel()} >Cancel</Button>
      <Button confirm onClick={props.onSave} >Save</Button>
    </section>
  </section>
</main>
  );
}