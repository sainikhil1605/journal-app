import { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AppContext } from "../utils/store";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
  reverseGeocodeAsync,
} from "expo-location";
const Map = ({ navigation }) => {
  const { theme, setLocation } = useContext(AppContext);
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
        const address = await reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        setLocation(
          address[0].name + " " + address[0].city + " " + address[0].region
        );
      }
    };
    getUserLocation();
  }, []);
  const selectLocationHandler = async (event) => {
    setUserLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
    const address = await reverseGeocodeAsync({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });

    Alert.alert(
      address[0].name + " " + address[0].city + " " + address[0].region,
      "Create a new Entry for this location?",
      [
        {
          text: "Yes",
          onPress: () => {
            setLocation(
              address[0].name + " " + address[0].city + " " + address[0].region
            );
            navigation.navigate("AddJournal");
          },
        },
        {
          text: "No",
          onPress: () => {
            setUserLocation(null);
          },
        },
      ]
    );
  };

  return (
    <MapView
      style={styles.mapView}
      userInterfaceStyle={theme}
      showsUserLocation
      showsScale
      userLocationAnnotationTitle="You are here"
      onPress={selectLocationHandler}
    >
      {userLocation?.latitude && (
        <Marker
          coordinate={{
            ...userLocation,
          }}
          title="Your Location"
        />
      )}
    </MapView>
  );
};
export default Map;
const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});
