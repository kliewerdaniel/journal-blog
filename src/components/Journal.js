import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DonationForm from './DonationForm';
import JournalEntry from './JournalEntry';

const stripePromise = loadStripe('pk_test_51PvgftDAEcFMTkU8AB9U6ti3wyTHVNaQ5AyV6kfR1X2toG6FrhVKbPrX3dZIzagRNW3v8w44583p51m1M0tVnf7b00cwx50Koc');

const Journal = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const toggleDonationForm = () => {
    setShowDonationForm(!showDonationForm);
  };

  const journalEntries = [
    {
      id: 1,
      title: "The Art of Mindfulness",
      date: "2023-05-01",
      content: "Today, I explored the practice of mindfulness and its impact on daily life...",
    },
    {
      id: 2,
      title: "Exploring Nature's Wonders",
      date: "2023-05-05",
      content: "I went on a hike through the nearby forest and was amazed by the beauty of nature...",
    },
    {
      id: 3,
      title: "The Power of Positive Thinking",
      date: "2023-05-10",
      content: "I've been focusing on cultivating a positive mindset, and the results have been remarkable...",
    },
  ];

  return (
    <div className="journal bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Awesome Journal</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className={`px-3 py-2 rounded ${activeTab === 'home' ? 'bg-blue-700' : ''}`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`px-3 py-2 rounded ${activeTab === 'about' ? 'bg-blue-700' : ''}`}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={toggleDonationForm}
                  className="bg-yellow-500 text-blue-900 px-3 py-2 rounded hover:bg-yellow-400"
                >
                 {showDonationForm ? 'Close Donation' : 'Donate to Author'}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto mt-8 p-4">
        {showDonationForm && (
          <div className="mb-8">
            <Elements stripe={stripePromise}>
              <DonationForm />
            </Elements>
          </div>
        )}
        {activeTab === 'home' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Journal Entries</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {journalEntries.map((entry) => (
                <JournalEntry key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'about' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">About This Journal</h2>
            <p className="mb-4">
              Welcome to my personal journal! This is a space where I share my thoughts, experiences, and reflections on life. 
              I believe in the power of writing to clarify thoughts, process emotions, and inspire others.
            </p>
            <p>
              Feel free to explore my entries and, if you find value in my writing, consider making a small donation to support my work.
              Your contribution helps me dedicate more time to writing and sharing my experiences with you.
            </p>
          </div>
        )}
      </main>
      <footer className="bg-gray-200 text-center p-4 mt-8">
        <p>&copy; 2023 My Awesome Journal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Journal;
