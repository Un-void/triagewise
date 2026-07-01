import React from 'react';
import { Info } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/60 backdrop-blur-md border-t border-gray-200/50 z-50">
      <div className="max-w-3xl mx-auto flex items-start sm:items-center space-x-3 text-gray-500 text-xs sm:text-sm font-medium">
        <Info size={32} className="flex-shrink-0 text-gray-400 mt-0.5 sm:mt-0" />
        <p>
          <strong className="text-gray-700">Important Notice:</strong> TriageWise is not a diagnostic tool. The information provided is for educational purposes only and should not replace professional medical advice. Always consult a healthcare provider for medical decisions.
        </p>
      </div>
    </div>
  );
}
