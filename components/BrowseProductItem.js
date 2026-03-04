// BrowseProductItem
// - Purpose: Renders a product in the browse screen with "Add to Basket" button
// - Props: item (product object)

import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import useBasket from '../hooks/useBasket';

export default function BrowseProductItem({ item }) {
  const { addToBasket } = useBasket();

  function handleAddToBasket() {
    const productId = item._id || item.id;
    addToBasket(productId);
    Alert.alert('Added', `${item.name || 'Product'} added to basket.`);
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
        <Button title="Add To Basket" onPress={handleAddToBasket} />
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
});
