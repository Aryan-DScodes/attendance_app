function StatsCard({ stats }) {
  const getPercentageColor = (percentage) => {
    if (percentage >= 75) return 'text-green-600 bg-green-100 border-green-300';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100 border-yellow-300';
    return 'text-red-600 bg-red-100 border-red-300';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="card animate-scale-in">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-lg text-slate-800">{stats.subject_name}</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getPercentageColor(stats.attendance_percentage)}`}>
          {stats.attendance_percentage.toFixed(1)}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor(stats.attendance_percentage)} transition-all duration-500 rounded-full`}
            style={{ width: `${stats.attendance_percentage}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-blue-50 rounded-xl">
          <p className="text-2xl font-bold text-blue-600">{stats.total_conducted}</p>
          <p className="text-xs text-slate-600 mt-1">Total</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-xl">
          <p className="text-2xl font-bold text-green-600">{stats.total_attended}</p>
          <p className="text-xs text-slate-600 mt-1">Attended</p>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-xl">
          <p className="text-2xl font-bold text-red-600">{stats.total_absent}</p>
          <p className="text-xs text-slate-600 mt-1">Absent</p>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
