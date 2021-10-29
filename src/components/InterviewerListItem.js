import React from 'react';

import "components/InterviewerListItem.scss";

export default function InterviewerListItem (props) {
  const classItem = props.selected ? "interviewers__item interviewers__item--selected" : "interviewers__item";
  return (
    <li className={classItem} onClick={props.setInterviewer} >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}