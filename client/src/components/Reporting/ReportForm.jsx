import React, { useState } from 'react';
import axios from 'axios';

const ReportForm = ({ onReportSubmit }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/reports', {
        content: value,
      });
      console.log('Successfully posted report!');
      onReportSubmit(); // Notify parent component about report submission
    } catch (error) {
      console.error('Error', error);
    }
    setLoading(false);
  };

  return (
    <>
      <input type="text" value={value} onChange={handleChange} />
      <button type="button" disabled={!value} onClick={handleClick}>
        Submit
      </button>
      {loading && <p>Loading...</p>}
    </>
  );
};

export default ReportForm;
