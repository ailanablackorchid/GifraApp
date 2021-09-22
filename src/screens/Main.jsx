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
} from "react-native";
import { GiphyFetch } from "@giphy/js-fetch-api";

const Main = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [offset, setOffset] = useState(50);

  const giphy = new GiphyFetch("1MgWwcx6vB72YYFMZw0zSTscgiW7fLk2");

  const fetchGifs = async () => {
    const res = await giphy.search(query);
    setResults(res.data);
  };

  const onRefresh = () => {
    setResults([]);
    setIsRefreshing(true);
    fetchGifs();
    setIsRefreshing(false);
  };

  useEffect(() => {
    try {
      // setIsLoading(true);
      fetchGifs();
      // setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
    return () => {
      setResults([]);
    };
  }, [query]);

  const renderItem = ({ item }, navigation) => {
    setIsLoading(false);
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
    setIsLoading(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
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
      </View>
      {isLoading ? <Text>loading</Text> : null}
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
  input: {
    backgroundColor: "#17181A",
    color: "#ffffff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333435",
    margin: 8,
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
