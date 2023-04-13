import { Routes, Route } from "react-router-dom";
import CreateEvent from "./CreateEvent";
import Event from "./Event";
import EventContainer from "./EventContainer";
import Button from "./Button";
import Edit from "./Edit";
import AssignStaff from "./AssignStaff";
import View from "../View";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EventContainer />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/createvent" element={<CreateEvent />} />
      <Route path="/assignstaff/:id" element={<AssignStaff />} />
      <Route path="/event/:id" element={<View />} />
    </Routes>
  );
}

export default App;
