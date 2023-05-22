import React from "react";
import { StyleSheet, Text, View, Image, RefreshControl } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../../constants/Colors";
import { DonutChart } from "react-native-circular-chart";
import { ScrollView } from "react-native-gesture-handler";
import { authen } from "../../firebase_config";
import { db } from "../../firebase_config";
import { collection, getDocs } from "firebase/firestore";



const ActivityInsight: React.FC = ({ }) => {
  const [bookingData, setBookingData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [activityData, setActivityData] = React.useState<any[]>([]);
  const [userCount, setUserCount] = React.useState<number>(0);
  const [engagementCount, setEngagementCount] = React.useState<number>(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchBooking();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    // Fetch the user list from the Firestore "users" collection
    async function fetchUserList() {
      const usersCollectionRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);
      const usersList = usersSnapshot.docs.map((doc) => doc.data());
      setUserCount(usersList.length);

    }

    fetchUserList();
  }, []);

  const fetchActivityData = async () => {
    try {
      const response = await fetch(
        "https://clumsy-bat-handbag.cyclic.app/activity/get_by_user_id/" +
        authen.currentUser?.uid
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
    try {
      const response = await fetch(
        "https://clumsy-bat-handbag.cyclic.app/booking/get_by_created_id/" +
        authen.currentUser?.uid
      );
      const data = await response.json();
      setBookingData(data.payload.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchActivityData();

    setEngagementCount(
      activityData.filter((item) => item._id === selectedOption)[0]?.engagement || 0
    )
    console.log("a", engagementCount)
  }, []);

  const [open, setOpen] = React.useState(false);


  const data = [
    {
      label: "Option 1 Data",
      value: "option1",
      info: "This is the data for option 1.",
    },
    {
      label: "Option 2 Data",
      value: "option2",
      info: "This is the data for option 2.",
    },
    {
      label: "Option 3 Data",
      value: "option3",
      info: "This is the data for option 3.",
    },
  ];

  const [selectedOption, setSelectedOption] = React.useState(
    ""
  );

  const [items, setItems] = React.useState([]);
  const filteredData = data.filter((item) => item.value === selectedOption);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.light.tabBar,
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 30,
      }}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <DropDownPicker
          placeholder="กิจกรรม"
          placeholderStyle={{ color: Colors.light.grey }}
          textStyle={{ fontFamily: "Mitr_400Regular", fontSize: 18 }}
          open={open}
          value={selectedOption}
          items={
            activityData.length > 0
              ? activityData.map((item) => ({
                label: item.activity_name,
                value: item._id,
              }))
              : []

          }
          onChangeValue={
            (value) => {
              setSelectedOption(value);
              setEngagementCount(
                activityData.filter((item) => item._id === value)[0]?.engagement || 0
              )
            }
          }
          setOpen={setOpen}
          setValue={setSelectedOption}
          mode="SIMPLE"
          style={{
            borderColor: Colors.light.grey,
            marginTop: 10,
            padding: 15,
          }}
          listMode="SCROLLVIEW"
        />
        {/* {filteredData.length > 0 ? (
        <View>
          <Text>{filteredData[0].label}</Text>
          <Text>{filteredData[0].info}</Text>
        </View>
      ) : (
        <Text>No data available for selected option</Text>
      )} */}


        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              backgroundColor: "#EDF1D6",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 2,
                height: 4,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/insight.png")}
            />
          </View>

          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 20,
              color: Colors.light.black,
              marginLeft: 20,
            }}
          >
            {
              activityData.filter
                ((item) => item._id === selectedOption)[0]?.activity_name
            }
          </Text>
        </View>
        {activityData.filter
          ((item) => item._id === selectedOption)[0]?.engagement ?


          <View
            style={{
              alignItems: "center",
              marginTop: 10,
            }}
          >


            <View
              style={{
                alignItems: "center",
                marginTop: 40,
              }}
            >

              <DonutChart
                data={[
                  {
                    name: "คน",
                    value: activityData.filter
                      ((item) => item._id === selectedOption)[0]?.engagement,


                    color: Colors.light.lightGreen,
                  },
                  {
                    name: "คน",
                    value: userCount - engagementCount,
                    color: "#F3E9DD",
                  },
                ]}
                strokeWidth={15}
                radius={90}
                containerWidth={105 * 2}
                containerHeight={105 * 2}
                type="round"
                startAngle={0}
                endAngle={360}
                animationType="slide"
                labelValueStyle={{
                  fontFamily: "Mitr_600SemiBold",
                }}
                labelTitleStyle={{
                  fontFamily: "Mitr_400Regular",
                  fontSize: 20,
                  color: Colors.light.black,
                }}
              />
              <Text
                style={{
                  fontFamily: "Mitr_400Regular",
                  fontSize: 18,
                  color: Colors.light.black,
                  marginTop: 20,
                  textAlign: "center",
                }}
              >
                มีผู้เข้าชมรายละเอียดกิจกรรมนี้ คิดเป็น {
                  (engagementCount / userCount * 100 || 0).toFixed(2) + "%"
                }{"\n"}
                ของผู้ใช้งานทั้งหมด
              </Text>
            </View>
          </View> : (
            <View style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}>
              <Image
                source={require("../../assets/noData.jpg")}
                style={{
                  width: 200,
                  height: 200,
                }}
              />
              <Text
                style={{
                  fontFamily: "Mitr_400Regular",
                  color: Colors.light.black,
                  fontSize: 20,
                  alignSelf: "center",
                  textAlign: "center",

                }}
              >
                กิจกรรมนี้ยังไม่มีผู้เข้าชม
              </Text>
            </View>
          )}
      </ScrollView>
    </View>
  );
};

export default ActivityInsight;
