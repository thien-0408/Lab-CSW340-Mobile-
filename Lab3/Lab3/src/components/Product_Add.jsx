import React, { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function Add() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [rating, setRating] = useState(0);
    const [stock, setStock] = useState(0);
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [img, setImg] = useState("");

    const handleSubmit = () => {
        fetch("https://dummyjson.com/products/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                description: description,
                price: price,
                discountPercentage: discount,
                rating: rating,
                stock: stock,
                brand: brand,
                cateogry: category,
                images: img,
            }),
        })
            .then((res) => res.json())
            .then(console.log);
        Alert.alert("Add sucessfull");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add a product</Text>
            <TextInput
                style={styles.input}
                label="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
                mode="outlined"
            />
            <TextInput
                style={styles.input}
                label="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                mode="outlined"
            />
            <TextInput
                style={styles.input}
                label="Price"
                value={price}
                onChangeText={(text) => setPrice(text)}
                mode="outlined"
            />
            <TextInput
                style={styles.input}
                label="Discount Percentage"
                value={discount}
                onChangeText={(text) => setDiscount(text)}
                mode="outlined"
            />
            <TextInput
                style={styles.input}
                label="Rating"
                value={rating}
                onChangeText={(text) => setRating(text)}
                mode="outlined"
            />
            <TextInput
                style={styles.input}
                label="Stock"
                value={stock}
                onChangeText={(text) => setStock(text)}
                mode="outlined"
            />
            <TextInput
                style={styles.input}
                label="Brand"
                value={brand}
                onChangeText={(text) => setBrand(text)}
                mode="outlined"
            />
            <TextInput
                style={styles.input}
                label="Category"
                value={category}
                onChangeText={(text) => setCategory(text)}
                mode="outlined"
            />
            <TextInput
                style={styles.input}
                label="Images"
                value={img}
                onChangeText={(text) => setImg(text)}
                mode="outlined"
            />
            <Button
                mode="contained"
          onPress={handleSubmit}
          buttonColor="#2196F3"
                                        textColor="#ffffff"
                                        style={{ borderRadius: 4, marginHorizontal: 4 }}
                                        labelStyle={{ fontSize: 13, fontWeight: 'bold' }}
            >
                Submit
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },

    input: {
        marginHorizontal: 15,
        marginBottom: 10,
    },
    container: {
        flex: 1,
    },
});
