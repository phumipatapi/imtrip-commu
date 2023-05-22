import * as React from "react";
import { Text, View, FlatList } from "react-native";
import BookingBox from "../../components/ActivityInfo/BookingBox";
import ReviewBox from "../../components/ActivityInfo/ReviewBox";
import ChatBox from "../../components/Messages/chatBox";
import LottieWithText from "../../components/others/LottieWithText";
import Colors from "../../constants/Colors";

const chat = [
  {
    id: "123345",
    senderName: "สุชาติ",
    time: "18.06 น.",
    lastestMessage:
      "สวัสดีครับ มีกิจกรรมอะไรบ้างครับ สวัสดีครับ มีกิจกรรมอะไรบ้างครับสวัสดีครับ มีกิจกรรมอะไรบ้างครับ",
  },
  {
    id: "1233454",
    senderName: "สมหมาย",
    time: "18.10 น.",
    lastestMessage: "สวัสดีครับ มีกิจกรรมอะไรบ้างครับ",
  },
  {
    id: "123345213",
    senderName: "สุวี",
    time: "18.10 น.",
    lastestMessage: "สวัสดีครับ มีกิจกรรมอะไรบ้างครับ",
  },
];

export default function ReviewList() {
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: Colors.light.tabBar,
        // paddingHorizontal: 30,
      }}
    >
      {/* <LottieWithText
        animatedSource={require("../assets/animatedIcon/message.json")}
        lottieWidth={"60%"}
        title={"คุณยังไม่มีข้อความในขณะนี้"}
        subTitle={
          "ลองสร้างกิจกรรมที่น่าสนใจ เพื่อเพิ่มโอกาสในการรับข้อความจากนักท่องเที่ยว"
        }
      /> */}
      <FlatList
        data={chat}
        renderItem={({ item }) => (
          <ReviewBox
            senderName={item.senderName}
            time={item.time}
            lastestMessage={item.lastestMessage}
          />
        )}
        keyExtractor={(chat) => chat.id}
      />
    </View>
  );
}
