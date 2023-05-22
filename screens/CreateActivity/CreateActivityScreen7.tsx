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
import DropDownPicker from "react-native-dropdown-picker";

import { RadioButton } from "react-native-paper";
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

export default function CreateActivityScreen7(prop: Props) {
  const [price, setPrice] = useState(activity[0].price.toString());

  const handleTextChange = (input: string) => {
    // Only allow numeric input
    const numericInput = input.replace(/[^0-9]/g, "");
    setPrice(numericInput);
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.light.background }}>
      <TouchableWithoutFeedback onPress={() => { }}>
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
            ตั้งราคากิจกรรมของคุณ
          </Text>
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              color: Colors.light.darkGrey,
            }}
          >
            กำหนดราคากิจกรรมของคุณเพื่อให้ผู้เข้าร่วมกิจกรรมทราบถึงราคาที่คุณกำหนด
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
            ราคากิจกรรมคนละ (บาท)
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
            value={price}
            onChangeText={handleTextChange}
            placeholder="ราคาเข้าร่วมกิจกรรมต่อคน"
          />
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              color: Colors.light.darkGrey,
              marginTop: 10,
            }}
          >
            ราคาสามารถแก้ไขได้ภายหลัง
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
                activity[0].price = parseInt(price);
                prop.navigation.goBack()
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
              disabled={price == "" ? true : false}
              onPress={() => {
                activity[0].price = parseInt(price);
                prop.navigation.push("CreateActivity8");
              }}
              style={{
                backgroundColor:
                  price == "" ? Colors.light.grey : Colors.light.button,
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
