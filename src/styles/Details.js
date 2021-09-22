import { StyleSheet, Dimensions } from "react-native";

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
  backButton: {
    position: "absolute",
    zIndex: 2,
    margin: 16,
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
    flexDirection: "row",
    alignItems: "center",
  },
  viewIcon: {
    marginRight: 8,
  },
  viewText: {
    fontSize: 16,
    color: "#fff",
  },
});
export default styles;
