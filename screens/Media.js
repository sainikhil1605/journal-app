import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import IconButton from "../components/IconButton";
import Colors from "../constants/colors.json";
import { AppContext } from "../utils/store";
import { useContext, useState } from "react";
import ImagePicker from "../components/ImagePicker";
import Camera from "../components/Camera";
import days, { month } from "../constants/days";
const Media = ({ navigation }) => {
  const { theme, journals } = useContext(AppContext);
  const [image, setImage] = useState(null);

  const onTakeImage = () => {
    navigation.navigate("AddJournal", {
      image: image,
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors[theme].background }}>
      <View style={[styles.container]}>
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
      <View style={{ flex: 1, paddingTop: 10, flexDirection: "row" }}>
        {journals.map(
          (item) =>
            item.image && (
              <Pressable
                style={{ alignItems: "flex-end" }}
                onPress={() =>
                  navigation.navigate("AddJournal", { id: item.id })
                }
              >
                <Image
                  style={{ width: 100, height: 100, zIndex: -1 }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{
                    color: "white",
                    opacity: 0.5,
                    fontWeight: "900",
                    fontSize: 30,
                    marginTop: -50,
                  }}
                >
                  {new Date(item.dateAndTime).getDate()}
                </Text>
                <Text
                  style={{
                    color: "white",
                    opacity: 0.5,
                    fontWeight: "900",
                    fontSize: 15,
                    marginTop: -5,
                  }}
                >
                  {month[new Date(item.dateAndTime).getMonth()]}{" "}
                  {new Date(item.dateAndTime).getFullYear()}
                </Text>
              </Pressable>
            )
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 5,
  },
});
export default Media;
