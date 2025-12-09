import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-96 animate-pulse">
          <div className="h-2 bg-slate-200 w-full"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-slate-200 rounded w-1/3"></div>
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="space-y-2 pt-4">
              <div className="h-3 bg-slate-200 rounded"></div>
              <div className="h-3 bg-slate-200 rounded"></div>
              <div className="h-3 bg-slate-200 rounded w-5/6"></div>
            </div>
            <div className="pt-8 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-16 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
