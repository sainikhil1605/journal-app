import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import IconButton from "./IconButton";
import Colors from "../constants/colors.json";
import { useContext } from "react";
import { AppContext } from "../utils/store";

const Camera = ({ setImage, onTakeImage, size }) => {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const { theme } = useContext(AppContext);
  const verifyPermissions = async () => {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert("Permission Denied", "You need to grant camera permission");
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  };
  return (
    <IconButton
      name="camera-outline"
      size={size || 55}
      style={{
        paddingLeft: 25,
        paddingRight: 25,
      }}
      onPress={takeImageHandler}
    />
  );
};
export default Camera;
