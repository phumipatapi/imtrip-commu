import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import MainInsightScreen from "../screens/MainInsightScreen";
import MainPlanningScreen from "../screens/MainPlanningScreen";
import MainMessageScreen from "../screens/MainMessageScreen";
import CreateActivityScreen from "../screens/CreateActivity/CreateActivityScreen";
import CreateActivityScreen2 from "../screens/CreateActivity/CreateActivityScreen2";
import SettingScreen from "../screens/SettingScreen";
import { Button, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constants/Colors";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import CreateActivityScreen3 from "../screens/CreateActivity/CreateActivityScreen3";
import CreateActivityScreen4 from "../screens/CreateActivity/CreateActivityScreen4";
import CreateActivityScreen5 from "../screens/CreateActivity/CreateActivityScreen5";
import CreateActivityScreen6 from "../screens/CreateActivity/CreateActivityScreen6";
import CreateActivityScreen7 from "../screens/CreateActivity/CreateActivityScreen7";
import CreateActivityScreen8 from "../screens/CreateActivity/CreateActivityScreen8";
import TermAndConditionScreen from "../screens/TermAndCondition";
import ActivityInfoScreen from "../screens/ActivityInfo/ActivityInfoScreen";
import BookingDetailScreen from "../screens/BookingDetail/BookingDetailScreen";
import { activity } from "../screens/model/createActivity";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import TermAndConditionsScreen from "../screens/TermAndCondition";
import ChatScreen from "../screens/Chat/ChatScreen";
import Chat from "../screens/Chat/ChatScreen";
import MonthReportScreen from "../screens/InsightTab/MonthReportScreen";
import AboutUsScreen from "../screens/AboutScreen";

const Stack = createStackNavigator();

const AuthStackNavigator = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const tabHiddenRoutes = ["SignIn"];
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex', height: 65, } });
    }
  })

  return (
    <Stack.Navigator name="AuthStack">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Term"
        component={TermAndConditionsScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}


const MainStackNavigator = ({ navigation, route }) => {

  React.useLayoutEffect(() => {
    const tabHiddenRoutes = ["CreateActivity", "CreateActivity2", "CreateActivity3", "CreateActivity4", "CreateActivity5", "CreateActivity6", "CreateActivity7", "CreateActivity8", "TermAndCondition", "ActivityInfo", "BookingDetail", "SignIn", "AboutUs", "Chat", "MonthReport"];
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex', height: 65, } });
    }
  }, [navigation, route]);

  function clearDraftData() {
    activity[0].district = "";
    activity[0].activityType = [];
    activity[0].useToActivity = "";
    activity[0].activityName = "";
    activity[0].time = 0;
    activity[0].activityDetail = "";
    activity[0].address = "";
    activity[0].latitude = 0;
    activity[0].longitude = 0;
    activity[0].activityImage = [];
    activity[0].limit = 0;
    activity[0].price = 0;
    activity[0].addressDetail = "";
  }

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateActivity"
        component={CreateActivityScreen}
        options={({ navigation, route }) => ({

          title: "",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },

          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  clearDraftData(),
                    navigation.navigate("Home")
                }}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="CreateActivity2"
        component={CreateActivityScreen2}
        options={({ navigation, route }) => ({

          title: "",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },

          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  clearDraftData(),
                    navigation.navigate("Home")
                }}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },

        })}
      />
      <Stack.Screen
        name="CreateActivity3"
        component={CreateActivityScreen3}
        options={({ navigation, route }) => ({

          title: "",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },

          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  clearDraftData(),
                    navigation.navigate("Home")
                }}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="CreateActivity4"
        component={CreateActivityScreen4}
        options={({ navigation, route }) => ({

          title: "",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },

          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  clearDraftData(),
                    navigation.navigate("Home")
                }}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="CreateActivity5"
        component={CreateActivityScreen5}
        options={({ navigation, route }) => ({

          title: "",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },

          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  clearDraftData(),
                    navigation.navigate("Home")
                }}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="CreateActivity6"
        component={CreateActivityScreen6}
        options={({ navigation, route }) => ({

          title: "",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },

          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  clearDraftData(),
                    navigation.navigate("Home")
                }}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="CreateActivity7"
        component={CreateActivityScreen7}
        options={({ navigation, route }) => ({

          title: "",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },

          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  clearDraftData(),
                    navigation.navigate("Home")
                }}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="CreateActivity8"
        component={CreateActivityScreen8}
        options={({ navigation, route }) => ({

          title: "",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },

          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  clearDraftData(),
                    navigation.navigate("Home")
                }}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="ActivityInfo"
        component={ActivityInfoScreen}
        options={({ navigation, route }) => ({
          // headerStyle: { paddingBottom: 20 },
          title: "",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },
          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },
          headerRight: (props) => {
            return <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  paddingRight: 15,
                }}
              >
                <MaterialCommunityIcons
                  name="eye"
                  size={30}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  paddingRight: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="square-edit-outline"
                  size={30}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            </View>
          }
        })}
      />
      <Stack.Screen
        name="BookingDetail"
        component={BookingDetailScreen}
        options={({ navigation, route }) => ({
          // headerStyle: { paddingBottom: 20 },
          title: "",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },
          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },

        })}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={({ navigation, route }) => ({
          // headerStyle: { paddingBottom: 20 },
          title: "บัญชีของฉัน",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },
          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="TermCondition"
        component={TermAndConditionScreen}
        options={({ navigation, route }) => ({
          // headerStyle: { paddingBottom: 20 },
          title: "Term and Condition",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },
          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={({ navigation, route }) => ({
          // headerStyle: { paddingBottom: 20 },
          title: "เกี่ยวกับเรา",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },
          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};
const PlanningStackNavigator =  ({ navigation, route }) => {

  React.useLayoutEffect(() => {
    const tabHiddenRoutes = ["BookingDetail"];
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex', height: 65, } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ปฏิทินกิจกรรม"
        component={MainPlanningScreen}
        options={{
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },
        }}
      />
      <Stack.Screen
        name="BookingDetail"
        component={BookingDetailScreen}
        options={({ navigation, route }) => ({
          // headerStyle: { paddingBottom: 20 },
          title: "",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },
          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },

        })}
      />
    </Stack.Navigator>
  );
};

const InsightStackNavigator = ({ navigation, route }) => {

  React.useLayoutEffect(() => {
    const tabHiddenRoutes = ["MonthReport"];
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex', height: 65, } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ข้อมูลเชิงลึก"
        component={MainInsightScreen}
        options={{
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },
        }}
      />
      <Stack.Screen
        name="MonthReport"
        component={MonthReportScreen}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>

  );
};
const MessageStackNavigator = ({ navigation, route }) => {

  React.useLayoutEffect(() => {
    const tabHiddenRoutes = ["Chat"];
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex', height: 65, } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ข้อความ"
        component={MainMessageScreen}
        options={{
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={({ navigation, route }) => ({
          // headerStyle: { paddingBottom: 20 },
          title: "แชท",
          headerTitleStyle: { fontFamily: "Mitr_400Regular", fontSize: 20 },
          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  paddingLeft: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            );
          },

        })}
      />

    </Stack.Navigator>
  );
};

export {
  AuthStackNavigator,
  MainStackNavigator,
  PlanningStackNavigator,
  InsightStackNavigator,
  MessageStackNavigator,
};
