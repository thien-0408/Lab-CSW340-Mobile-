/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";

export default function Search() {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    let filePath = "https://dummyjson.com/products";

    const searchProduct = () => {
        if (value != "")
            filePath = "https://dummyjson.com/products/search?q=" + value;
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((d) => {
                setData(d.products);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 15 }}>
                Search Products
            </Text>
            <TextInput
                value={value}
                onChangeText={(text) => setValue(text)}
                mode="outlined"
                style={{ marginVertical: 10 }}
            />
            <Button
                mode="contained"
                onPress={searchProduct}
                buttonColor="#2196F3"
                textColor="#ffffff"
                style={{ borderRadius: 4, marginHorizontal: 4,marginBottom: 10  }}
                labelStyle={{ fontSize: 13, fontWeight: 'bold' }}
            >
                Search
            </Button>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                    <Card style={styles.productPontainer}>
                        <Card.Title title="Product Detail" />
                        <Card.Cover
                            source={{
                                uri: item.thumbnail,
                            }}
                            resizeMode="stretch"
                        />
                        <Card.Content>
                            <Text style={(styles.text, styles.title)}>
                                Title: {item.title}
                            </Text>
                            <Text style={styles.text}>
                                Decription: {item.description}
                            </Text>
                            <Text style={styles.text}>
                                Price: ${item.price}
                            </Text>
                            <Text style={styles.text}>
                                Discount: {item.discountPercentage}%
                            </Text>
                            <Text style={styles.text}>
                                Rating: {item.rating} stars
                            </Text>
                            <Text style={styles.text}>
                                Stock: {item.stock} units
                            </Text>
                            <Text style={styles.text}>Brand: {item.brand}</Text>
                            <Text style={styles.text}>
                                Category: {item.category}
                            </Text>
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
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
