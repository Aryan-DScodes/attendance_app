import { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('https://attendance-app1-3yv3.onrender.com/analytics');
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
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

  if (!analytics || analytics.total_subjects === 0) {
    return (
      <div className="animate-fade-in text-center py-16">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">No data yet</h3>
        <p className="text-slate-500 mb-4">Mark some attendance to see your statistics</p>
        <a href="/attendance" className="btn-primary inline-block">
          Mark Attendance
        </a>
      </div>
    );
  }

  const getOverallColor = (percentage) => {
    if (percentage >= 75) return 'from-green-500 to-emerald-600';
    if (percentage >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Analytics</h2>

      {/* Overall Stats */}
      <div className="card mb-6 border-2 border-blue-200 animate-scale-in">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Overall Attendance</h3>
        
        <div className={`bg-gradient-to-r ${getOverallColor(analytics.overall_percentage)} text-white rounded-2xl p-6 mb-4 shadow-lg`}>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">
              {analytics.overall_percentage.toFixed(1)}%
            </div>
            <p className="text-white/90">Total Attendance</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-3xl font-bold text-blue-600">{analytics.total_conducted}</p>
            <p className="text-sm text-slate-600 mt-1">Total Lectures</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-3xl font-bold text-green-600">{analytics.total_attended}</p>
            <p className="text-sm text-slate-600 mt-1">Attended</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <p className="text-3xl font-bold text-red-600">{analytics.total_absent}</p>
            <p className="text-sm text-slate-600 mt-1">Missed</p>
          </div>
        </div>
      </div>

      {/* Subject-wise Stats */}
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Subject-wise Breakdown</h3>
      <div className="space-y-4">
        {analytics.subject_stats.map((stats, index) => (
          <div
            key={stats.subject_id}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <StatsCard stats={stats} />
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="mt-6 card bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">💡 Insights</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>• Aim for at least 75% attendance in each subject</li>
          <li>• You're tracking {analytics.total_subjects} subject{analytics.total_subjects !== 1 ? 's' : ''}</li>
          {analytics.overall_percentage >= 75 ? (
            <li className="text-green-700 font-semibold">• Great job! You're meeting the attendance requirement! 🎉</li>
          ) : (
            <li className="text-orange-700 font-semibold">• Try to attend more lectures to improve your percentage</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Analytics;
