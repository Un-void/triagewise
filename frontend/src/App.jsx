import React, { useState } from 'react';
import axios from 'axios';
import IntakeForm from './components/IntakeForm';
import TriageResult from './components/TriageResult';
import Disclaimer from './components/Disclaimer';

function App() {
  const [triageResult, setTriageResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAssess = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://triagewise-backend.onrender.com/api/triage/assess', formData);
      setTriageResult(response.data.data);
    } catch (err) {
      console.error(err);
      setError('An error occurred while evaluating your symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTriageResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-gray-50 to-white pt-12 pb-32 px-4 selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">

      {/* Decorative background blur */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-3xl mx-auto text-center mb-12 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight mb-4 pb-4">
          TriageWise
        </h1>
        <p className="text-gray-500 font-medium text-lg max-w-xl mx-auto">
          Intelligent symptom routing and home care recommendations.
        </p>
      </div>

      <div className="relative z-10 flex justify-center">
        {error && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-lg bg-red-50 text-red-600 px-4 py-3 rounded-xl border border-red-100 font-medium text-sm text-center animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        {!triageResult ? (
          <IntakeForm onSubmit={handleAssess} loading={loading} />
        ) : (
          <TriageResult result={triageResult} onReset={handleReset} />
        )}
      </div>

      <Disclaimer />
    </div>
  );
}

export default App;
