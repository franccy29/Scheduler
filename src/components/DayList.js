import React from 'react';
import DayListItem from 'components/DayListItem';

// creates an array of every day thats comes from props.days and render them
export default function DayList(props) {
  const dayArray = []
  props.days.map((uniqueDay) => {
    return (
      dayArray.push(
      <DayListItem 
      key={uniqueDay.id} 
      name={uniqueDay.name} 
      spots={uniqueDay.spots} 
      selected={uniqueDay.name === props.value} 
      setDay={props.onChange}
      />)
  );
});
  return (
    <ul>
      {dayArray}
    </ul>
  );
}