import React, { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableHighlight,
} from "react-native";
import styles from "../styles/Details.js";

const TOKEN = "1MgWwcx6vB72YYFMZw0zSTscgiW7fLk2";

const Details = ({ route, navigation }) => {
  const [relatedResults, setRelatedResults] = useState([]);

  const { item } = route.params;
  const giphy = new GiphyFetch(TOKEN);

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

  const listHeaderComponent = () => (
    <View>
      <View>
        <TouchableHighlight
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={require("../img/icons/button-icon.png")} />
        </TouchableHighlight>
        <Image
          source={{ uri: item.images.fixed_height_downsampled.url }}
          style={styles.imageBig}
        />
        <View style={styles.viewInfo}>
          <Image
            source={require("../img/icons/eye-icon.png")}
            style={styles.viewIcon}
          />
          <Text style={styles.viewText}>no information</Text>
        </View>
      </View>
      <View style={styles.userInfo}>
        {item?.profile_url ? (
          <Image source={{ uri: item.profile_url }} style={styles.userpic} />
        ) : (
          <Image
            source={{ uri: item.images.fixed_height_downsampled.url }}
            style={styles.userpic}
          />
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

export default Details;
