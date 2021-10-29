import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import "components/InterviewerList.scss";

export default function InterviewerList (props) {
  const interviewerArray = [];
  props.interviewers.map((unique) => {
    interviewerArray.push(<InterviewerListItem 
                              key={unique.id} 
                              name={unique.name} 
                              avatar={unique.avatar} 
                              selected={unique.id === props.value}
                              setInterviewer={() => props.onChange(unique.id)}
                              />);
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerArray}</ul>
    </section>
  );
}