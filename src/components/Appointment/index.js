import React from 'react';
import './styles.scss';

export default function Appointment (props) {
  const output = props.time ? `Appointement at ${props.time}` : "No Appointments"
  return (
    <article className="appointment">{output}</article>
  );
}