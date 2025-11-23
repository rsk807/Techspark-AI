import React from 'react';

const ContentCreatorMockup: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <h1 className="text-2xl font-bold mb-6">Content AI Engine</h1>
    <div className="bg-white rounded shadow p-6 mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Content Type</label>
        <select className="input input-bordered w-full">
          <option>Tagline</option>
          <option>Website Hero Text</option>
          <option>Social Post</option>
          <option>Elevator Pitch</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Startup Details</label>
        <textarea className="input input-bordered w-full" placeholder="Describe your startup" />
      </div>
      <button className="btn btn-primary w-full">Generate Content</button>
    </div>
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Generated Content</h2>
      <div className="bg-slate-100 p-4 rounded text-sm">“Empowering founders to launch, grow, and win.”</div>
    </div>
  </div>
);

export default ContentCreatorMockup;
