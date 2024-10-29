// src/services/productService.js
import axios from 'axios';

const API_URL = 'https://api.example.com/products';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }
};

// src/components/Products/ProductList.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    getProducts();
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
