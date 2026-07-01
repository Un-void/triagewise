import React from 'react';
import { Activity } from 'lucide-react';

export default function IntakeForm({ onSubmit, loading }) {
  const [formData, setFormData] = React.useState({
    age: '',
    gender: '',
    symptomDescription: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      age: parseInt(formData.age, 10)
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 w-full max-w-lg mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <Activity size={28} className="stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Symptom Check</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Let us know how you're feeling</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Age</label>
            <input
              type="number"
              name="age"
              min="0"
              max="120"
              required
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-medium"
              placeholder="Years"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Gender</label>
            <select
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-gray-900 font-medium appearance-none"
            >
              <option value="" disabled>Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Symptoms</label>
          <textarea
            name="symptomDescription"
            required
            value={formData.symptomDescription}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-medium resize-none"
            placeholder="Describe your symptoms in detail... (e.g., I have a bad headache and sore throat)"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-2xl transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center space-x-2"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <span>Evaluate Symptoms</span>
          )}
        </button>
      </form>
    </div>
  );
}
