import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

interface InsightData {
  month: string;
  year: number;
  income: number;
  totalBookings: number;
}

interface Props {
  navigation: any;
  selectedType: string;
  bookingData: any;

}

const BookingReport = (prop: Props) => {

  return (
    <View style={styles.container}>
      {prop.bookingData &&
        prop.bookingData
          .slice()
          .reverse()
          .map((insight: any) => (


            <TouchableOpacity
              style={styles.insight}
              key={`${insight.month}-${insight.year}`}
              onPress={() => {
                prop.navigation.navigate("MonthReport", {
                  date: insight.booking_datetime,
                  bookingData: prop.bookingData,


                });
              }}
            >
              <Text style={styles.month}>
                {
                  new Date(
                    insight.booking_datetime
                  ).toLocaleString("th-TH", {
                    month: "long",
                    year: "numeric",
                  })

                }
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.totalBookings}>{`ยอดจอง:`}</Text>
                <Text
                  style={{
                    ...styles.totalBookings,
                    color: Colors.light.button,
                  }}
                >{` ${prop.bookingData.filter(
                  (booking: any) =>
                    new Date(booking.booking_datetime).getMonth() ===
                    new Date(insight.booking_datetime).getMonth() &&
                    new Date(booking.booking_datetime).getFullYear() ===

                    new Date(insight.booking_datetime).getFullYear()
                ).length

                  }`}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.totalBookings}>{`รายได้รวม:`}</Text>
                <Text
                  style={{
                    ...styles.totalBookings,
                    color: Colors.light.button,
                  }}
                >{` ฿${prop.bookingData
                  .filter(
                    (booking: any) =>

                      new Date(booking.booking_datetime).getMonth() ===
                      new Date(insight.booking_datetime).getMonth() &&
                      new Date(booking.booking_datetime).getFullYear() ===
                      new Date(insight.booking_datetime).getFullYear()
                  )
                  .reduce(
                    (sum: number, booking: any) =>
                      sum + booking.booking_total_price,
                    0
                  )}`}</Text>


              </View>
            </TouchableOpacity>
          ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  insight: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderColor: Colors.light.lightGreen,
    borderWidth: 2,
  },
  month: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Mitr_400Regular",
  },
  year: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "Mitr_400Regular",
  },
  income: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "Mitr_400Regular",
  },
  totalBookings: {
    fontSize: 18,
    fontFamily: "Mitr_400Regular",
  },
});

export default BookingReport;
