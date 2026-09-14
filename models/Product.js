/**
 * ============================================================================
 * FILE: Product.js
 * MODULE: Data Layer / Relational Child Document
 * PROJECT: Integrated SellSwift API (Project 9)
 * ============================================================================
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required.']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required.']
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User' 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
