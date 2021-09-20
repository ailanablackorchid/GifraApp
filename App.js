import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { GiphyFetch } from "@giphy/js-fetch-api";

export default function App() {
  // search query
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const giphy = new GiphyFetch("1MgWwcx6vB72YYFMZw0zSTscgiW7fLk2");

  const fetchGifs = async () => {
    const res = await giphy.search(query);
    setResults(res.data);
  };

  useEffect(() => {
    // try {
    //   setIsLoading(true);
    //   setTimeout(() => {
    //   fetchGifs();
    // }, 1000);
    // setIsLoading(false);
    fetchGifs();
    // } catch (e) {
    //   console.log(e.message);
    // } finally {
    // }
  }, [query]);

  const renderItem = ({ item }) => (
    <img
      key={item.id}
      src={item.images.fixed_height_downsampled.url}
      width={200}
      height={200}
    />
  );

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchGifs();
    setIsRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        style={styles.input}
        placeholder="Search GIPHY"
        onChange={(e) => setQuery(e.target.value)}
      />
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    padding: "5px 15px",
    margin: "5px 0",
    borderRadius: 3,
    borderWidth: 1,
  },
});
