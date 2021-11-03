import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

/*
This is one single day on the side with the name of the day and the spots remaining, once clicked it calls to setDay wich is pass as a props
and from DayList.js as props.onChange wich then comes from Application.js 
*/ 
export default function DayListItem(props) {
  const dayListClass = classNames("day-list__item", {"day-list__item--selected" : props.selected, "day-list__item--full" : props.spots === 0});
  
  const spotLeft = props.spots > 1 ? `${props.spots} spots` : (props.spots ? "1 spot" : "no spots"); 
  return (
    <li onClick={() => props.setDay(props.name)} className={dayListClass} data-testid={"day"} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotLeft} remaining</h3>
    </li>
  );
}