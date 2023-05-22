import * as React from "react";
import { Text, View, FlatList } from "react-native";
import BookingBox from "../../components/ActivityInfo/BookingBox";
import ChatBox from "../../components/Messages/chatBox";
import LottieWithText from "../../components/others/LottieWithText";
import Colors from "../../constants/Colors";

interface Props {
  navigation: any;
  route: any;
}



export default function BookingList(props: Props) {
  const { bookingData } = props.route.params;

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: Colors.light.tabBar,
        // paddingHorizontal: 30,
      }}
    >

      <FlatList
        data={bookingData}
        renderItem={({ item }) => (
          <BookingBox
            senderName={item.booking_user_name}
            time={item.booking_datetime}
            lastestMessage={item.lastestMessage}
            image={item.booking_user_image}
            status={item.booking_status}
            onPress={() => props.navigation.navigate("BookingDetail",
              {
                bookingId: item._id,
                activityId: item.activity_id,
                bookingData: item,
              }
            )} people={
              item.booking_amount
            } />
        )}
        keyExtractor={(booking) => booking._id}
      />
    </View>
  );
}
