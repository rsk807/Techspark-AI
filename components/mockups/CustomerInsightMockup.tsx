import React from 'react';

const CustomerInsightMockup: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <h1 className="text-2xl font-bold mb-6">Customer Insights</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded shadow p-4">
        <div className="font-semibold">Persona: Tech Founder</div>
        <div className="text-sm text-slate-500">ICP: SaaS, 25-40 yrs, India</div>
        <div className="mt-2 text-xs">Pain Points: Scaling, Funding, Hiring</div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <div className="font-semibold">Persona: Angel Investor</div>
        <div className="text-sm text-slate-500">ICP: Fintech, 35-55 yrs, US</div>
        <div className="mt-2 text-xs">Pain Points: Deal flow, Diligence</div>
      </div>
    </div>
    <div className="bg-slate-100 p-4 rounded">
      <div className="font-semibold mb-1">Acquisition Channels:</div>
      <ul className="list-disc ml-6 text-sm">
        <li>LinkedIn outreach</li>
        <li>Startup events</li>
        <li>Content marketing</li>
      </ul>
    </div>
  </div>
);

export default CustomerInsightMockup;
