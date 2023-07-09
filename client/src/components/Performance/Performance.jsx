const Performance = () => {
  const [loading, setLoading] = useState(false);

  const markAttendance = async () => {
    setLoading(true);
    try {
      await axios
      .post('/api/attendances', { date: new Date(), status: 'Present' });
      console.log('Attendance marked successfully');
    } catch (error) {
      console.error('Error marking attendance', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={markAttendance} disabled={loading}>
        {loading ? 'Marking Attendance...' : 'Mark Attendance'}
      </button>
    </div>
  );
};

export default Performance;
