import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Colors from "../../constants/Colors";
import DropDownPicker from "react-native-dropdown-picker";
import { activity } from "../model/createActivity";

interface Props {
  navigation: any;
  route: any;
  city: string;
  useToActivity: string;
  activityType: string[];
}

export default function CreateActivityScreen2(prop: Props) {
  const [activityDetail, setDetail] = useState(activity[0].activityDetail);
  const [activityName, setName] = useState(activity[0].activityName);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(activity[0].time);
  const [items, setItems] = useState([
    { label: "1 ชั่วโมง", value: 1 },
    { label: "1 ชั่วโมงครึ่ง", value: 1.5 },
    { label: "2 ชั่วโมง", value: 2 },
    { label: "2 ชั่วโมงครึ่ง", value: 2.5 },
    { label: "3 ชั่วโมง", value: 3 },
    { label: "3 ชั่วโมงครึ่ง", value: 3.5 },
    { label: "4 ชั่วโมง", value: 4 },
    { label: "4 ชั่วโมงครึ่ง", value: 4.5 },
    { label: "5 ชั่วโมง", value: 5 },
    { label: "5 ชั่วโมงครึ่ง", value: 5.5 },
    { label: "6 ชั่วโมง", value: 6 },
    { label: "6 ชั่วโมงครึ่ง", value: 6.5 },
    { label: "7 ชั่วโมง", value: 7 },
    { label: "7 ชั่วโมงครึ่ง", value: 7.5 },
    { label: "8 ชั่วโมง", value: 8 },
    { label: "8 ชั่วโมงครึ่ง", value: 8.5 },
    { label: "9 ชั่วโมง", value: 9 },
    { label: "9 ชั่วโมงครึ่ง", value: 9.5 },
  ]);

  return (
    <ScrollView style={{ backgroundColor: Colors.light.background, flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
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
            อธิบายเกี่ยวกับกิจกรรมของคุณ
          </Text>
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              color: Colors.light.darkGrey,
            }}
          >
            อธิบายเกี่ยวกับกิจกรรมของคุณอย่างละเอียดเพื่อให้ผู้เข้าร่วมกิจกรรมได้เข้าใจ
            อาทิกิจกรรมของคุณเป็นกิจกรรมอะไร ทำอะไรบ้าง ทำได้กี่คน และอื่น ๆ
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
            ตั้งชื่อกิจกรรมกิจกรรมของคุณ
          </Text>
          <TextInput
            maxLength={70}
            style={{
              borderColor: Colors.light.grey,
              borderWidth: 1,
              borderRadius: 10,
              padding: 15,
              marginTop: 10,
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              paddingBottom: 40,
            }}
            onChangeText={setName}
            value={activityName}
            placeholder="ตั้งชื่อกิจกรรมของคุณ"
          />
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 20,
              color: Colors.light.black,
              marginTop: 20,
            }}
          >
            กิจกรรมของคุณทำอะไรบ้าง?
          </Text>
          <TextInput
            maxLength={1500}
            style={{
              borderColor: Colors.light.grey,
              borderWidth: 1,
              borderRadius: 10,
              padding: 15,
              marginTop: 10,
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              paddingBottom: 120,
            }}
            onChangeText={setDetail}
            value={activityDetail}
            placeholder="เล่าเกี่ยวกับกิจกรรมของคุณ"
          />
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 20,
              color: Colors.light.black,
              marginTop: 20,
            }}
          >
            กิจกรรมของคุณใช้เวลานานเท่าไหร่?
          </Text>
          <DropDownPicker
            placeholder="ระยะเวลา"
            placeholderStyle={{ color: Colors.light.grey }}
            textStyle={{ fontFamily: "Mitr_400Regular", fontSize: 18 }}
            open={open}
            value={time}
            items={items}
            setOpen={setOpen}
            setValue={setTime}
            setItems={setItems}
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
              justifyContent: "space-between",
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
                activity[0].activityName = activityName;
                activity[0].activityDetail = activityDetail;
                activity[0].time = time;

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
              disabled={activityDetail == "" || time == 0}
              onPress={() => {
                activity[0].activityName = activityName;
                activity[0].activityDetail = activityDetail;
                activity[0].time = time;

                prop.navigation.push("CreateActivity3");
              }}
              style={{
                backgroundColor:
                  activityDetail == "" || time == 0
                    ? Colors.light.grey
                    : Colors.light.button,
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
