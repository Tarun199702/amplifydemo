// App.js (React component)

import React, { useState } from 'react';

function Alternate() {
  const [response, setResponse] = useState('');

  // Array of endpoints to simulate multiple instances
  const endpoints = ['/instance1', '/instance2'];
  const [currentEndpointIndex, setCurrentEndpointIndex] = useState(0);

  // Function to alternate between endpoints
  const alternateEndpoint = () => {
    setCurrentEndpointIndex(prevIndex => (prevIndex + 1) % endpoints.length);
  };

  // Function to fetch data from the current endpoint
  const fetchData = () => {
    fetch(endpoints[currentEndpointIndex])
      .then(res => res.text())
      .then(data => setResponse(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Load Balancing in React</h1>
      <p>Response from server: {response}</p>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={alternateEndpoint}>Switch Endpoint</button>
    </div>
  );
}

export default  Alternate;
