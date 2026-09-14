/**
 * ============================================================================
 * FILE: productRoutes.js
 * MODULE: API Routing / Product & Relational Controllers
 * PROJECT: Integrated SellSwift API 
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

/**
 * PUT /api/products/:id
 * SECURITY: Protected + Resource Ownership check.
 * Allows a seller to update their own product's name or price.
 */
router.put('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // RESOURCE OWNERSHIP CHECK
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Forbidden: You do not own this product.' });
    }

    product.productName = req.body.productName || product.productName;
    product.price = req.body.price || product.price;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/products/:id
 * SECURITY: Protected + Resource Ownership check.
 * Allows a seller to permanently delete their own product.
 */
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // RESOURCE OWNERSHIP CHECK
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Forbidden: You do not own this product.' });
    }

    await product.deleteOne();
    res.status(200).json({ message: 'Product successfully deleted.' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
