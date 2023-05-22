import * as React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { Rating, AirbnbRating } from "react-native-ratings";

interface Props {
  senderName: string;
  time: string;
  lastestMessage: string;
}

const ReviewBox = (props: Props) => {
  return (
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
        source={require("../../assets/icon.png")}
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
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
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
              color: Colors.light.black,
            }}
          >
            14 มีนาคม 2564
          </Text>
        </View>
        <Rating
          showRating={false}
          imageSize={15}
          readonly
          startingValue={4.5}
          style={{ marginTop: 10, alignSelf: "flex-start" }}
        />
        <Text
          numberOfLines={3}
          style={{
            fontFamily: "Mitr_400Regular",
            fontSize: 14,
            color: Colors.light.darkGrey,
            width: "100%",
            marginTop: 10,
          }}
        >
          กิจกรรมสนุกมากเลยครับ คราวหน้าไว้มาอีกแน่นอน
        </Text>
      </View>
    </View>
  );
};

export default ReviewBox;
