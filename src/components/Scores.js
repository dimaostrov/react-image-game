import React from "react";

const Scores = props => (
  <div className="flex flex-row mw6 center justify-between f2">
    <p>Current Score: {props.current}</p>
    <p>Top Score: {props.top}</p>
  </div>
);

export default Scores;
