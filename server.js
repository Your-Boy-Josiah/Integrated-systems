/**
 * ============================================================================
 * FILE: server.js
 * MODULE: Application Entry Point
 * PROJECT: Integrated SellSwift API (Project 9)
 * ============================================================================
 */

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB: sellswiftDB'))
  .catch((err) => {
    console.error('❌ Database connection failure:', err.message);
    process.exit(1);
  });

// Mount Integrated Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Integrated SellSwift API active on http://localhost:${PORT}`);
});
