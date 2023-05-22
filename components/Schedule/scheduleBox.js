import * as React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

export default function ScheduleBox({ style, item, dayIndex, daysTotal }) {
    return (
        <View style={{
            ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
            backgroundColor: Colors.light.button,
            borderRadius: 10,
            elevation: 5,
        }}>
            <Text>{item.title}</Text>

        </View>
    );
}