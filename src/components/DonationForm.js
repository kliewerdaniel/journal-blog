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
        amount: amount * 100,
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
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-2xl font-bold mb-4">Make a Donation</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
          Donation Amount:
        </label>
        <div className="flex items-center">
          <span className="text-gray-700 mr-2">$</span>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card-element">
          Credit or debit card
        </label>
        <div className="border rounded p-3">
          <CardElement id="card-element" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Donate'}
        </button>
      </div>
      {message && <div className="mt-4 text-center text-sm">{message}</div>}
    </form>
  );
};

export default DonationForm;