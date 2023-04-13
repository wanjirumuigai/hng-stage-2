import React from "react";
import CreateEvent from "./CreateEvent";
import { useNavigate } from "react-router-dom";

function Button() {
  const navigate = useNavigate();
  return (
    <button className="btn" onClick={() => navigate("/createvent")}>
      Add event
    </button>
  );
}
export default Button;
