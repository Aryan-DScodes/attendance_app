import { useState } from 'react';

function AttendanceForm({ subject, date, onSubmit }) {
  const [total, setTotal] = useState('');
  const [attended, setAttended] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const totalNum = parseInt(total);
    const attendedNum = parseInt(attended);

    if (totalNum < 0 || attendedNum < 0) {
      alert('Values cannot be negative');
      return;
    }

    if (attendedNum > totalNum) {
      alert('Attended lectures cannot exceed total lectures');
      return;
    }

    setSaving(true);
    
    try {
      const response = await fetch('https://attendance-app1-3yv3.onrender.com/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject_id: subject.id,
          date: date,
          total_lectures: totalNum,
          attended_lectures: attendedNum,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        setTotal('');
        setAttended('');
        if (onSubmit) onSubmit();
      }
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Error saving attendance');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card animate-slide-up">
      <h3 className="font-semibold text-lg text-slate-800 mb-4">{subject.name}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Total Lectures Today
          </label>
          <input
            type="number"
            min="0"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="input-field"
            placeholder="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Lectures Attended
          </label>
          <input
            type="number"
            min="0"
            value={attended}
            onChange={(e) => setAttended(e.target.value)}
            className="input-field"
            placeholder="0"
            required
          />
        </div>

        {total && attended && (
          <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <p className="text-sm text-blue-800">
              Absent: <span className="font-semibold">{parseInt(total) - parseInt(attended)}</span>
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={saving || saved}
          className={`w-full ${saved ? 'bg-green-500' : 'btn-primary'} ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Attendance'}
        </button>
      </form>
    </div>
  );
}

export default AttendanceForm;
