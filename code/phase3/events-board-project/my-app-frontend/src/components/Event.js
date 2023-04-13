import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "./Edit";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Event() {
  //const [isDarkMode, setIsDarkMode] = useState(true);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  let url = "http://localhost:9292/events";

  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((event) => setEvents(event));
  }, []);

  function handleDelete(id) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const newEvents = events.filter((item) => item.id !== id);

        setEvents(newEvents);
      });
  }

  function handleUpdate(id) {
    navigate(`/edit/${id}`);
  }
  function assignStaff(id) {
    navigate(`/assignstaff/${id}`);
  }

  function handleClick(id) {
    navigate(`/event/${id}`);
  }

  return (
    <>
      {events &&
        events.map((item) => {
          return (
            <li className="cards__item" key={item.id}>
              <div className="card" key={item.id}>
                <>
                  {/* <img
                  key={item.id}
                  onClick={handleClick}
                  src={item.pictureUrl}
                  alt={item.name}
                  className="card__image"
                /> */}
                  <div className="card__content">
                    <div
                      className="card__title"
                      onClick={() => handleClick(item.id)}
                    >
                      {item.name}
                    </div>
                    <p className="card__text">
                      Event Date:{" "}
                      {new Date(item.event_date).toLocaleDateString("en-US")}
                    </p>

                    <p>Event Type: {item.event_type}</p>
                    <br />
                    <p>Number of Participants: {item.number_of_participants}</p>
                    {/* <p>Venue: {item.venue.name}</p> */}
                  </div>
                  <div className="card__detail">
                    <p></p>
                    <p></p>
                    <p>
                      <VisibilityIcon
                        className="visibilityIcon"
                        onClick={() => handleClick(item.id)}
                      />
                      <PeopleIcon
                        className="visibilityIcon"
                        onClick={() => assignStaff(item.id)}
                      />
                      <EditIcon
                        className="editIcon"
                        onClick={() => handleUpdate(item.id)}
                      />

                      <DeleteIcon
                        className="deleteIcon"
                        onClick={() => handleDelete(item.id)}
                      />
                    </p>
                  </div>
                </>
              </div>
            </li>
          );
        })}
    </>
  );
}

export default Event;
