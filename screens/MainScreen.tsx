import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  Dimensions,
  RefreshControl
} from "react-native";
import Colors from "../constants/Colors";
import ActivityBox from "../components/MainScreen/ActivityBox";
import { Button } from "react-native-paper";
import { activity } from "./model/createActivity";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityList from "../components/MainScreen/ActivityList";
import { ScrollView } from "react-native-gesture-handler";
import { authen } from "../firebase_config";
interface ActivityData {
  _id: string;
  activity_detail: string;
  activity_image: string[];
  activity_name: string;
  activity_price: number;
  activity_time: number;
  activity_type: string[];
  address: string;
  address_detail: string;
  created: string;
  district: string;
  facility_food: string[];
  facility_other: string[];
  facility_travel: string[];
  is_use_to_activity: boolean;
  latitude: number;
  longtitude: number;
  participation_limit: number;
  status: string;
  activity_rating: number;
  updated_at: string;
  engagement: number;
}
interface Props {
  navigation: any;
}

export default function MainScreen(props: Props) {
  const [userName, setUserName] = React.useState("");
  const [userImage, setUserImage] = React.useState("");

  const getProfile = async () => {
    try {
      const name = await AsyncStorage.getItem("userName");
      const image = await AsyncStorage.getItem("userImage");
      if (name !== null && image !== null) {
        setUserName(name);
        setUserImage(image);
      }
    } catch (error) {
      console.log("Error getting access token:", error);
    }
  };

  const fetchActivityData = async () => {
    try {
      const response = await fetch(
        "https://clumsy-bat-handbag.cyclic.app/activity/get_by_user_id/" +
        authen.currentUser?.uid
      );
      const data = await response.json();
      if (data.payload && data.payload.data) {
        setActivityData(data.payload.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const fetchBooking = async () => {
    try {
      const response = await fetch(
        `https://clumsy-bat-handbag.cyclic.app/booking/get_by_created_id/${authen.currentUser?.uid}`
      );
      const data = await response.json();
      if (data.payload && data.payload.data) {
        setBookingData(data.payload.data);
      }
    } catch (error) {
      console.error(error);

    }
  }

  React.useEffect(() => {
    getProfile();
  });
  const [activityData, setActivityData] = React.useState<ActivityData[]>([]);
  const [bookingData, setBookingData] = React.useState<any[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchActivityData();
    fetchBooking();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);




  React.useEffect(() => {




    fetchActivityData();
    fetchBooking();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.light.tabBar,
      }}
    >
      <ScrollView style={{ backgroundColor: Colors.light.background }} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />


      }>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: Colors.light.tabBar,
            paddingHorizontal: 30,
            paddingTop:
              Platform.OS == "android"
                ? StatusBar.currentHeight != null
                  ? StatusBar.currentHeight + 20
                  : 30
                : 10,
            paddingBottom: 30,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontFamily: "Mitr_400Regular", fontSize: 24 }}>
                ยินดีต้อนรับ!
              </Text>
              <Text
                style={{
                  fontFamily: "Mitr_400Regular",
                  fontSize: 22,
                  color: Colors.light.grey,
                }}
              >
                {authen.currentUser?.displayName}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("Setting")}
            >
              {userImage == "" ? (
                <Image
                  source={require("../assets/displayImage.png")}
                  style={{
                    height: 52,
                    width: 52,
                    resizeMode: "contain",
                    borderRadius: 26,
                  }}
                />
              ) : (
                <Image
                  source={{ uri: userImage }}
                  style={{
                    height: 52,
                    width: 52,
                    resizeMode: "cover",
                    borderRadius: 26,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>

          <ActivityList navigation={props.navigation} activityData={
            activityData
          } bookingData={
            bookingData
          } />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          position: "absolute",
          bottom: 15,
          // right: 0,
          // left: 0,
          height: 50,
          width: Dimensions.get("window").width - 70,
          backgroundColor: Colors.light.button,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          marginTop: 40,
          elevation: 3,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          marginHorizontal: 30,
        }}
        onPress={() => props.navigation.push("CreateActivity")}
      >
        <Text
          style={{
            fontFamily: "Mitr_400Regular",
            fontSize: 18,
            color: Colors.light.background,
          }}
        >
          สร้างกิจกรรมใหม่
        </Text>
      </TouchableOpacity>
    </View>
  );
}
