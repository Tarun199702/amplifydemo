import React, { useState } from 'react';

const LoadBalancerDemo = () => {
  const [response, setResponse] = useState('');
  const [currentServer, setCurrentServer] = useState(1);

  const simulateRequest = () => {
    // Simulate asynchronous request to backend server
    setTimeout(() => {
      // Depending on the current server, return a response
      if (currentServer === 1) {
        setResponse('Response from Server 1');
        setCurrentServer(2);
      } else if (currentServer === 2) {
        setResponse('Response from Server 2');
        setCurrentServer(3);
      } else {
        setResponse('Response from Server 3');
        setCurrentServer(1);
      }
    }, 1000); // Simulate 1 second delay for the request
  };

  return (
    <div>
      <h2>Load Balancer Demo</h2>
      <button onClick={simulateRequest}>Make Request</button>
      <p>{response}</p>
    </div>
  );
};

export default LoadBalancerDemo;
