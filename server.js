const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Restrict CORS to specific origins (e.g., your frontend)
const corsOptions = {
  origin: 'http://localhost:3000', // Change this to your frontend URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/create-payment-intent', (req, res) => {
  const { amount } = req.body;

  // Basic validation for the amount
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    // Simulate creating a PaymentIntent
    const clientSecret = 'mock_client_secret'; // Replace with actual Stripe logic in production

    res.json({ clientSecret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
