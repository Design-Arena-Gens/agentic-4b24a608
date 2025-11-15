'use client';

import { useState } from 'react';

interface Lead {
  company_name: string;
  contact_name: string;
  job_title: string;
  email_guess: string;
  linkedin_url: string;
  company_size: string;
  pain_points: string;
  lead_score: string;
  score_reason: string;
  personalized_message: string;
}

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [formData, setFormData] = useState<Lead>({
    company_name: '',
    contact_name: '',
    job_title: '',
    email_guess: '',
    linkedin_url: '',
    company_size: '',
    pain_points: '',
    lead_score: '',
    score_reason: '',
    personalized_message: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeads([...leads, formData]);
    setFormData({
      company_name: '',
      contact_name: '',
      job_title: '',
      email_guess: '',
      linkedin_url: '',
      company_size: '',
      pain_points: '',
      lead_score: '',
      score_reason: '',
      personalized_message: '',
    });
    setShowForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const deleteLead = (index: number) => {
    setLeads(leads.filter((_, i) => i !== index));
  };

  const getScoreColor = (score: string) => {
    const numScore = parseInt(score);
    if (numScore >= 8) return 'bg-green-100 text-green-800';
    if (numScore >= 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Lead Manager</h1>
            <p className="text-slate-600">Track and manage your sales leads</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
          >
            {showForm ? 'Cancel' : '+ Add New Lead'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">New Lead</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email_guess"
                    value={formData.email_guess}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company Size
                  </label>
                  <select
                    name="company_size"
                    value={formData.company_size}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1001+">1001+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Lead Score (1-10)
                  </label>
                  <input
                    type="number"
                    name="lead_score"
                    value={formData.lead_score}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Pain Points
                </label>
                <textarea
                  name="pain_points"
                  value={formData.pain_points}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Score Reason
                </label>
                <textarea
                  name="score_reason"
                  value={formData.score_reason}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Personalized Message
                </label>
                <textarea
                  name="personalized_message"
                  value={formData.personalized_message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {leads.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-slate-500 text-lg">No leads yet. Add your first lead to get started!</p>
            </div>
          ) : (
            leads.map((lead, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-slate-800">{lead.company_name}</h3>
                      {lead.lead_score && (
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(lead.lead_score)}`}>
                          Score: {lead.lead_score}/10
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-slate-600">
                      <p className="font-semibold">{lead.contact_name}</p>
                      {lead.job_title && <p>• {lead.job_title}</p>}
                      {lead.company_size && <p>• {lead.company_size}</p>}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteLead(index)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {lead.email_guess && (
                    <div>
                      <p className="text-sm font-medium text-slate-500">Email</p>
                      <a href={`mailto:${lead.email_guess}`} className="text-blue-600 hover:underline">
                        {lead.email_guess}
                      </a>
                    </div>
                  )}
                  {lead.linkedin_url && (
                    <div>
                      <p className="text-sm font-medium text-slate-500">LinkedIn</p>
                      <a href={lead.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        View Profile
                      </a>
                    </div>
                  )}
                </div>

                {lead.pain_points && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-slate-500 mb-1">Pain Points</p>
                    <p className="text-slate-700">{lead.pain_points}</p>
                  </div>
                )}

                {lead.score_reason && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-slate-500 mb-1">Score Reason</p>
                    <p className="text-slate-700">{lead.score_reason}</p>
                  </div>
                )}

                {lead.personalized_message && (
                  <div className="bg-blue-50 p-4 rounded-md">
                    <p className="text-sm font-medium text-blue-900 mb-1">Personalized Message</p>
                    <p className="text-slate-700">{lead.personalized_message}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
