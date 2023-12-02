import { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { AppContext } from "../utils/store";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
const Map = () => {
  const { theme } = useContext(AppContext);
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (locationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission Denied",
        "You need to grant locations permission"
      );
      return false;
    }
    return true;
  };
  const [userLocation, setUserLocation] = useState();
  useEffect(() => {
    const getUserLocation = async () => {
      const hasPermission = await verifyPermissions();
      if (hasPermission) {
        const location = await getCurrentPositionAsync();
        setUserLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      }
    };
    getUserLocation();
  }, []);

  return (
    <MapView
      style={styles.mapView}
      userInterfaceStyle={theme}
      initialRegion={
        userLocation
          ? {
              latitude: userLocation.lat,
              longitude: userLocation.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
          : undefined
      }
      showsUserLocation
      userLocationAnnotationTitle="You are here"
    />
  );
};
export default Map;
const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});
