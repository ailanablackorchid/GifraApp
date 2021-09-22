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
  Dimensions,
  ScrollView,
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
      style={styles.image}
    />
  );

  const listHeaderComponent = () => {
    return (
      <View>
        <View>
          <Button title={"back"} onPress={() => navigation.goBack()} />
          <Image
            source={{ uri: item.images.fixed_height_downsampled.url }}
            style={styles.imageBig}
          />
          <View style={styles.viewInfo}>
            {/* <Image /> */}
            <Text style={styles.viewText}>no information</Text>
          </View>
        </View>
        <View style={styles.userInfo}>
          {item?.profile_url ? (
            <Image source={{ uri: item.profile_url }} style={styles.userpic} />
          ) : (
            <View style={styles.userpic}></View>
          )}
          <View style={styles.userText}>
            <Text style={styles.username}>
              {item?.username ? item.username : "Unknown"}
            </Text>
            <Text style={styles.userid}>
              {item?.display_name ? item.display_name : "@unknown"}
            </Text>
          </View>
        </View>
        <Text style={styles.relatedText}>Related GIFs</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={listHeaderComponent}
        numColumns={2}
        data={relatedResults}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderRelatedItem(item)}
        contentContainerStyle={{
          alignSelf: "center",
          alignContent: "center",
        }}
      />
    </SafeAreaView>
  );
};

const bigImage = Dimensions.get("window").width - 16;
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
  imageBig: {
    borderRadius: 24,
    height: bigImage,
    width: bigImage,
    margin: 4,
  },
  image: {
    borderRadius: 8,
    height: sizeImage,
    width: sizeImage,
    margin: 4,
  },
  userInfo: {
    flexDirection: "row",
  },
  userText: {
    margin: 8,
    flexDirection: "column",
    justifyContent: "center",
  },
  userpic: {
    width: 48,
    height: 48,
    backgroundColor: "grey",
    borderRadius: 24,
    margin: 8,
  },
  username: {
    fontSize: 18,
    color: "#fff",
  },
  userid: {
    fontSize: 12,
    color: "#fff",
  },
  relatedText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    margin: 8,
    marginTop: 24,
  },
  viewInfo: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    position: "absolute",
    bottom: 8,
    opacity: 0.4,
    backgroundColor: "black",
    borderRadius: 24,
    alignSelf: "center",
  },
  viewText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Details;
