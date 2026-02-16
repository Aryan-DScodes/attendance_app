import { useState, useEffect } from 'react';
import AttendanceForm from '../components/AttendanceForm';

function DailyAttendance() {
  const [subjects, setSubjects] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('https://attendance-app1-3yv3.onrender.com/subjects');
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Mark Attendance</h2>
        
        <div className="card">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No subjects found</h3>
          <p className="text-slate-500 mb-4">Add subjects first to mark attendance</p>
          <a href="/" className="btn-primary inline-block">
            Go to Subjects
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Enter 0 for both fields if no lectures were held for a subject today
            </p>
          </div>

          {subjects.map((subject, index) => (
            <div
              key={subject.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AttendanceForm subject={subject} date={selectedDate} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DailyAttendance;
