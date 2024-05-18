// server/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://daryjoe765:3GO3vSg3Ldd8IDUG@cluster0.tkfsaqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const customerSchema = new mongoose.Schema({
  name: String,
  address: String,
  contact: String,
  location: {
    lat: Number,
    lng: Number
  }
});

const Customer = mongoose.model('Customer', customerSchema);

app.post('/api/customers', async (req, res) => {
  const { name, address, contact, location } = req.body;
  const newCustomer = new Customer({ name, address, contact, location });
  await newCustomer.save();
  res.status(201).json(newCustomer);
});

app.get('/api/customers', async (req, res) => {
  const customers = await Customer.find();
  res.status(200).json(customers);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
