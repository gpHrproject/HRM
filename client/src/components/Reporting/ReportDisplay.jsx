import React, { useState } from 'react';
import { Tag, Modal, Input as AntdInput } from 'antd';
import axios from 'axios';

const ReportDisplay = ({ reports, onAnswer, onRefresh }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupValue, setPopupValue] = useState('');
  const [currentRecordId, setCurrentRecordId] = useState(null);

  const handlePopupOpen = (id) => {
    setCurrentRecordId(id);
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setCurrentRecordId(null);
    setPopupVisible(false);
  };

  const handleUpdate = () => {
    if (popupValue) {
      axios
        .put(`http://localhost:3000/reports/${currentRecordId}`, { answer_content: popupValue })
        .then((response) => {
          console.log('Action saved successfully!');
          onRefresh(); // Refresh the reports
        })
        .catch((error) => {
          console.error('Error saving action:', error);
        });
    }
    handlePopupClose();
    alert('Answer sent successfully!');
  };

  if (!reports) {
    return null; 
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Num</th>
            <th>My reports</th>
            <th>Submitted At</th>
            <th>Answer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.content}</td>
              <td>{report.submitted_at}</td>
              <td>
                {report.answer_content !== null ? (
                  <Tag color="green">{report.answer_content}</Tag>
                ) : (
                  <Tag color="red">pending</Tag>
                )}
              </td>
              <td>
                <button type="button" onClick={() => handlePopupOpen(report.id)}>
                  Answer it
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal title="Edit Action" visible={popupVisible} onCancel={handlePopupClose} onOk={handleUpdate}>
        <AntdInput value={popupValue} onChange={(e) => setPopupValue(e.target.value)} />
      </Modal>
    </>
  );
};

export default ReportDisplay;
