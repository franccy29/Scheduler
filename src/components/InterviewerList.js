import React from 'react';
import PropTypes from 'prop-types';
import InterviewerListItem from 'components/InterviewerListItem';
import "components/InterviewerList.scss";

//  makes an array of every interviewers received and render them all
export default function InterviewerList (props) {
  const interviewerArray = [];
  props.interviewers.map((unique) => {
    return interviewerArray.push(<InterviewerListItem 
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
// asure that the props.interviewers is an array
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};