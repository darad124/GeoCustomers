// src/App.jsx

import React, { useState } from 'react';
import Map from './Map';
import CustomerForm from './CustomerForm';
import './App.css'; // Create this file for basic styles

function App() {
  const [customers, setCustomers] = useState([]);

  const addCustomer = (customer) => {
    setCustomers([...customers, customer]);
  };

  return (
    <div className="app">
      <h1>Customer Location Pinning System</h1>
      <div className="form-container">
        <CustomerForm addCustomer={addCustomer} />
      </div>
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
}

export default App;
