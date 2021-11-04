import React from 'react';
import './styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from "../../hooks/useVisualMode";


export default function Appointment (props) {
  // create every mode posssible
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

  // add the visual mode "manager"
  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY );

  // save the new appointment using the bookInterview function coming from Application.js 
  // passed by props and from (../../hooks/useApplicationData)
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((error) => {
        transition(ERROR_SAVE, true);
      })
  }

  // change mode to confirm, used in the onCancel from the SHOW mode
  function confirming () {
    transition(CONFIRM);
  }

  // delete the appointment using the cancelInterview function coming from Application.js 
  // passed by props and from (../../hooks/useApplicationData)
  function cancel(){
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true)
      })
  }
// change mode to edit, used in the SHOW mode
  function editing () {
    transition(EDIT);
  }

  // render the good mode based on the value of MODE
  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&  <Show student={props.interview.student} interviewer={props.interview.interviewer} onCancel={confirming} onEdit={editing} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onCancel={back} onConfirm={cancel} />}
      {mode === EDIT &&  <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} student={props.interview.student} onCancel={back} onSave={save} />}
      {mode === ERROR_SAVE && <Error onClose={back} message={"There was an error while saving"} />}
      {mode === ERROR_DELETE && <Error onClose={back} message={"There was an error while deleting"} />}
      
    </article>
  );
}