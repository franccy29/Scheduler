import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayListClass = classNames("day-list__item", {"day-list__item--selected" : props.selected, "day-list__item--full" : props.spots === 0});
  
  const spotLeft = props.spots > 1 ? `${props.spots} spots` : (props.spots ? "1 spot" : "no spots"); 
  return (
    <li onClick={() => props.setDay(props.name)} className={dayListClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotLeft} remaining</h3>
    </li>
  );
}