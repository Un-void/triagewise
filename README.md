🩺 TriageWise — AI-Powered Health Intake Assistant
Overview
TriageWise is an intelligent, web-based health intake and triage system designed to assist users in assessing symptoms, understanding severity, and determining whether professional medical attention is required.
It bridges the gap between online self-diagnosis and real clinical triage by combining AI-driven analysis with educational health guidance.
The goal is to empower NGOs and healthcare foundations to reduce unnecessary emergency visits, optimize volunteer response, and educate communities about symptom awareness and safe self-care.
Concept & AI Idea
The Problem
People often misinterpret mild symptoms after searching online, leading to panic or overcrowded emergency lines. NGOs and community health workers face challenges in triaging cases efficiently, especially in resource-limited settings.
The Solution
TriageWise uses Google’s Gemini API to dynamically interpret natural symptom descriptions and classify them into actionable categories:
Critical: Immediate medical attention required
Moderate: Monitor symptoms and follow recommended care
Mild: Safe home remedies and preventive advice
The AI model processes free-text inputs like:
“I scraped my knee falling off my bike”
“Mild tension headache from looking at screens”
It returns structured JSON data containing:
Severity level
Recommended actions
Context-aware home remedies
Warning signs to monitor
This ensures clarity, consistency, and safety in every triage decision.
Logic Flow
Step
Description
1. Emergency Bypass
Local logic instantly flags red-alert symptoms (e.g., chest pain, shortness of breath) before any API call.
2. Dynamic AI Triage
Non-critical cases are sent to Gemini 2.5 Flash via the @google/genai package, enforcing a strict JSON schema for predictable responses.
3. Data Auditing
Each intake record is stored in MongoDB Atlas for transparency, analytics, and future model improvement.

Tech Stack
Layer
Technology
Purpose
Frontend
React (Vite) + Tailwind CSS v4
Responsive UI with glassmorphism design, gradients, and micro-animations
Backend
Node.js + Express (ES Modules)
API routing, AI integration, and emergency logic
Database
MongoDB Atlas (via Mongoose)
Stores user assessments and audit logs
AI Engine
Google Gemini 2.5 Flash (@google/genai)
Real-time symptom interpretation and triage classification
Deployment
Frontend: Vercel • Backend: Render
Seamless CI/CD hosting for production-ready performance

NGO Use-Case: Jarurat Care Foundation
TriageWise aligns perfectly with the mission of NGOs like Jarurat Care Foundation that focus on community health and patient support.
Here’s how it can be applied:
Community Health Camps: Volunteers can use TriageWise to quickly assess patient symptoms and decide whether to refer them to clinics or provide home care guidance.
Remote Triage Support: Enables NGOs to offer virtual symptom assessment for rural or underserved areas.
Data-Driven Outreach: Aggregated intake data helps identify common local health issues (e.g., seasonal flu, dehydration) and plan targeted awareness campaigns.
Educational Empowerment: Provides safe, AI-curated health education to reduce misinformation and panic among the public.
Deployment Links
Vercel: TriageWise 
GitHub Repository: TriageWise_Github
Summary
TriageWise demonstrates how AI can enhance community healthcare through intelligent triage, structured data, and accessible education.
It’s not just a prototype — it’s a scalable foundation for AI-assisted humanitarian health support.


