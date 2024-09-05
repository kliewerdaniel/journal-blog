import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DonationForm from './components/DonationForm';
import './App.css';

const stripePromise = loadStripe('pk_live_51PvgftDAEcFMTkU8JNKmEN37MQhPfZmzkwTnT8NeUubLMeAwysP8vKszB8inoAIlQFSMFDwLYUtYksIU2kzSR7xG001gl1x8pg');

function App() {
  const [showDonationForm, setShowDonationForm] = useState(false);

  const toggleDonationForm = () => {
    setShowDonationForm(!showDonationForm);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MathSolve: Modern Problems, Mathematical Solutions</h1>
        <button onClick={toggleDonationForm} className="donate-button">
          {showDonationForm ? 'Close Donation' : 'Support Our Work'}
        </button>
      </header>

      {showDonationForm && (
        <Elements stripe={stripePromise}>
          <DonationForm />
        </Elements>
      )}

      <main className="App-main">
        <article className="blog-post">
          <h2>Optimizing Vaccine Distribution with Graph Theory</h2>
          <p>The COVID-19 pandemic has presented unprecedented challenges in global health, one of which is the efficient distribution of vaccines. Graph theory, a branch of mathematics, has emerged as a powerful tool in solving this complex logistical problem.</p>
          <p>By modeling vaccination centers, storage facilities, and transportation routes as nodes and edges in a graph, mathematicians can apply algorithms like the minimum spanning tree to optimize the vaccine supply chain. This approach minimizes transportation costs and ensures vaccines reach distribution points as quickly as possible.</p>
          <p>Furthermore, network flow algorithms help in determining the maximum amount of vaccines that can be distributed through the existing infrastructure, identifying bottlenecks, and suggesting improvements to the distribution network.</p>
        </article>

        <article className="blog-post">
          <h2>Combating Climate Change with Differential Equations</h2>
          <p>As the world grapples with the effects of climate change, mathematical models based on differential equations are playing a crucial role in understanding and predicting global warming trends.</p>
          <p>These equations allow scientists to model the complex interactions between various factors such as greenhouse gas emissions, ocean heat absorption, and atmospheric conditions. By solving these differential equations, researchers can create climate models that predict future temperature changes and sea level rise.</p>
          <p>Moreover, optimization techniques derived from these models are helping policymakers design more effective strategies for reducing carbon emissions and mitigating the impacts of climate change.</p>
        </article>

        <article className="blog-post">
          <h2>Enhancing Cybersecurity with Number Theory</h2>
          <p>In our increasingly digital world, cybersecurity has become a critical concern. Number theory, once considered a purely abstract field of mathematics, now forms the backbone of modern cryptography and secure communication systems.</p>
          <p>Prime factorization, the cornerstone of RSA encryption, relies on the computational difficulty of factoring large numbers. This mathematical principle ensures that sensitive data remains secure during transmission over the internet.</p>
          <p>Recent advancements in quantum computing have spurred the development of post-quantum cryptography, which leverages complex mathematical structures like lattices and elliptic curves to create encryption methods that can withstand attacks from quantum computers.</p>
        </article>
      </main>

      <footer className="App-footer">
        <p>© 2023 MathSolve. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;