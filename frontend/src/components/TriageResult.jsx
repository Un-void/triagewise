import React from 'react';
import { AlertTriangle, Info, Droplets, CheckCircle2, RotateCcw } from 'lucide-react';

export default function TriageResult({ result, onReset }) {
  const isHigh = result.severityLevel === 'High';

  return (
    <div className="w-full max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {isHigh ? (
        <div className="bg-red-500 text-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(239,68,68,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-red-400 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-5">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-md">
              <AlertTriangle size={48} className="text-white" />
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight">Critical Alert</h2>
            
            <div className="bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-sm w-full">
              <p className="text-lg font-medium text-red-50">{result.recommendedAction}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <CheckCircle2 size={28} className="stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Home Care Advised</h2>
              <p className="text-emerald-600 text-sm font-semibold mt-1">Low Severity Identified</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5">
              <p className="text-gray-800 font-medium">{result.recommendedAction}</p>
            </div>

            {result.remedies?.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center">
                  <Droplets size={16} className="mr-2" />
                  Recommended Actions
                </h3>
                <ul className="space-y-2">
                  {result.remedies.map((remedy, idx) => (
                    <li key={idx} className="flex items-start bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{remedy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.redFlagsToWatch?.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center">
                  <Info size={16} className="mr-2 text-amber-500" />
                  Monitor For
                </h3>
                <ul className="space-y-2">
                  {result.redFlagsToWatch.map((flag, idx) => (
                    <li key={idx} className="flex items-start bg-amber-50/50 p-3 rounded-xl border border-amber-100/50 text-amber-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0" />
                      <span className="font-medium text-sm">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={onReset}
        className={`w-full mt-6 py-4 px-6 rounded-2xl font-semibold flex items-center justify-center space-x-2 transition-all ${
          isHigh 
            ? 'bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 active:bg-gray-100 shadow-sm'
        }`}
      >
        <RotateCcw size={18} />
        <span>Start New Assessment</span>
      </button>
    </div>
  );
}
