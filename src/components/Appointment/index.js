import React from 'react';
import './styles.scss';
import Header from './Header.js';
import Empty from './Empty.js';
import Show from './Show.js';

export default function Appointment (props) {
  const emptyOrNot = props.interview ? <Show interviewer={props.interview.interviewer} student={props.interview.student} /> : <Empty />;
  return (
    <article className="appointment">
      <Header time={props.time} />
      {emptyOrNot}
    </article>
  );
}