import * as React from "react";
import { Text, View, FlatList, TouchableOpacity, Image, RefreshControl, ScrollView, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import ChatBox from "../../components/Messages/chatBox";
import LottieWithText from "../../components/others/LottieWithText";
import Colors from "../../constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import ActivityInfoTab from "../../components/ActivityInfo/Tabbar";
import Lottie from "lottie-react-native";
interface Props {
  navigation: any;
  activityId: string;
  route: any;
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
  engagement: number;
}

export default function ActivityInfoScreen(props: Props) {
  const [activityData, setActivityData] = React.useState<ActivityData[]>([]);
  const [bookingData, setBookingData] = React.useState<any[]>([]);
  const isFocused = useIsFocused();
  const { activityId } = props.route.params;
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchActivityData = async () => {
    try {
      const response = await fetch(
        "https://clumsy-bat-handbag.cyclic.app/activity/get_by_id/" +
        activityId
      );
      const data = await response.json();
      if (data.payload && data.payload.data) {
        setActivityData(data.payload.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchBooking = async () => {
    console.log();
    try {
      const response = await fetch(
        "https://clumsy-bat-handbag.cyclic.app/booking/get_by_activity_id/" +
        activityId
      );
      const data = await response.json();
      if (data.payload && data.payload.data) {
        setBookingData(data.payload.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchActivityData();
    fetchBooking();
    setTimeout(() => {
      setRefreshing(false)
    }
      , 1000);
  }, []);

  React.useEffect(() => {


    fetchActivityData();
    fetchBooking();

  }, [isFocused, props]);
  return (<ScrollView refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}

    />
  } contentContainerStyle={{
    flexGrow: 1,
    backgroundColor: Colors.light.tabBar,
  }}>

    {activityData && activityData.length > 0 ? (


      <View
        style={{
          flex: 1,

          backgroundColor: Colors.light.tabBar,
        }}
      >
        <View
          style={{
            height: Dimensions.get('window').height * 0.4,

            backgroundColor: Colors.light.black,
          }}
        >

          <ScrollView horizontal pagingEnabled style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.4, opacity: 0.6 }}>
            {activityData[0]?.activity_image?.map((item, index) => (
              <Image
                key={index}
                source={{ uri: item }}
                style={{ width: Dimensions.get('window').width, height: '100%', resizeMode: 'cover' }}
              />
            ))}
          </ScrollView>

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
                fontSize: 30,
              }}
            >
              {activityData[0].activity_name}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.light.background,
              height: "30%",
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
                  {
                    activityData[0]?.engagement || 0
                  }
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
                  {
                    bookingData.filter((booking: any) => booking.booking_status === "pending").length
                  }
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
                  0
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
                  {
                    bookingData.length
                  }
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
        </View>
        <ActivityInfoTab navigation={undefined} route={undefined} bookingData={
          bookingData
        } activityId={
          activityId
        } activityStatus={
          activityData[0]?.status
        }
        />

      </View>
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
        <Lottie
          source={require("../../assets/animatedIcon/loading.json")}
          autoPlay
          loop
          style={{
            width: 200,
          }}
        />
      </View>)}</ScrollView >
  );
}
