import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TimeLine from "./screens/TimeLine";
import Media from "./screens/Media";
import { Ionicons } from "@expo/vector-icons";
import AddJournal from "./screens/AddJournal";
import Map from "./screens/Map";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Calendar from "./screens/Calendar";
import { useEffect, useState } from "react";
import { AppProvider } from "./utils/store";
import Colors from "./constants/colors.json";
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default function App() {
  const sysTheme = useColorScheme();
  const [theme, setTheme] = useState("dark");
  function AddJournalModal() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors[theme].background,
            borderTopColor: theme === "dark" ? "#000" : "#fff",
            borderTopWidth: 1,
          },
          headerStyle: {
            backgroundColor: Colors[theme].background,
          },
          headerTintColor: Colors[theme].color,
          tabBarIconStyle: {
            color: theme === "dark" ? "#fff" : "#000",
          },
        }}
      >
        <Tab.Screen
          name="TimeLine"
          component={TimeLine}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "layers" : "layers-outline"}
                size={24}
                color={Colors[theme].color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Media"
          component={Media}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={24}
                color={Colors[theme].color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={() => <></>}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("AddJournal");
            },
          })}
          options={{
            header: () => null,
            tabBarVisible: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "add-circle" : "add-circle-outline"}
                size={24}
                color={Colors[theme].color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "map" : "map-outline"}
                size={24}
                color={Colors[theme].color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "calendar" : "calendar-outline"}
                size={24}
                color={Colors[theme].color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <SafeAreaProvider>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <AppProvider
        value={{
          theme,
          setTheme,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ presentation: "modal", headerShown: false }}
          >
            <Stack.Screen name="Home" component={AddJournalModal} />
            <Stack.Screen
              name="AddJournal"
              component={AddJournal}
              options={({ navigation }) => ({
                headerRight: () => (
                  <Button
                    onPress={() => navigation.goBack()}
                    title="Done"
                    color="#000"
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
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
