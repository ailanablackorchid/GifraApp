import React, { useEffect, useState } from "react";
import {
  TextInput,
  SafeAreaView,
  View,
  FlatList,
  Image,
  TouchableHighlight,
  RefreshControl,
  TouchableOpacity,
  Text,
} from "react-native";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import styles from "../styles/Main.js";

const TOKEN = "1MgWwcx6vB72YYFMZw0zSTscgiW7fLk2";
const LOADER_URL =
  "https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200_d.gif?cid=e0f3315ccwui7kfbjef9awo2ilieqy2i6a4q5zqtuvd4eb5s&rid=200_d.gif&ct=g";

const Main = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [offset, setOffset] = useState(50);

  const giphy = new GiphyFetch(TOKEN);
  const { promiseInProgress } = usePromiseTracker();

  const fetchGifs = async () => {
    const res = await giphy.search(query);
    setResults(res.data);
  };

  const onRefresh = () => {
    setResults([]);
    setIsRefreshing(true);
    fetchGifs();
    setIsRefreshing(false);
    setOffset(50);
  };

  useEffect(() => {
    try {
      trackPromise(fetchGifs());
    } catch (e) {
      console.log(e);
    }
    return () => {
      setResults([]);
    };
  }, [query]);

  const renderItem = ({ item }, navigation) => {
    return (
      <TouchableHighlight
        onPress={() => navigation.push("Details", { item: item })}
      >
        <Image
          source={{ uri: item.images.fixed_height_downsampled.url }}
          style={styles.image}
        />
      </TouchableHighlight>
    );
  };

  const onEndReached = async () => {
    const res = await giphy.search(query, { offset: offset });
    setOffset(offset + 50);
    setResults([...results, ...res.data]);
  };

  const ClearInputButton = () => (
    <TouchableOpacity style={styles.clearInput} onPress={() => setQuery("")}>
      <Image
        style={styles.clearIcon}
        source={require("../img/icons/x-circle-icon.png")}
      />
    </TouchableOpacity>
  );

  const LoadingIndicator = () =>
    promiseInProgress && (
      <Image
        source={{
          uri: LOADER_URL,
        }}
        style={styles.loaderGIF}
      />
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require("../img/icons/search-icon.png")}
          style={styles.inputIcon}
        />
        <TextInput
          value={query}
          style={styles.input}
          placeholder="Search GIPHY"
          placeholderTextColor="#989a9a"
          keyboardAppearance="dark"
          onChangeText={(text) => setQuery(text)}
        />
        {query.length ? <ClearInputButton /> : null}
      </View>
      <LoadingIndicator />
      {+!!query.length ^ +!!results.length ? (
        <Text style={styles.noMatch}>
          No results for <Text style={{ fontWeight: "bold" }}>{query}</Text>
        </Text>
      ) : null}
      <FlatList
        numColumns={2}
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderItem(item, navigation)}
        onEndReached={onEndReached}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            title="Pull to refresh"
            tintColor="#fff"
            titleColor="#fff"
          />
        }
        contentContainerStyle={{
          alignSelf: "center",
          alignContent: "center",
        }}
      />
    </SafeAreaView>
  );
};

export default Main;
