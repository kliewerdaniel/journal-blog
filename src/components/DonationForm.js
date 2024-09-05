import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const DonationForm = () => {
  const [amount, setAmount] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const response = await axios.post('http://localhost:3001/api/create-payment-intent', {
        amount: amount * 100, // Convert amount to cents for Stripe
      });

      const clientSecret = response.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
      } else {
        setMessage('Thank you for your donation!');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setMessage('An error occurred. Please try again.');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <h3>Make a Donation</h3>
      <div className="amount-selector">
        <label>
          Donation Amount: $
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
        </label>
      </div>
      <div className="card-element">
        <CardElement />
      </div>
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Donate'}
      </button>
      {message && <div className="message">{message}</div>}
    </form>
  );
};

export default DonationForm;
