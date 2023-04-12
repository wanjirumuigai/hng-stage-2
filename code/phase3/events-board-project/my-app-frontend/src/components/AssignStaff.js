import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AssignStaff() {
  let { id } = useParams();
  let url = `http://localhost:9292/events_staffs/${id}`;

  const [staff, setStaff] = useState([]);
  const [assignStaff, setAssignStaff] = useState({
    eventID: id,
    Supervisor: "",
    Housekeeping: "",
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
      console.log(JSON.stringify(assignStaff));
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
    navigate("/");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        {staff.map((item) => {
          return (
            <div className="card__detail" key={item.id}>
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
    </>
  );
}

export default AssignStaff;
