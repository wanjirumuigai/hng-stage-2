import React from "react";
import Event from "./Event";
import Button from "./Button";

function EventContainer() {
  return (
    <>
      <Button />
      <ul className="cards">
        <Event />
      </ul>
    </>
  );
}

export default EventContainer;
