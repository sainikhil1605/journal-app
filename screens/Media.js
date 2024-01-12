import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/IconButton";
import Colors from "../constants/colors.json";
import { AppContext } from "../utils/store";
import { useContext } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
const Media = () => {
  const { theme } = useContext(AppContext);
  const handlePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      console.log("cancelled");
    }
  };
  const handleCamera = async () => {
    try {
      const result = await ImagePicker.launchCamera();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <IconButton
        name="images-outline"
        color="black"
        size={100}
        onPress={handlePress}
      />
      <IconButton
        name="camera-outline"
        color="black"
        size={100}
        onPress={handleCamera}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default Media;
