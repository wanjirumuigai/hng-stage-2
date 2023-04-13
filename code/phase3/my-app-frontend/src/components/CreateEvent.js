import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [formData, SetFormdata] = useState({
    eventName: "",
    eventType: " ",
    noOfParticipants: "",
    status: "",
    eventDate: "",
    eventVenue: "",
  });
  const [venues, setVenues] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9292/venues")
      .then((res) => res.json())
      .then((data) => {
        setVenues(data);
      });
  }, []);

  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    event.preventDefault();
    SetFormdata({
      ...formData,
      [name]: value,
    });
    //console.log(formData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:9292/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => navigate(`/assignstaff/${data.id}`));

    //console.log(formData);
  }
  function handleClose() {
    navigate("/");
  }

  return (
    <>
      {/* {venues.map((item) => {
        return ( */}
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form onSubmit={handleSubmit}>
            <p onClick={() => handleClose()}>
              <button id="close-btn">Close X</button>
            </p>
            <div className="formbold-form-title">
              <h2 className="">Create an Event</h2>
            </div>

            <div>
              <div>
                <label className="formbold-form-label">Event Name</label>
                <input
                  type="text"
                  name="eventName"
                  onChange={handleChange}
                  value={formData.eventName}
                  className="formbold-form-input"
                  required
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
                onChange={handleChange}
                className="formbold-form-input"
                required
              />
            </div>

            <div>
              <label className="formbold-form-label">Venue</label>

              <br />

              <select
                name="eventVenue"
                onChange={handleChange}
                className="formbold-form-input"
              >
                <option value="⬇️ Select a venue ⬇️">
                  {" "}
                  -- Select a venue --{" "}
                </option>

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
                onChange={handleChange}
                className="formbold-form-input"
              >
                <option value="⬇️ Select Event Type ⬇️">
                  {" "}
                  -- Select Event Type --{" "}
                </option>
                <option value="Internal">Internal</option>
                <option value="External">External</option>
              </select>
            </div>
            <div>
              <label className="formbold-form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="formbold-form-input"
              >
                <option value="⬇️ Choose Status ⬇️">
                  {" "}
                  -- Choose Status --{" "}
                </option>
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
                onChange={handleChange}
                className="formbold-form-input"
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
