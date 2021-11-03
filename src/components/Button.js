import React from "react";
import classNames from "classnames";

import "components/Button.scss";

// creates a button wich is takes multiple form around the application
export default function Button(props) {
   const buttonClass = classNames('button', {"button--confirm": props.confirm, "button--danger": props.danger});
   return <button 
            disabled={props.disabled} 
            className={buttonClass} 
            onClick={props.onClick}>
               {props.children}</button>;
}