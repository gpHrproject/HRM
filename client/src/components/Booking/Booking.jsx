import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { CloseOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;

const Booking = ({ onClose }) => {
  const [data, setData] = useState([]);
  const [fullName, setFullName] = useState('');
  const [dataBooking, setDataBooking] = useState([]);

  const handleDateChange = (date) => {
    console.log(date);
    const formattedDates = date.map((ele) => moment(ele.$d).format('YYYY-MM-DD HH:mm:ss'));
    setData(formattedDates);
  };

  const handlePostDate = () => {
    axios
      .post('http://localhost:3000/day-off-bookings', {
        start_date: data[0],
        end_date: data[1],
        fullName: fullName,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    const getBooking = () => {
      axios
        .get("http://localhost:3000/day-off-bookings")
        .then((res) => {
          setDataBooking(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getBooking();
  }, []);

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h3 className='booking-title'>Book a Day Off</h3>
        <button className="booking-close-icon" onClick={onClose}>
          <CloseOutlined />
        </button>
      </div>
      <form className='booking-form'>
        <label className='booking-label-name'>Full Name:</label>
        <input className='booking-label-input' type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <RangePicker className='agenda' onChange={handleDateChange} />
      </form>
      <button className='btn-booking-sub' type="button" onClick={handlePostDate}>Submit</button>
    </div>
  );
};

export default Booking;
