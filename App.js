import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
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
    try {
      fetchGifs();
    } catch (e) {
      console.log(e);
    }
  }, [query]);

  const renderItem = ({ item }) => (
    // <View>
    <Image
      source={{ uri: item.images.fixed_height_downsampled.url }}
      style={{ height: 100, width: 100 }}
    />
    // <Text>item.images.fixed_height_downsampled.url</Text>
  );

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchGifs();
    setIsRefreshing(false);
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.container}
    // >
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <TextInput
        value={query}
        style={styles.input}
        placeholder="Search GIPHY"
        onChangeText={(text) => setQuery(text)}
      />
      <FlatList
        numColumns={2}
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
    //   {/* </TouchableWithoutFeedback> */}
    // {/* </KeyboardAvoidingView> */}
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
    borderRadius: 3,
    borderWidth: 1,
  },
});
