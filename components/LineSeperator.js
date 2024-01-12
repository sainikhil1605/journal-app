import { StyleSheet, View } from "react-native";

const LineSeperator = () => {
  return <View style={styles.sepeator} />;
};
const styles = StyleSheet.create({
  sepeator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
  },
});
export default LineSeperator;
