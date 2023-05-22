import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, SafeAreaView } from "react-native";
import {
  MainStackNavigator,
  PlanningStackNavigator,
  InsightStackNavigator,
  MessageStackNavigator,
} from "./StackNavigator";
import Colors from "../constants/Colors";
import MainScreen from "../screens/MainScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home-variant-outline";
          let circleColor;
          size = 32;

          if (route.name === "HomeScreen") {
            iconName = "home-variant-outline";
            circleColor = focused ? Colors.light.button : "";
          } else if (route.name === "PlanningScreen") {
            iconName = "calendar-month-outline";
            circleColor = focused ? Colors.light.button : "";
          } else if (route.name === "InsightScreen") {
            iconName = "chart-bell-curve-cumulative";
            circleColor = focused ? Colors.light.button : "";
          } else if (route.name === "MessagesScreen") {
            iconName = "message-outline";
            circleColor = focused ? Colors.light.button : "";
          }

          return (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
              <View
                style={{
                  width: 8,
                  height: 8,
                  justifyContent: "center",
                  borderRadius: 8 / 2,
                  backgroundColor: circleColor,
                }}
              ></View>
            </View>
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.light.background,
          height: 65,
        },
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={MainStackNavigator}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="PlanningScreen"
        component={PlanningStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="InsightScreen"
        component={InsightStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MessagesScreen"
        component={MessageStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
