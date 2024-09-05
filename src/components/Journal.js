import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DonationForm from './DonationForm';

const stripePromise = loadStripe('pk_test_51PvgftDAEcFMTkU8AB9U6ti3wyTHVNaQ5AyV6kfR1X2toG6FrhVKbPrX3dZIzagRNW3v8w44583p51m1M0tVnf7b00cwx50Koc');

const Journal = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);

  const toggleDonationForm = () => {
    setShowDonationForm(!showDonationForm);
  };

  return (
    <div className="journal">
      <header>
        <h1>My Awesome Journal</h1>
        <button onClick={toggleDonationForm}>
          {showDonationForm ? 'Close Donation' : 'Donate to Author'}
        </button>
      </header>
      {showDonationForm && (
        <Elements stripe={stripePromise}>
          <DonationForm />
        </Elements>
      )}
      <main>
        <article>
          <h2>Journal Post Title</h2>
          <p>This is the content of the journal post. It's freely accessible to everyone!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </article>
      </main>
    </div>
  );
};

export default Journal;
