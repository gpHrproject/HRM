// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Table, Tag, Modal, Input as AntdInput } from 'antd';
// import axios from 'axios';

// const ReportForm = ({ onReportSubmit }) => {
//   const [value, setValue] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };

//   const handleClick = async () => {
//     setLoading(true);
//     try {
//       await axios.post('http://localhost:3000/reports', {
//         content: value,
//       });
//       console.log('Successfully posted report!');
//       onReportSubmit(); // Notify parent component about report submission
//     } catch (error) {
//       console.error('Error', error);
//     }
//     setLoading(false);
//   };

//   return (
//     <Form>
//       <Form.Item
//         label="Type your Report"
//         validateStatus={value ? 'success' : 'error'}
//         help={value ? undefined : 'Should have something'}
//       >
//         <Input.TextArea allowClear showCount value={value} onChange={handleChange} />
//       </Form.Item>
//       <Button type="primary" loading={loading} onClick={handleClick}>
//         {loading ? 'Loading' : 'Click me!'}
//       </Button>
//     </Form>
//   );
// };

// const ReportDisplay = ({ reports, onAnswer, onRefresh }) => {
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [popupValue, setPopupValue] = useState('');
//   const [currentRecordId, setCurrentRecordId] = useState(null);

//   const handlePopupOpen = (id) => {
//     setCurrentRecordId(id);
//     setPopupVisible(true);
//   };

//   const handlePopupClose = () => {
//     setCurrentRecordId(null);
//     setPopupVisible(false);
//   };

//   const handleUpdate = () => {
//     if (popupValue) {
//       axios
//         .put(`http://localhost:3000/reports/${currentRecordId}`, { answer_content: popupValue })
//         .then((response) => {
//           console.log('Action saved successfully!');
//           onRefresh(); // Refresh the reports
//         })
//         .catch((error) => {
//           console.error('Error saving action:', error);
//         });
//     }
//     handlePopupClose();
//     alert('Answer sent successfully!');
//   };

//   const columns = [
//     {
//       title: 'Num',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'My reports',
//       dataIndex: 'content',
//       key: 'content',
//     },
//     {
//       title: 'Submitted At',
//       dataIndex: 'submitted_at',
//       key: 'submitted_at',
//     },
//     {
//       title: 'Answer',
//       dataIndex: 'answer_content',
//       key: 'answer',
//       render: (answerContent) => {
//         if (answerContent !== null) {
//           return <Tag color="green">{answerContent}</Tag>;
//         } else {
//           return <Tag color="red">pending</Tag>;
//         }
//       },
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Button type="primary" onClick={() => handlePopupOpen(record.id)}>
//           Answer it
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Table columns={columns} dataSource={reports} />

//       <Modal title="Edit Action" visible={popupVisible} onCancel={handlePopupClose} onOk={handleUpdate}>
//         <AntdInput value={popupValue} onChange={(e) => setPopupValue(e.target.value)} />
//       </Modal>
//     </>
//   );
// };

// const Reporting = () => {
//   const [reports, setReports] = useState([]);

//   const fetchReports = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/reports');
//       console.log('API response:', response.data);
//       setReports(response.data.data);
//     } catch (error) {
//       console.error('Error', error);
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const handleReportSubmit = () => {
//     fetchReports(); // Refresh the reports after submitting a new report
//   };

//   return (
//     <>
//       <ReportForm onReportSubmit={handleReportSubmit} />
//       <ReportDisplay reports={reports} onRefresh={fetchReports} />
//     </>
//   );
// };

// export default Reporting;
