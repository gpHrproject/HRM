import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import './Booking.css';

const ShowBooking = () => {
  const [dataBooking, setDataBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedStatus, setEditedStatus] = useState("");
  const [editedBookingId, setEditedBookingId] = useState(null);

  const token = localStorage.getItem("token");
  let userId;
  if (token) {
    const decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
  }


  useEffect(() => {
    const getBooking = () => {
      axios
        .get("http://localhost:3000/day-off-bookings")
        .then((res) => {
          setDataBooking(res.data.data);
          console.log("dataBooking", res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    getBooking();
  }, []);


  const editStatus = (bookingId) => {
    axios.put(`http://localhost:3000/day-off-bookings/${bookingId}`, { status: editedStatus })
      .then((res) => {
        const updatedData = dataBooking.map((booking) => {
          if (booking.id === bookingId) {
            return { ...booking, status: editedStatus };
          }
          return booking;
        });
        setDataBooking(updatedData);
        setEditedBookingId(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="booking-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="Booking-table">
          <thead>
            <tr>
              <th>employee</th>
              <th>start Date</th>
              <th>end Date</th>
              <th>status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {dataBooking.map((e) => (
              <tr key={e.id}>
                <td>{e.fullName}</td>
                <td>{e.start_date}</td>
                <td>{e.end_date}</td>
                <td>
                  {e.id === editedBookingId ? (
                    <input
                      type="text"
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                    />
                  ) : (
                    e.status
                  )}
                </td>
                <td>
                  {e.id === editedBookingId ? (
                    <button onClick={() => editStatus(e.id)}>Save</button>
                  ) : (
                    <button onClick={() => setEditedBookingId(e.id)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowBooking;
