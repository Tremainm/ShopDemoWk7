// ProductItem
// - Purpose: Renders a single product entry in the product list, including image and action buttons.
// - Props:
//    - item: product object (expects fields like _id/id, name, price, description, image)
//    - onEdit: callback to call with the item when Edit is pressed
//    - onDelete: callback to call with item id when Delete is confirmed
// - Output: a View containing product details and Edit/Delete buttons.

import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';

export default function ProductItem({ item, onEdit, onDelete }) {
  // onDeletePress: confirm with the user before invoking the provided onDelete callback.
  const onDeletePress = () => {
    const id = item._id || item.id;
    Alert.alert(
      'Delete product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await onDelete(id);
              Alert.alert('Deleted', 'Product removed');
            } catch (err) {
              Alert.alert('Error', String(err));
            }
          },
        },
      ]
    );
  };

  // Renders product fields if present and shows action buttons.
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
        <Button title="Edit" onPress={() => onEdit(item)} />
        <Button title="Delete" color="#d9534f" onPress={onDeletePress} />
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
  itemButtons: { flexDirection: 'row', gap: 8, marginTop: 8 },
});
