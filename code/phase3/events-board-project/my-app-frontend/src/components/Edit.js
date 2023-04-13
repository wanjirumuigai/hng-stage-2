import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Edit() {
  let { id } = useParams();
  let url = "http://localhost:9292/events";
  // console.log(event.name);
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
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
          eventVenue: data.venue_id,
        });
        //console.log(data);
      });
  }, []);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormdata({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit() {
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => data);
    navigate("/");
  }

  function handleClose() {
    navigate("/");
  }

  return (
    <>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form onSubmit={handleSubmit}>
            <p onClick={() => handleClose()}>
              <button id="close-btn">Close X</button>
            </p>
            <div className="formbold-form-title">
              <h2 className="">Edit an Event</h2>
            </div>

            <div>
              <div>
                <label className="formbold-form-label">Event Name</label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
}
export default Edit;
