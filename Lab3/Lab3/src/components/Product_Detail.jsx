/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";

export default function Detail() {
    const [data, setData] = useState([]);
    const filePath = "https://dummyjson.com/products/2";

    useEffect(() => {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error response was not ok");
                }
                return response.json();
            })
            .then((d) => {
                setData(d);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    return (
        <Card>
            <Card.Title title="Product Detail" />
            <Card.Cover
                source={{ uri: data.thumbnail }}
                resizeMode="stretch"
            />
            <Card.Content>
                <Text style={(styles.text, styles.title)}>
                    Title: {data.title}
                </Text>
                <Text style={styles.text}>Decription: {data.description}</Text>
                <Text style={styles.text}>Price: ${data.price}</Text>
                <Text style={styles.text}>
                    Discount: {data.discountPercentage}%
                </Text>
                <Text style={styles.text}>Rating: {data.rating} stars</Text>
                <Text style={styles.text}>Stock: {data.stock} units</Text>
                <Text style={styles.text}>Brand: {data.brand}</Text>
                <Text style={styles.text}>Category: {data.category}</Text>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" buttonColor="#2196F3"
                                              textColor="#ffffff"
                                              style={{ borderRadius: 4, marginHorizontal: 4 }}
                                              labelStyle={{ fontSize: 13, fontWeight: 'bold' }}>Delete</Button>
                <Button mode="contained" buttonColor="#2196F3"
                                              textColor="#ffffff"
                                              style={{ borderRadius: 4, marginHorizontal: 4 }}
                                              labelStyle={{ fontSize: 13, fontWeight: 'bold' }}>Cancel</Button>
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    text: { flexWrap: "wrap" },
    container: {
        marginHorizontal: 15,
        flex: 1,
    },
    productPontainer: {
        marginVertical: 15,
    },
    img: {
        marginVertical: 10,
        height: 200,
        width: "100%",
        borderRadius: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: "semibold",
        color: "#526f7d",
    },
});
