// src/CustomerForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

function CustomerForm({ addCustomer }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3001/api/customers', { name, address, contact, location });
    addCustomer(response.data);
    setName('');
    setAddress('');
    setContact('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
      <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact Information" required />
      <button type="submit">Add Customer</button>
    </form>
  );
}

export default CustomerForm;
