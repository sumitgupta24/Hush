function UsersLoadingSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-slate-800/30 border border-slate-700/30 p-4 rounded-xl animate-pulse hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="h-3 bg-slate-700/60 rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-slate-700/40 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default UsersLoadingSkeleton;