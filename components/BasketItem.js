// BasketItem
// - Purpose: Renders a basket item with quantity controls and delete button
// - Props: item (product), quantity, onUpdateQuantity, onDelete

import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';

export default function BasketItem({ item, quantity, onUpdateQuantity, onDelete }) {
  function handleDelete() {
    const productId = item._id || item.id;
    onDelete(productId);
    Alert.alert('Removed', `${item.name || 'Product'} removed from basket.`);
  }

  function handleUpdateQuantity(newQuantity, action) {
    const productId = item._id || item.id;
    if (newQuantity < 1) {
      Alert.alert('Cannot decrease', 'Quantity cannot be less than 1.');
      return;
    }
    onUpdateQuantity(productId, newQuantity);
    Alert.alert('Updated', `${item.name || 'Product'} quantity ${action === '+' ? 'increased' : 'decreased'} to ${newQuantity}.`);
  }

  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.name || 'Unnamed'}</Text>
      {item.price !== undefined && item.price !== null && (
        <Text style={styles.itemPrice}>€{item.price}</Text>
      )}
      {item.description && <Text style={styles.itemDesc}>{item.description}</Text>}
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      )}
      <View style={styles.itemButtons}>
        <View style={styles.quantityControl}>
          <Text style={styles.quantityLabel}>Qty: {quantity}</Text>
          <Button title="+" onPress={() => handleUpdateQuantity(quantity + 1, '+')} />
          <Button title="-" color="#d9534f" onPress={() => handleUpdateQuantity(quantity - 1, '-')} />
        </View>
        <Button title="Delete" color="#d9534f" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  itemTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  itemPrice: { fontSize: 16, color: '#007AFF', marginBottom: 4 },
  itemDesc: { fontSize: 14, color: '#666', marginBottom: 8 },
  itemImage: { width: 100, height: 100, borderRadius: 8, marginVertical: 8 },
  itemButtons: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  quantityControl: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  quantityLabel: { fontSize: 14, fontWeight: '500', marginRight: 8 },
});

