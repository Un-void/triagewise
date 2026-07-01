import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  symptomDescription: { type: String, required: true },
  severityLevel: { type: String, enum: ['Low', 'High'], required: true },
  recommendedAction: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Assessment = mongoose.model('Assessment', assessmentSchema);
