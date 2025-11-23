import React from 'react';

const StartupCreationMockup: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <h1 className="text-2xl font-bold mb-6">Create Your Startup</h1>
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Startup Name</label>
        <input className="input input-bordered w-full" placeholder="Enter name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Problem Statement</label>
        <textarea className="input input-bordered w-full" placeholder="Describe the problem" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Solution</label>
        <textarea className="input input-bordered w-full" placeholder="Describe your solution" />
      </div>
      <div className="flex gap-4">
        <button type="button" className="btn btn-outline">AI Autofill</button>
        <button type="submit" className="btn btn-primary">Save & Continue</button>
      </div>
    </form>
  </div>
);

export default StartupCreationMockup;
