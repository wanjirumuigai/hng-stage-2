import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

function View() {
  let { id } = useParams();
  let url = "http://localhost:9292/events";
  // console.log(event.name);
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [staff, setStaff] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9292/venues")
      .then((res) => res.json())
      .then((data) => {
        setVenues(data);
      });
  }, []);

  const [formData, setFormdata] = useState({
    eventName: "",
    eventType: "",
    noOfParticipants: "",
    status: "",
    eventDate: "",
    eventVenue: "",
  });

  useEffect(() => {
    fetch(`${url}/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setFormdata({
          eventName: data.name,
          eventType: data.event_type,
          noOfParticipants: data.number_of_participants,
          status: data.status,
          eventDate: new Date(data.event_date).toISOString().split("T")[0],
          eventVenue: data.event_venue,
        });
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9292/event_staff/${id}`)
      .then((res) => res.json())
      .then((data) => setStaff(data));
  }, []);

  function handleClose() {
    navigate("/");
  }
  function handleUpdate() {
    navigate(`/edit/${id}`);
  }
  function assignStaff() {
    navigate(`/assignstaff/${id}`);
  }

  return (
    <>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form>
            <p onClick={() => handleClose()}>
              <button id="close-btn">Close X</button>
            </p>
            <p>
              <PeopleIcon
                className="visibilityIcon"
                onClick={() => assignStaff()}
              />
              <EditIcon className="editIcon" onClick={() => handleUpdate()} />
            </p>
            <div className="formbold-form-title">
              <h2 className="">{formData.eventName}</h2>
            </div>

            <div>
              <div>
                <label className="formbold-form-label">Event Name</label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  className="formbold-form-input"
                />
              </div>
            </div>

            <div>
              <label className="formbold-form-label">
                Number of Participants
              </label>
              <input
                type="text"
                name="noOfParticipants"
                value={formData.noOfParticipants}
                className="formbold-form-input"
              />
            </div>

            <div>
              <label className="formbold-form-label">Venue</label>

              <br />

              <select
                className="formbold-form-input"
                name="eventVenue"
                value={formData.eventVenue}
              >
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.name}>
                    {venue.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="formbold-form-label">Event Type</label>
              <select
                name="eventType"
                value={formData.eventType}
                className="formbold-form-input"
              >
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>
            <div>
              <label className="formbold-form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                className="formbold-form-input"
              >
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="pending">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="formbold-form-label">Event Date</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                className="formbold-form-input"
              />
            </div>
            <div class="staff-label">
              <label class="formbold-form-label">Name</label>
              <label class="formbold-form-label">Role</label>
            </div>
            {staff.map((item) => {
              return (
                // <>

                //   <input value={item.name} />
                //   <input value={item.role} />
                // </>
                <div class="formbold-input-flex">
                  <div>
                    <input
                      type="text"
                      name="assetName"
                      onChange=""
                      value={item.name}
                      class="formbold-form-input"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="serialNumber"
                      value={item.role}
                      class="formbold-form-input"
                    />
                  </div>
                </div>
              );
            })}
          </form>
        </div>
      </div>
    </>
  );
}

export default View;
