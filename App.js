import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { GiphyFetch } from "@giphy/js-fetch-api";

export default function App() {
  // search query
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const giphy = new GiphyFetch("1MgWwcx6vB72YYFMZw0zSTscgiW7fLk2");

  const fetchGifs = async () => {
    const res = await giphy.search(query, { limit: 5 });
    setResults(res.data);
  };

  useEffect(() => {
    fetchGifs();
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        style={styles.input}
        placeholder="Search GIPHY"
        onChange={(e) => setQuery(e.target.value)}
      />
      <ScrollView>{}</ScrollView>

      {results
        ? results.map((item) => {
            console.log(item.embed_url);
            return (
              <img
                key={item.id}
                src={item.images.fixed_height_downsampled.url}
                width={200}
                height={200}
              />
            );
          })
        : null}

      <StatusBar style="auto" />
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
