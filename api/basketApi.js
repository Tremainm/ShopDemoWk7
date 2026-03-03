// basketApi
// - Purpose: Centralized basket-related HTTP calls to the backend REST API.
// - Exports:
//    - getBasket(): GET /basket -> returns array of basket items
//    - addToBasket(item): POST /basket -> adds item to basket
//    - removeFromBasket(id): DELETE /basket/:id -> removes item from basket
//    - updateQuantity(id, qty): PUT /basket/:id -> updates item quantity
//    - clearBasket(): DELETE /basket -> clears the entire basket
// - Notes: All functions throw on non-OK responses. BASE_URL should point to backend server.

import { BASE_URL as CONFIG_BASE_URL } from '../config.example';
const BASE_URL = CONFIG_BASE_URL || 'https://nonagglomerative-hoa-monostichic.ngrok-free.dev';

// Fetch the list of basket items from the backend.
// Throws an Error if the response is not ok.
async function getBasketItems() {
  const res = await fetch(`${BASE_URL}/basket`, { 
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' }
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json();
}

// Create a basket item by POSTing the provided item (expects JSON serializable item).
// Returns parsed JSON response when available; throws on non-OK responses.
async function addToBasket(item) {
  const res = await fetch(`${BASE_URL}/basket`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
    body: JSON.stringify(item),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Server: ${res.status} ${text}`);
  }
  return res.json ? await res.json().catch(() => null) : null;
}

// Update an existing basket item by id using PUT. Body should contain the updated fields.
// Throws on non-OK responses and returns parsed JSON when available.
async function updateBasketItem(id, body) {
  const res = await fetch(`${BASE_URL}/basket/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Server: ${res.status} ${text}`);
  }
  return res.json ? await res.json().catch(() => null) : null;
}

// Delete a basket item by id. Returns true on success, throws on failure.
async function deleteBasketItem(id) {
  const res = await fetch(`${BASE_URL}/basket/${id}`, {
    method: 'DELETE',
    headers: { 'ngrok-skip-browser-warning': 'true' },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Server: ${res.status} ${text}`);
  }
  return true;
}

export default {
  getBasketItems,
  addToBasket,
  updateBasketItem,
  deleteBasketItem,
};