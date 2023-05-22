import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
  Alert,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";
import { activity } from "../model/createActivity";

interface Props {
  navigation: any;
  route: any;
}

interface Place {
  place_id: string;
  formatted: string;
  lat: number;
  lon: number;
}

export default function CreateActivityScreen6(prop: Props) {
  const [people, setPeople] = useState(activity[0].limit.toString());

  const handleTextChange = (input: string) => {
    // Only allow numeric input
    const numericInput = input.replace(/[^0-9]/g, "");
    setPeople(numericInput);
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.light.background }}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: Colors.light.tabBar,
            paddingHorizontal: 30,
            paddingTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 24,
              color: Colors.light.black,
            }}
          >
            จำนวนผู้เข้าร่วมกิจกรรม
          </Text>
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              color: Colors.light.darkGrey,
            }}
          >
            กำหนดจำนวนผู้เข้าร่วมกิจกรรมของคุณ
          </Text>
          <View
            style={{
              marginTop: 20,
              borderBottomColor: Colors.light.grey,
              borderBottomWidth: 1,
            }}
          />

          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 20,
              color: Colors.light.black,
              marginTop: 20,
            }}
          >
            ผู้เข้าร่วมกิจกรรมสูงสุดต่อกลุ่ม
          </Text>
          <TextInput
            style={{
              borderColor: Colors.light.grey,
              borderWidth: 1,
              borderRadius: 10,
              padding: 15,
              marginTop: 10,
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
            }}
            keyboardType="numeric"
            value={people}
            onChangeText={handleTextChange}
            placeholder="จำนวนผู้เข้าร่วม"
          />
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              color: Colors.light.darkGrey,
              marginTop: 10,
            }}
          >
            จำนวนผู้เข้าร่วมสามารถแก้ไขได้ภายหลัง
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                borderColor: Colors.light.button,
                borderWidth: 1,
                width: 90,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
              onPress={() => {
                activity[0].limit = people;
                prop.navigation.goBack();
              }}
            >
              <Text
                style={{
                  fontFamily: "Mitr_400Regular",
                  fontSize: 20,
                  color: Colors.light.button,
                }}
              >
                ย้อนกลับ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={people == "" ? true : false}
              onPress={() => {
                activity[0].limit = people;
                prop.navigation.push("CreateActivity7");
              }}
              style={{
                backgroundColor:
                  people == "" ? Colors.light.grey : Colors.light.button,
                width: 90,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "Mitr_400Regular",
                  fontSize: 20,
                  color: Colors.light.background,
                }}
              >
                ต่อไป
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
