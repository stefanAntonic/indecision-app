import React from "react";

const Action = (props) => {
    return (
      <button className='big-button' onClick={props.handePick} disabled={!props.hasOptions}>
        What should I do?
      </button>
    );
  };
  
  export default Action;