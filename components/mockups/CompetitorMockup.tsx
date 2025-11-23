import React from 'react';

const CompetitorMockup: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <h1 className="text-2xl font-bold mb-6">Competitor Analysis</h1>
    <div className="bg-white rounded shadow p-6 mb-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="py-2">Competitor</th>
            <th className="py-2">Strength</th>
            <th className="py-2">Weakness</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Comp A</td>
            <td>Brand, Funding</td>
            <td>Slow innovation</td>
          </tr>
          <tr>
            <td>Comp B</td>
            <td>Tech, Speed</td>
            <td>Small team</td>
          </tr>
          <tr>
            <td>You</td>
            <td>Agility, Vision</td>
            <td>Low awareness</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="bg-slate-100 p-4 rounded">
      <div className="font-semibold mb-1">Feature Gap:</div>
      <ul className="list-disc ml-6 text-sm">
        <li>Comp A lacks AI features</li>
        <li>Comp B lacks integrations</li>
        <li>You: Add more case studies</li>
      </ul>
    </div>
  </div>
);

export default CompetitorMockup;
