import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";

function AssignStaff() {
  let { id } = useParams();
  let url = `http://localhost:9292/events_staffs/${id}`;

  const [staff, setStaff] = useState([]);
  const [assignStaff, setAssignStaff] = useState({
    Supervisor: "",
    Housekeeper: "",
    IT: "",
    Catering: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const checkHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (e.target.checked) {
      e.preventDefault();
      setAssignStaff({
        ...assignStaff,
        [value]: e.target.id,
      });
    } else {
      setAssignStaff({
        ...assignStaff,
        [value]: "",
      });
    }
  };

  useEffect(() => {
    fetch("http://localhost:9292/staff")
      .then((res) => res.json())
      .then((data) => {
        setStaff(data);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !assignStaff.Supervisor &&
      !assignStaff.Housekeeping &&
      !assignStaff.IT &&
      !assignStaff.Catering
    ) {
      console.log("Assign at least one staff to the event");
    } else {
      console.log(assignStaff);
      fetch(`${url}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignStaff),
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log("Error: ", err.message));
    }

    navigate(`/event/${id}`);
  }
  function handleUpdate() {
    navigate(`/edit/${id}`);
  }
  function handleClose() {
    navigate("/");
  }

  return (
    <>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <p onClick={() => handleClose()}>
            <button id="close-btn">Close X</button>
          </p>
          <p>
            <EditIcon className="editIcon" onClick={() => handleUpdate()} />
          </p>
          <div className="formbold-form-title">
            <h2 className="">Assign Staff</h2>
          </div>
          <form onSubmit={handleSubmit}>
            {staff.map((item) => {
              return (
                <div key={item.id}>
                  <label>
                    <input
                      id={item.id}
                      type="checkbox"
                      name={item.name}
                      value={item.role}
                      onChange={checkHandler}
                    />

                    {item.name}
                    <span>{item.role}</span>
                  </label>
                  <br />
                </div>
              );
            })}
            <button className="btn">Assign Staff</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AssignStaff;
