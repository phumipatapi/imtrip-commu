import * as React from "react";
import { Text, View } from "react-native";
import Colors from "../../constants/Colors";
import Lottie from "lottie-react-native";

interface Props {
  animatedSource: any;
  lottieWidth: string;
  title: string;
  subTitle: string;
}

export default function LottieWithText(props: Props) {
  props.animatedSource = "../../assets/animation/calendar.json";
  return (
    <View
      style={{
        justifyContent: "center",
        backgroundColor: Colors.light.tabBar,
        alignItems: "center",
      }}
    >
      <Lottie
        source={props.animatedSource}
        autoPlay
        loop
        style={{
          width: props.lottieWidth,
        }}
      />
      <Text
        style={{
          fontFamily: "Mitr_400Regular",
          fontSize: 20,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        {props.title}
      </Text>
      <Text
        style={{
          fontFamily: "Mitr_400Regular",
          fontSize: 16,
          color: Colors.light.grey,
          textAlign: "center",
        }}
      >
        {props.subTitle}
      </Text>
    </View>
  );
}
