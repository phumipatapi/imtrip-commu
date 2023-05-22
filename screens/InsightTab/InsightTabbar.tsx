import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as React from "react";
import { Text, View } from "react-native";
import Colors from "../../constants/Colors";
import ActivityInsight from "./ActivityInsight";
import BookingInsight from "./BookingInsight";

const Tab = createMaterialTopTabNavigator();

function InsightTab({ navigation }: { navigation: any }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontFamily: "Mitr_400Regular", fontSize: 18 },
        tabBarIndicatorStyle: {
          borderColor: Colors.light.button,
          borderWidth: 2,
        },
        tabBarActiveTintColor: Colors.light.button,
      }}
    >
      <Tab.Screen name="ภาพรวมกิจกรรม" component={ActivityInsight} />
      <Tab.Screen
        name="ภาพรวมการจอง"
        component={BookingInsight}
        initialParams={{ navigation }}
      />
    </Tab.Navigator>
  );
}

export default InsightTab;
