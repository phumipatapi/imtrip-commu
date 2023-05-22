import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { Agenda, LocaleConfig } from "react-native-calendars";
import Colors from "../constants/Colors";
import LottieWithText from "../components/others/LottieWithText";
import { authen } from "../firebase_config";

interface Item {
  name: string;
  member: string;
  date: string;
  logo?: string;
  bookingId?: string;
  activityId?: string;
  bookingData?: any;
}

interface Items {
  [key: string]: Item[];
}

LocaleConfig.locales["th"] = {
  monthNames: [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ],

  monthNamesShort: [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ],
  dayNames: [
    "วันอาทิตย์",
    "วันจันทร์",
    "วันอังคาร",
    "วันพุธ",
    "วันพฤหัสบดี",
    "วันศุกร์",
    "วันเสาร์",
  ],
  dayNamesShort: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
  today: "วันนี้",
};

LocaleConfig.defaultLocale = "th";

interface Props {
  navigation: any;
}


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
  updated_at: string;
}


export default function MainPlanningScreen(props: Props) {
  const [bookingData, setBookingData] = React.useState<any[]>([]);
  const fetchBooking = async () => {
    try {
      const response = await fetch(
        "https://clumsy-bat-handbag.cyclic.app/booking/get/all"
      );
      const data = await response.json();
      setBookingData(data.payload.data);
    } catch (error) {
      console.error(error);
    }
  }
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const fetchActivityData = async () => {
    try {
      const response = await fetch(
        "https://clumsy-bat-handbag.cyclic.app/activity/get_by_user_id/" +
        authen.currentUser?.uid
      );
      const data = await response.json();
      if (data.payload.data.length > 0) {
        setActivityData(data.payload.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchActivityData();
    fetchBooking();
  }, []);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "Asia/Bangkok",
  };


  const transformedData = bookingData.reduce((acc, curr) => {
    const date = new Date(curr.booking_datetime).toISOString().split("T")[0];

    const matchingActivity = activityData.find(
      (activity) => activity._id === curr.activity_id
    );

    if (matchingActivity) {
      if (acc[date]) {
        acc[date].push({
          name: curr.booking_user_name,
          member: curr.booking_amount,
          date: curr.booking_datetime,
          activityId: curr.activity_id,
          logo: curr.booking_user_image,
          bookingId: curr._id,
          bookingData: curr,
        });
      } else {
        acc[date] = [
          {
            name: curr.booking_user_name,
            member: curr.booking_amount,
            date: curr.booking_datetime,
            activityId: curr.activity_id,
            logo: curr.booking_user_image,
            bookingId: curr._id,
            bookingData: curr,
          },
        ];
      }
    }
    return acc;
  }, {});

  const loadItems = (day: any) => { };

  const renderEmpty = () => {
    const animatedSource = require("../assets/animatedIcon/calendar.json");
    const lottieWidth = "60%";
    const title = "ยังไม่มีการจองกิจกรรมในวันนี้";
    const subTitle =
      "ยังมีเวลาเหลืออยู่ ลองสร้างกิจกรรมที่น่าสนใจเพื่อดึงดูดนักท่องเที่ยว";

    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 30,
          backgroundColor: Colors.light.background,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <LottieWithText
          animatedSource={animatedSource}
          lottieWidth={lottieWidth}
          title={title}
          subTitle={subTitle}
        />
      </View>
    );
  };
  const renderItem = (item: Item) => {
    return (
      <TouchableOpacity
        style={{
          marginRight: 10,
          marginTop: 17,
        }}
        onPress={() => {
          props.navigation.navigate("BookingDetail", {

            bookingId: item.bookingId,
            activityId: item.activityId,
            bookingData: item.bookingData,

          });
        }}
      >
        <Card style={{ backgroundColor: Colors.light.lightGreen }}>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Mitr_600SemiBold",
                    fontSize: 22,
                    color: Colors.light.background,
                    maxWidth: "80%",
                  }}
                >
                  คุณ {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "Mitr_400Regular",
                    fontSize: 16,
                    color: Colors.light.background,
                  }}
                >
                  จำนวน: {item.member} คน
                </Text>
                <Text
                  style={{
                    fontFamily: "Mitr_400Regular",
                    fontSize: 16,
                    color: Colors.light.background,
                  }}
                >
                  วันที่เข้าร่วม:{"\n"}
                  {new Date(item.date).toLocaleString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",

                  })} {new Date(item.date).toLocaleTimeString("th-TH", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  })}
                </Text>
              </View>

              <Image source={
                item.logo != null
                  ? { uri: item.logo }
                  : require("../assets/displayImage.png")

              } style={{
                height: 80,
                width: 80,
                resizeMode: "cover",
                borderRadius: 40,

              }} />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={transformedData}
        loadItemsForMonth={loadItems}
        selected={Date()}
        renderItem={renderItem}
        calendarStyle={{}}
        renderEmptyData={() => renderEmpty()}
        contentContainerStyle={{}}
        theme={{
          selectedDayBackgroundColor: Colors.light.button,
          dotColor: Colors.light.button,
          agendaTodayColor: Colors.light.button,
          textDayFontFamily: "Mitr_400Regular",
        }}
      />
    </View>
  );
}
