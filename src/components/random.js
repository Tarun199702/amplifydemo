// App.js (React component)

import React, { useState } from 'react';

function Random() {
  const [response, setResponse] = useState('');
  
  // Array of endpoints to simulate multiple instances
  const endpoints = ['/instance1', '/instance2', '/instance3'];

  // Function to fetch data from a randomly selected endpoint
  const fetchData = () => {
    const randomIndex = Math.floor(Math.random() * endpoints.length);
    const randomEndpoint = endpoints[randomIndex];

    fetch(randomEndpoint)
      .then(res => res.text())
      .then(data => setResponse(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Load Balancing in React</h1>
      <p>Response from server: {response}</p>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
}

export default Random;
