import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Dimensions, RefreshControl } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../../constants/Colors";
import { DonutChart } from "react-native-circular-chart";
import { ScrollView } from "react-native-gesture-handler";
import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";
import BarChart from "@chartiful/react-native-vertical-bar-graph";
import BookingReport from "./MonthReport";
import { authen } from "../../firebase_config";

interface Props {
  navigation: any;
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
  activity_rating: number;
  updated_at: string;

}

const BookingInsight = (props: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const [bookingData, setBookingData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [activityData, setActivityData] = React.useState<ActivityData[]>([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchBooking();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const scrollToCurrentDate = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const containerWidth = Dimensions.get('window').width;
    const dayWidth = containerWidth * 0.6; // Adjust this value as needed
    const scrollOffset = (currentDay - 1) * dayWidth - containerWidth + dayWidth;
    scrollViewRef.current!.scrollToEnd({ animated: true })
  };

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

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Get the current month (0-11)
  const currentYear = currentDate.getFullYear();

  React.useEffect(() => {
    fetchBooking();
    fetchActivityData();
    scrollToCurrentDate();
  }, []);

  const [open, setOpen] = React.useState(false);



  const extractMonthsFromCreatedDates = () => {
    const months = bookingData.map((activity: any) => {
      const createdDate = new Date(activity.created);
      const month = createdDate.toLocaleString('default', { month: 'short', year: 'numeric' });
      return month;
    });

    return months;
  };

  const getBookingCountByMonth = () => {
    const bookingCountByMonth = bookingData.reduce((acc: any, activity: any) => {
      const createdDate = new Date(activity.created);
      const month = createdDate.getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    return Object.values(bookingCountByMonth);
  };

  const extractDaysFromCreatedDates = () => {
    const days = bookingData.map((activity: any) => {
      const createdDate = new Date(activity.created);
      const day = createdDate.toLocaleString('default', { day: 'numeric', month: 'short' });
      return `${day}`;
    });

    return days;


  };
  const getBookingCountYearly = () => {
    const today = new Date();
    const bookingCountByYear = bookingData.reduce((acc: any, activity: any) => {
      const createdDate = new Date(activity.created);
      const month = createdDate.getMonth();

      if (createdDate <= today) {
        acc[month] = (acc[month] || 0) + 1;
      }

      return acc;
    }, {});

    const currentMonth = today.getMonth();
    const bookingCountYearly = Array.from({ length: currentMonth + 1 }, (_, month) =>
      bookingCountByYear[month] || 0
    );

    return bookingCountYearly;
  };

  const getBookingCountDaily = (month: number, year: number) => {
    const startDate = new Date(year, month, 1);
    const currentDate = new Date(); // Get the current date
    const endDate = currentDate.getDate(); // Use today's date as the end date

    const bookingCountByDay = Array.from(
      { length: endDate },
      () => 0
    );

    bookingData.forEach((activity: any) => {
      const createdDate = new Date(activity.created);
      if (
        createdDate >= startDate &&
        createdDate <= currentDate
      ) {
        const day = createdDate.getDate() - 1;
        bookingCountByDay[day] += 1;
      }
    });


    return bookingCountByDay;
  };

  const datesInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    const today = new Date();
    const days: string[] = [];

    while (date <= today && date.getMonth() === month) {
      const formattedDate = date.toLocaleString('default', { day: 'numeric', month: 'short' });
      days.push(formattedDate);
      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  const monthsInYear = (year: number) => {
    const today = new Date();
    const months: string[] = [];

    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1);

      if (date <= today) {
        const formattedMonth = date.toLocaleString('default', { month: 'long' });
        months.push(formattedMonth);
      }
    }

    return months;
  };

  const options = [
    { label: "ทั้งหมด", value: "alltime" },
    { label: "เดือนนี้", value: "month" },
    { label: "ปีนี้", value: "year" },
  ];

  const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];
  const [selectedOption, setSelectedOption] = React.useState(options[0].value);


  useEffect(() => {


    scrollToCurrentDate();
  }, [selectedOption]);


  const renderBarChart = () => {
    let labels: string[] | undefined = [];

    if (selectedOption === 'alltime') {
      labels = extractMonthsFromCreatedDates();
    } else if (selectedOption === 'month') {
      labels = datesInMonth(
        currentMonth,
        currentYear
      )
    } else if (selectedOption === 'year') {
      labels = monthsInYear(
        currentYear
      )
    }

    const bookingCounts = getBookingCountByMonth();
    const bookingCountYearly = getBookingCountYearly();
    const bookingCountDaily = getBookingCountDaily(currentMonth, currentYear);

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={scrollViewRef} onContentSizeChange={
        () => {
          scrollToCurrentDate();
        }
      }>
        <BarChart
          data={
            selectedOption === 'year' ?
              bookingCountYearly : selectedOption === 'month' ? bookingCountDaily :
                bookingCounts
          }
          labels={labels}
          height={200}
          width={
            selectedOption === 'year' ?
              Dimensions.get('window').width * 1.5 : selectedOption === 'month' ?
                Dimensions.get('window').width * 3 :
                Dimensions.get('window').width * 1.5

          }
          barWidthPercentage={0.6}
          barColor="lightgreen"
          barRadius={10}
        />
      </ScrollView>
    );
  };

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
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}

          />
        } contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.light.tabBar,
        }}
      >
        <DropDownPicker
          placeholder="ระยะเวลา"
          placeholderStyle={{ color: Colors.light.grey }}
          textStyle={{ fontFamily: "Mitr_400Regular", fontSize: 18 }}
          open={open}
          value={selectedOption}
          items={options}
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
              source={require("../../assets/booking.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontFamily: "Mitr_400Regular",
                fontSize: 20,
                color: Colors.light.black,
                marginLeft: 20,
              }}
            >
              ยอดการจอง
            </Text>
            <Text
              style={{
                fontFamily: "Mitr_400Regular",
                fontSize: 18,
                color: Colors.light.darkGrey,
                marginLeft: 20,
              }}
            >
              {
                selectedOption === "alltime" ?
                  "ทั้งหมด"
                  :
                  selectedOption === "month" ?
                    new Date().toLocaleString('default', { month: 'long', year: 'numeric' }) :
                    selectedOption === "year" ?
                      new Date().toLocaleString(
                        'default',
                        { year: 'numeric' }
                      ) : ""

              }

            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",

            alignItems: "center",
            marginTop: 30,
            justifyContent: "center",
          }}
        >

          {renderBarChart()}
        </View>
        <BookingReport key={
          selectedOption === "alltime" ?
            "alltime" :
            selectedOption === "month" ?
              "month" :
              selectedOption === "year" ?
                "year" : ""
        } navigation={props.navigation} selectedType={selectedOption} bookingData={
          selectedOption === "alltime" ?
            bookingData.filter((activity: any) => {

              const createdDate = new Date(activity.created);
              const month = createdDate.getMonth();
              const year = createdDate.getFullYear();
              return month === currentMonth && year === currentYear;
            })
            :
            selectedOption === "month" ?
              bookingData.filter((activity: any) => {
                const createdDate = new Date(activity.created);
                const month = createdDate.getMonth();
                return month === currentMonth;
              }
              ) :
              selectedOption === "year" ?
                bookingData.filter((activity: any) => {
                  const createdDate = new Date(activity.created);
                  const year = createdDate.getFullYear();
                  return year === currentYear;
                }
                ) : []
        } />
      </ScrollView>
    </View>
  );
};

export default BookingInsight;
