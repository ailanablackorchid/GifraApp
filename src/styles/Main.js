import { StyleSheet, Dimensions } from "react-native";

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
  noMatch: {
    flex: 1,
    color: "#fff",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
  },
});

export default styles;
