import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  View,
  FlatList,
  Image,
  TouchableHighlight,
  Text,
} from "react-native";
import { ScreenContainer } from "react-native-screens";
import { GiphyFetch } from "@giphy/js-fetch-api";

const Main = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const giphy = new GiphyFetch("1MgWwcx6vB72YYFMZw0zSTscgiW7fLk2");

  const fetchGifs = async () => {
    const res = await giphy.search(query);
    setResults(res.data);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchGifs();
    setIsRefreshing(false);
  };

  //   useEffect(() => {
  //     try {
  //       fetchGifs();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     // return () => {
  //     //   setResults([]);
  //     // };
  //   }, [query]);

  const renderItem = ({ item }, navigation) => (
    <TouchableHighlight
      onPress={() => navigation.push("Details", { item: item })}
    >
      <Image
        source={{ uri: item.images.fixed_height_downsampled.url }}
        style={{ height: 100, width: 100 }}
      />
    </TouchableHighlight>
  );

  return (
    <ScreenContainer>
      {/* <SafeAreaView> */}
      {/* <TextInput
        value={query}
        //   style={styles.input}
        placeholder="Search GIPHY"
        onChangeText={(text) => setQuery(text)}
      /> */}
      {/* 
      <FlatList
        numColumns={2}
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderItem(item, navigation)}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      /> */}
      {/* </SafeAreaView> */}
    </ScreenContainer>
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

export default Main;
