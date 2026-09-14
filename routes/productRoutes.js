/**
 * ============================================================================
 * FILE: productRoutes.js
 * MODULE: API Routing / Product & Relational Controllers
 * PROJECT: Integrated SellSwift API (Project 9)
 * ============================================================================
 */

const express = require('express');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * POST /api/products
 * SECURITY: Protected. The seller ID is autonomously extracted from the JWT.
 */
router.post('/', protect, async (req, res) => {
  try {
    const { productName, price } = req.body;

    // We no longer trust the client to tell us who the seller is. 
    // We force the database to use the cryptographically verified ID from the token.
    const product = await Product.create({
      productName,
      price,
      seller: req.user._id 
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/products
 * SECURITY: Public. Retrieves all products and populates the seller data.
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).populate('seller', 'name email');
    res.status(200).json({ count: products.length, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
