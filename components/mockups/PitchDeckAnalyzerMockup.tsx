import React from 'react';

const PitchDeckAnalyzerMockup: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <h1 className="text-2xl font-bold mb-6">Pitch Deck Analyzer</h1>
    <div className="bg-white rounded shadow p-6 mb-6">
      <input type="file" className="mb-4" />
      <textarea className="input input-bordered w-full mb-4" placeholder="Or paste pitch text here" />
      <button className="btn btn-primary w-full">Analyze Pitch</button>
    </div>
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Results</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded">Overall Score: <span className="font-bold">85</span></div>
        <div className="bg-green-50 p-4 rounded">Clarity: <span className="font-bold">90</span></div>
        <div className="bg-yellow-50 p-4 rounded">Business Model: <span className="font-bold">80</span></div>
        <div className="bg-purple-50 p-4 rounded">Market: <span className="font-bold">75</span></div>
      </div>
      <div className="mt-4 bg-slate-100 p-4 rounded">
        <div className="font-semibold mb-1">Suggestions:</div>
        <ul className="list-disc ml-6 text-sm">
          <li>Clarify your revenue model</li>
          <li>Add more competitor analysis</li>
          <li>Highlight team experience</li>
        </ul>
      </div>
    </div>
  </div>
);

export default PitchDeckAnalyzerMockup;
