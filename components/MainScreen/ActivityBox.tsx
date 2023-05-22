import * as React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Colors from "../../constants/Colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export interface ActivityBoxProps {
  viewer: number;
  booking: number;
  rating: number;
  allbooking: number;
  activityName: string;
  activityImage: string[];
  onPress: () => void;
}

const ActivityBox = (props: ActivityBoxProps) => {
  return (
    <TouchableOpacity
      style={{
        height: 240,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginTop: 40,
        backgroundColor: Colors.light.black,
        borderRadius: 20,
      }}
      onPress={props.onPress}
    >
      <Image
        source={
          props.activityImage[0] === "" ||
            props.activityImage[0] === null ||
            props.activityImage[0] === undefined
            ? require("../../assets/activityImg1.jpeg")
            : { uri: props.activityImage[0] }
        }
        style={{
          width: "100%",
          height: "70%",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          opacity: 0.5,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          right: 0,
          bottom: 0,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Mitr_400Regular",
            color: Colors.light.background,
            fontSize: 24,
          }}
        >
          {props.activityName}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: Colors.light.background,
          height: "30%",
          borderBottomEndRadius: 20,
          borderBottomLeftRadius: 20,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontFamily: "Kanit_700Bold",
                color: Colors.light.black,
                fontSize: 20,
              }}
            >
              {props.viewer}
            </Text>
            <Text
              style={{
                fontFamily: "Mitr_400Regular",
                color: Colors.light.grey,
                fontSize: RFPercentage(2),
              }}
            >
              ผู้เข้าดู
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontFamily: "Kanit_700Bold",
                color: Colors.light.black,
                fontSize: 20,
              }}
            >
              {props.booking}
            </Text>
            <Text
              style={{
                fontFamily: "Mitr_400Regular",
                color: Colors.light.grey,
                fontSize: RFPercentage(2),
              }}
            >
              ดำเนินการจอง
            </Text>
          </View>
          {/* <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontFamily: "Kanit_700Bold",
                color: Colors.light.black,
                fontSize: 20,
              }}
            >
              {props.rating}
            </Text>
            <Text
              style={{
                fontFamily: "Mitr_400Regular",
                color: Colors.light.grey,
                fontSize: RFPercentage(2),
              }}
            >
              เรทติ้ง
            </Text>
          </View> */}
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontFamily: "Kanit_700Bold",
                color: Colors.light.black,
                fontSize: 20,
              }}
            >
              {props.allbooking}
            </Text>
            <Text
              style={{
                fontFamily: "Mitr_400Regular",
                color: Colors.light.grey,
                fontSize: RFPercentage(2),
              }}
            >
              จองทั้งหมด
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityBox;
