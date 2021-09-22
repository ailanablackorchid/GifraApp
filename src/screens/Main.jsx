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
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

const TOKEN = "1MgWwcx6vB72YYFMZw0zSTscgiW7fLk2";
const LOADER_URL =
  "https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200_d.gif?cid=e0f3315ccwui7kfbjef9awo2ilieqy2i6a4q5zqtuvd4eb5s&rid=200_d.gif&ct=g";

const Main = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setOffset(0);
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
    // setIsLoading(false);
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

  const handleOnChangeText = (text) => {
    setQuery(text);
  };

  const LoadingIndicator = (props) => {
    return (
      promiseInProgress && (
        <Image
          source={{
            uri: LOADER_URL,
          }}
          style={styles.loaderGIF}
        />
      )
    );
  };

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
          onChangeText={(text) => {
            handleOnChangeText(text);
          }}
        />
        {query.length ? (
          <TouchableOpacity
            style={styles.clearInput}
            onPress={() => setQuery("")}
          >
            <Image
              style={styles.clearIcon}
              source={require("../img/icons/x-circle-icon.png")}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <LoadingIndicator />
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

const sizeImage = Dimensions.get("window").width / 2 - 16;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#17181A",
    paddingLeft: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333435",
    margin: 8,
  },
  input: {
    color: "#ffffff",
    alignItems: "stretch",
    padding: 16,
    paddingLeft: 0,
    width: "85%",
    fontSize: 17,
  },
  inputIcon: {
    padding: 8,
    marginRight: 8,
  },
  loaderGIF: {
    height: sizeImage / 2,
    width: sizeImage / 2,
    borderRadius: 32,
    zIndex: 10,
    alignSelf: "center",
    flex: 1,
    position: "absolute",
    justifyContent: "center",
  },
  image: {
    borderRadius: 8,
    height: sizeImage,
    width: sizeImage,
    margin: 4,
  },
  flatList: {
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
  },
});

export default Main;
