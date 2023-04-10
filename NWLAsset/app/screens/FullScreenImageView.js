import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'


export default function FullScreenImageView({ route, navigation }) {
    const { image } = route.params;

    const handleDelete = () => {
        // deleteImage(image.id); // Remove the image from the main list
        navigation.goBack(); // Navigate back to the main screen
    };

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={handleDelete} style={{ position: 'absolute', top: 10, right: 10 }}>
                <Ionicons name="delete" size={24} color="white" />
            </TouchableOpacity>
            <Image source={{ uri: image.uri }} resizeMode="contain" style={{ flex: 1 }} />
        </View>
    );
}