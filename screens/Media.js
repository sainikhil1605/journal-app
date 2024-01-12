import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/IconButton";
import Colors from "../constants/colors.json";
import { AppContext } from "../utils/store";
import { useContext, useState } from "react";
import ImagePicker from "../components/ImagePicker";
import Camera from "../components/Camera";
const Media = ({ navigation }) => {
  const { theme } = useContext(AppContext);
  const [image, setImage] = useState(null);

  const onTakeImage = () => {
    navigation.navigate("AddJournal", {
      image: image,
    });
  };
  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <ImagePicker
          name="image-outline"
          setImage={setImage}
          size={55}
          style={{
            borderRightWidth: 1,
            borderRightColor: "gray",
            paddingLeft: 25,
            paddingRight: 25,
          }}
          type="Images"
          onTakeImage={onTakeImage}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <ImagePicker
          name="videocam-outline"
          color="black"
          size={55}
          style={{
            borderRightWidth: 1,
            borderRightColor: "gray",
            paddingLeft: 25,
            paddingRight: 25,
          }}
          type="Videos"
          onTakeImage={onTakeImage}
          setImage={setImage}
        />
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Camera setImage={setImage} onTakeImage={onTakeImage} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 5,
  },
});
export default Media;
