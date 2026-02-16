import { useState } from 'react';

function SubjectCard({ subject, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://attendance-app1-3yv3.onrender.com/subjects/${subject.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onDelete(subject.id);
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  return (
    <div className="card animate-scale-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800">{subject.name}</h3>
          <p className="text-sm text-slate-500 mt-1">
            Added {new Date(subject.created_at).toLocaleDateString()}
          </p>
        </div>
        
        <button
          onClick={() => setShowConfirm(true)}
          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {showConfirm && (
        <div className="mt-4 p-4 bg-red-50 rounded-xl border-2 border-red-200 animate-slide-up">
          <p className="text-sm text-red-800 mb-3">Delete this subject and all its attendance records?</p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Delete
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 bg-white text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors border border-slate-300 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubjectCard;
