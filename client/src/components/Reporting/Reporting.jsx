import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const Reporting = () => {
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

      console.log('successfully!');
    } catch (error) {
      console.error('Error', error);
    }
    setLoading(false);
  };

  return (
    <Form>
      <Form.Item
        label="Type your Report"
        validateStatus={value ? 'success' : 'error'}
        help={value ? undefined : 'Should have something'}
      >
        <Input.TextArea allowClear showCount value={value} onChange={handleChange} />
      </Form.Item>
      <Button type="primary" loading={loading} onClick={handleClick}>
        {loading ? 'Loading' : 'Click me!'}
      </Button>
    </Form>
  );
};

export default Reporting;
