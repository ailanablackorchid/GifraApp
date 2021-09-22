import React, { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  StyleSheet,
  Text,
  Button,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";

const Details = ({ route, navigation }) => {
  const [relatedResults, setRelatedResults] = useState([]);

  const { item } = route.params;
  const giphy = new GiphyFetch("1MgWwcx6vB72YYFMZw0zSTscgiW7fLk2");

  const fetchRelatedGifs = async (id) => {
    const results = await giphy.related(id);
    setRelatedResults(results.data);
  };

  useEffect(() => {
    fetchRelatedGifs(item.id);
  }, []);

  const renderRelatedItem = ({ item }) => (
    <Image
      source={{ uri: item.images.fixed_height_downsampled.url }}
        style={{ height: 100, width: 100 }}
    />
  );

  return (
      <SafeAreaView>
        <Button title={"back"} onPress={() => navigation.goBack()} />
        <Image
          source={{ uri: item.images.fixed_height_downsampled.url }}
            style={{ height: 100, width: 100 }}
        />
        <Text>{item?.username}</Text>
        <FlatList
          numColumns={2}
          data={relatedResults}
          keyExtractor={(item) => item.id}
          renderItem={(item) => renderRelatedItem(item)}
        />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    borderRadius: 3,
    borderWidth: 1,
  },
});

export default Details;
