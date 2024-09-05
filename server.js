const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/create-payment-intent', (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    // Simulate creating a PaymentIntent
    const clientSecret = 'mock_client_secret_' + Math.random().toString(36).substr(2, 9);

    console.log(`Created mock PaymentIntent for amount: $${amount / 100}`);
    res.json({ clientSecret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
