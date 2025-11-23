import React from 'react';

const StartupScoreMockup: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <h1 className="text-2xl font-bold mb-6">Startup Score</h1>
    <div className="bg-white rounded shadow p-6 mb-6">
      <div className="flex justify-between mb-4">
        <div>Strength Score</div>
        <div className="font-bold text-blue-600">82/100</div>
      </div>
      <div className="flex justify-between mb-4">
        <div>Funding Readiness</div>
        <div className="font-bold text-green-600">High</div>
      </div>
      <div className="flex justify-between mb-4">
        <div>Market Viability</div>
        <div className="font-bold text-purple-600">Medium</div>
      </div>
      <div className="flex justify-between mb-4">
        <div>Customer Fit</div>
        <div className="font-bold text-yellow-600">Good</div>
      </div>
      <div className="flex justify-between mb-4">
        <div>Innovation Index</div>
        <div className="font-bold text-pink-600">Above Avg</div>
      </div>
    </div>
    <div className="bg-slate-100 p-4 rounded">
      <div className="font-semibold mb-1">AI Explanation:</div>
      <p className="text-sm">Your startup shows strong traction and a clear problem-solution fit. Consider expanding your market research for even higher scores.</p>
    </div>
  </div>
);

export default StartupScoreMockup;
