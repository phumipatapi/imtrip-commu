import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ActivityBox, { ActivityBoxProps } from "./ActivityBox";
import Lottie from "lottie-react-native";
import { authen } from "../../firebase_config";
import Colors from "../../constants/Colors";
import { useIsFocused } from "@react-navigation/native";

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

interface ActivityListProps {
  navigation: any;
  activityData: ActivityData[];
  bookingData: any;
}



const ActivityList = ({ navigation, activityData, bookingData }: ActivityListProps) => {

  const isFocused = useIsFocused();



  const activityBoxes =
    activityData?.length > 0 ? (
      activityData.map((activity) =>
        activity._id ? (
          <ActivityBox
            key={activity._id}
            activityName={activity?.activity_name}
            activityImage={activity?.activity_image}
            viewer={activity?.engagement || 0}
            booking={
              bookingData.filter((booking: any) => booking.activity_id === activity._id
                || booking.status === "pending"
              ).length
            }
            rating={
              0

            }
            allbooking={
              bookingData.filter(
                (booking: any) => booking.activity_id === activity._id
              ).length

            }
            onPress={() =>
              navigation.push("ActivityInfo", { activityId: activity._id })
            }
          />
        ) : null
      )
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
          marginBottom: 30,
        }}
      >
        {activityData?.length === 0 ? (
          <>

            <Lottie
              source={require("../../assets/animatedIcon/loading.json")}
              autoPlay
              loop
              style={{
                width: 200,
              }}
            />

          </>
        ) : <>
          <Image
            source={require("../../assets/noData.jpg")}
            style={{
              width: 200,
              height: 200,
            }}
          />
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              color: Colors.light.black,
              fontSize: 20,
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            คุณยังไม่ได้สร้างกิจกรรม{"\n"}ลองสร้างกิจกรรมกันเถอะ!
          </Text>
        </>}
      </View>
    );

  return <View>{activityBoxes}</View>;
};

export default ActivityList;
