import * as React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

interface Props {
  senderName: string;
  time: string;
  lastestMessage: string;
  onPress: () => void;
  people: number;
  image: string;
  status: string;
}

const BookingBox = (props: Props) => {
  return (
    <TouchableOpacity style={{}} onPress={props.onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderColor: Colors.light.grey,
        }}
      >
        <Image
          source={
            props.image === "" || props.image === null || props.image === undefined ? require("../../assets/displayImage.png") : { uri: props.image }
          }
          style={{
            height: 52,
            width: 52,
            resizeMode: "cover",
            borderRadius: 26,
          }}
        />
        <View
          style={{
            flexDirection: "column",
            paddingLeft: 15,
            flex: 1,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontFamily: "Mitr_600SemiBold",
                fontSize: 18,
                color: Colors.light.button,
              }}
            >
              {props.senderName}
            </Text>
            <Text
              style={{
                fontFamily: "Mitr_400Regular",
                fontSize: 12,
                color: props.status === "pending" ? Colors.light.darkGrey : Colors.light.button,
              }}
            >
              {
                props.status === "pending" ? "รอการยืนยัน" : "ยืนยันแล้ว"
              }
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 14,
              color: Colors.light.darkGrey,
              width: "100%",
            }}
          >
            จำนวนผู้เข้าร่วม: {props.people} คน
          </Text>
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 14,
              color: Colors.light.darkGrey,
              width: "100%",
            }}
          >
            {
              new Date(props.time).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })

            } {

              new Date(props.time).toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
              })
            } น.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingBox;
