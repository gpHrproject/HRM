import React, { useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
const { RangePicker } = DatePicker;


const Booking = () => {
  const [data, setDate] = useState([]);

  const handleDateChange = (date) => {
    console.log(date)
    const formattedDates = date.map((ele) => moment(ele.$d).format('YYYY-MM-DD HH:MM:SS'));
    setDate(formattedDates);
  };
  console.log("start", data[0]);
  console.log("end", data[1]);

  const handlePostDate = () => {
    axios
      .post('http://localhost:3000/day-off-bookings',{
        start_date: data[0],
        end_date: data[1],

      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  return (
    <div>
  <RangePicker onChange={handleDateChange} />
  <button onClick={handlePostDate}>submit</button> 
 </div>
  )
};

export default Booking;
