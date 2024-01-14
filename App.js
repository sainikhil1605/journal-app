import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TimeLine from "./screens/TimeLine";
import Media from "./screens/Media";
import { Ionicons } from "@expo/vector-icons";
import AddJournal from "./screens/AddJournal";
import Map from "./screens/Map";
import { createStackNavigator } from "@react-navigation/stack";
import Calendar from "./screens/Calendar";
import { useEffect, useState } from "react";
import { AppProvider } from "./utils/store";
import Colors from "./constants/colors.json";
import DayModal from "./components/DayModal";
import { LogBox } from "react-native";
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default function App() {
  const theme = useColorScheme();

  LogBox.ignoreAllLogs();

  function AddJournalModal() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#333333",
            // borderTopColor: theme === "dark" ? "#000" : "#fff",
            // borderTopWidth: 1,
          },
          headerStyle: {
            backgroundColor: "#333333",
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
              <Ionicons name={"add-circle"} size={35} color={"skyblue"} />
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
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <AppProvider
        value={{
          theme,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              presentation: "modal",
              headerShown: false,
              animation: "slide_from_bottom",
            }}
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
            <Stack.Screen name="JournalDayModal" component={DayModal} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </>
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
