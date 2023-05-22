import * as React from "react";
import { View, Switch, Text } from "react-native";
import Colors from "../../constants/Colors";
import { useState } from "react";
import axios from "axios";

interface Props {
  navigation: any;
  route: any;
}

export default function ManageScreen(
  props: Props,
) {
  const { activityId, activityStatus } = props.route.params;
  const [isEnabled, setIsEnabled] = useState(false);

  const handleCloseActivity = async (activityId: string) => {
    await axios(`https://clumsy-bat-handbag.cyclic.app/activity/update_status/${activityId}`, {
      method: "POST",
      data: {

        status: "cancel",


      },
    })
      .then((response) => response)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleOpenActivity = async (activityId: string) => {
    await axios(`https://clumsy-bat-handbag.cyclic.app/activity/update_status/${activityId}`, {
      method: "POST",
      data: {

        status: "complete",


      },
    })
      .then((response) => response)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const toggleSwitch = () => {
    setIsEnabled(
      previousState => !previousState
    );
    if (activityStatus === "complete" || activityStatus === "pending") {
      handleCloseActivity(activityId);
    } else {
      handleOpenActivity(activityId);
    }
  }

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: Colors.light.tabBar,
        paddingHorizontal: 30,
        paddingVertical: 20,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontFamily: "Mitr_400Regular",
            fontSize: 20,
            color: Colors.light.black,
          }}
        >
          ปิดกิจกรรมชั่วคราว
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: Colors.light.button }}
          thumbColor={activityStatus === "complete" ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={
            activityStatus === "cancel" ? true : false
          }
        />
      </View>
    </View>
  );
}
