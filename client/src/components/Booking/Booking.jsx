import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
const { RangePicker } = DatePicker;

const Booking = () => {
  const [data, setData] = useState([]);
  const [fullName, setFullName] = useState('');
  const [dataBooking, setDataBooking] = useState([]);

  const handleDateChange = (date) => {
    console.log(date);
    const formattedDates = date.map((ele) => moment(ele.$d).format('YYYY-MM-DD HH:mm:ss'));
    setData(formattedDates);
  };

  console.log("start", data[0]);
  console.log("end", data[1]);
  console.log("name", fullName);

  const handlePostDate = () => {
    axios
      .post('http://localhost:3000/day-off-bookings', {
        start_date: data[0],
        end_date: data[1],
        fullName: '', 
        
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
    <div>
      <form>
        <label>Full Name:</label>
        <input type="text" value={fullName} onChange={(e)=>e.target.value} />
        <RangePicker onChange={handleDateChange} />
        
      </form>
      <button type="button" onClick={handlePostDate}>Submit</button>
    </div>
  );
};

export default Booking;
