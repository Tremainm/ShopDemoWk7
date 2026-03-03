// useBasket hook
// - Purpose: Encapsulates basket state and operations (add/remove/update products).
// - Key outputs (returned object):
//    - basket: array of basket items {product, quantity}
//    - loading: boolean indicating fetch/delete operations in progress
//    - posting: boolean indicating create/update in progress
//    - fetchBasket(): loads products from API and updates `basket`
//    - addToBasket(product): adds product to basket (or increments quantity)
//    - removeFromBasket(id): removes product from basket
//    - updateQuantity(id, qty): sets quantity for product
//    - clearBasket(): empties basket
// - Notes: Delegates actual HTTP calls to `api/basketApi.js` and keeps simple loading/posting flags.

import { useState } from 'react';
import productApi from '../api/productApi';
// import basketApi from '../api/basketApi';

export default function useBasket() {
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  // fetchBasketItems: fetches basket items and updates state
  // - sets loading flag while the request is in-flight
  // - on success sets `basket` to the returned array (or empty array)
  async function fetchBasketItems() {
    setLoading(true);
    try {
      const data = await basketApi.getBasketItems();
      setBasket(Array.isArray(data) ? data : []);
      return data;
    } finally {
      setLoading(false);
    }
  }

  // addToBasket: POST body to API, then refresh the list
  // - sets posting flag while request is in-flight
  async function addToBasket(item) {
    setPosting(true);
    try {
      const res = await basketApi.addToBasket(item);
      await fetchBasketItems();
      return res;
    } finally {
      setPosting(false);
    }
  }

  // updateBasketItem: PUT to API for given id, then refresh list
  // - sets posting flag while request is in-flight
  async function updateBasketItem(id, body) {
    setPosting(true);
    try {
      const res = await basketApi.updateBasketItem(id, body);
      await fetchBasketItems();
      return res;
    } finally {
      setPosting(false);
    }
  }

  // deleteBasketItem: DELETE request for id, then refresh list
  // - uses loading flag while removing and refetching
  async function deleteBasketItem(id) {
    setLoading(true);
    try {
      await basketApi.deleteBasketItem(id);
      await fetchBasketItems();
    } finally {
      setLoading(false);
    }
  }

  return {
    basket,
    loading,
    posting,
    fetchBasketItems,
    addToBasket,
    updateBasketItem,
    deleteBasketItem,
  };
}
