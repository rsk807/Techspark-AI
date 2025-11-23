import React from 'react';

const InvestorMatchMockup: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <h1 className="text-2xl font-bold mb-6">Investor Match</h1>
    <div className="bg-white rounded shadow p-6 mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Industry</label>
        <input className="input input-bordered w-full" placeholder="e.g. SaaS, Fintech" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Stage</label>
        <input className="input input-bordered w-full" placeholder="e.g. Seed, Series A" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Geography</label>
        <input className="input input-bordered w-full" placeholder="e.g. India, US" />
      </div>
      <button className="btn btn-primary w-full">Find Investors</button>
    </div>
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Top Matches</h2>
      <ul className="list-disc ml-6 text-sm">
        <li>Accel Partners — SaaS, India</li>
        <li>Sequoia Capital — Fintech, US</li>
        <li>Blume Ventures — Early stage, India</li>
      </ul>
    </div>
  </div>
);

export default InvestorMatchMockup;
