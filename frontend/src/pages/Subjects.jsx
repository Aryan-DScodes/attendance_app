import { useState, useEffect } from 'react';
import SubjectCard from '../components/SubjectCard';

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
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

  const handleAddSubject = async (e) => {
    e.preventDefault();
    
    if (!newSubject.trim()) return;

    try {
      const response = await fetch('https://attendance-app1-3yv3.onrender.com/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newSubject }),
      });

      if (response.ok) {
        const data = await response.json();
        setSubjects([...subjects, data]);
        setNewSubject('');
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">My Subjects</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary"
        >
          + Add Subject
        </button>
      </div>

      {showAddForm && (
        <div className="card mb-6 animate-slide-up border-2 border-blue-200">
          <form onSubmit={handleAddSubject}>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Subject Name
            </label>
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="input-field mb-4"
              placeholder="e.g., Data Structures"
              autoFocus
            />
            <div className="flex gap-3">
              <button type="submit" className="btn-primary flex-1">
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewSubject('');
                }}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {subjects.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No subjects yet</h3>
          <p className="text-slate-500">Add your first subject to start tracking attendance</p>
        </div>
      ) : (
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <div
              key={subject.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SubjectCard subject={subject} onDelete={handleDeleteSubject} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Subjects;
