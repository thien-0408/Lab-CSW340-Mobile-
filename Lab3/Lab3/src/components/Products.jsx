import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
function Products() {
  const [data, setData] = useState([]);
  const filePath = "https://dummyjson.com/products";
  useEffect(() => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network respone was not ok");
        }
        return response.json();
      })
      .then((d) => {
        setData(d.products);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, color: "#8a867c", fontWeight: "bold" }}>
        Product List
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 20 }}>
            <Card.Content style={styles.productContainer}>
              <View>
                <Image
                  source={{
                    uri: item.thumbnail,
                  }}
                  style={styles.img}
                />
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.text}>Title: {item.title}</Text>
                <Text style={styles.text}>Decription: {item.description}</Text>
                <Text style={styles.text}>Price: {item.price}</Text>
                <Text style={styles.text}>
                  Discount: {item.discountPercentage} off
                </Text>
                <Text style={styles.text}>Rating: {item.rating}</Text>
                <Text style={styles.text}>Stock: {item.stock}</Text>
                <Text style={styles.text}>Brand: {item.brand}</Text>
                <Text style={styles.text}>Category: {item.category}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                buttonColor="#2196F3"
                textColor="#ffffff"
                style={{ borderRadius: 4, marginHorizontal: 4 }}
                labelStyle={{ fontSize: 13, fontWeight: "bold" }}
              >
                Detail
              </Button>
              <Button
                mode="contained"
                buttonColor="#2196F3"
                textColor="#ffffff"
                style={{ borderRadius: 4, marginHorizontal: 4 }}
                labelStyle={{ fontSize: 13, fontWeight: "bold" }}
              >
                Add
              </Button>
              <Button
                mode="contained"
                buttonColor="#2196F3"
                textColor="#ffffff"
                style={{ borderRadius: 4, marginHorizontal: 4 }}
                labelStyle={{ fontSize: 13, fontWeight: "bold" }}
              >
                Delete
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
  },
  productContainer: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: { flexWrap: "wrap" },
  funcBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
  },
  detailContainer: {
    flex: 1,
  },
});

export default Products;
