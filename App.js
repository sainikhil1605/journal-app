import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TimeLine from "./screens/TimeLine";
import Media from "./screens/Media";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="TimLine"
          component={TimeLine}
          options={{
            tabBarIcon: () => <Ionicons name="file-tray" size={24} />,
          }}
        />
        <Tab.Screen
          name="Media"
          component={Media}
          options={{
            tabBarIcon: () => <Ionicons name="sq" size={24} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
