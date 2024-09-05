import React from 'react';

const JournalEntry = ({ entry }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{entry.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{entry.date}</p>
        <p className="text-gray-800">{entry.content.substring(0, 150)}...</p>
      </div>
      <div className="bg-gray-100 px-4 py-2">
        <button className="text-blue-600 hover:text-blue-800">Read more</button>
      </div>
    </div>
  );
};

export default JournalEntry;