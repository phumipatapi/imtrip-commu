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
import { activity } from "../model/createActivity";

interface Props {
  navigation: any;
  route: any;
}

export default function CreateActivityScreen4(prop: Props) {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [value, setValue] = useState(activity[0].facilityFood);
  const [items, setItems] = useState([
    { label: "อาหารว่าง", value: "อาหารว่าง" },
    { label: "อาหารเช้า", value: "อาหารเช้า" },
    { label: "อาหารเที่ยง", value: "อาหารเที่ยง" },
    { label: "อาหารเย็น", value: "อาหารเย็น" },
    { label: "ของหวาน", value: "ของหวาน" },
    { label: "น้ำเปล่า", value: "น้ำเปล่า" },
    { label: "อื่น ๆ", value: "อื่น ๆ" },
  ]);
  const [travel, setTravel] = useState(activity[0].facilityTravel);
  const [travelList, settravelList] = useState([
    {
      label: "มีรถบริการรับส่งถึงตัวเมือง",
      value: "มีรถบริการรับส่งถึงตัวเมือง",
    },
    {
      label: "มีรถบริการรับส่งในบริเวณใกล้เคียง",
      value: "มีรถบริการรับส่งในบริเวณใกล้เคียง",
    },
    { label: "รถไฟ", value: "รถไฟ" },
    { label: "รถทัวร์", value: "รถทัวร์" },
    { label: "รถตู้", value: "รถตู้" },
    { label: "อื่น ๆ", value: "อื่น ๆ" },
  ]);
  const [etc, setEtc] = useState(activity[0].facilityOther);
  const [etcList, setEtcList] = useState([
    { label: "ที่จอดรถ", value: "ที่จอดรถ" },
    { label: "ห้องน้ำ", value: "ห้องน้ำ" },
    {
      label: "สิ่งอำนวยความสะดวกแก่ผู้พิการ",
      value: "สิ่งอำนวยความสะดวกแก่ผู้พิการ",
    },
    { label: "อินเทอร์เน็ต", value: "อินเทอร์เน็ต" },
    { label: "ที่พัก", value: "ที่พัก" },
  ]);

  return (
    <ScrollView style={{ backgroundColor: Colors.light.background }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setOpen(false);
          setOpen2(false);
          setOpen3(false);
        }}
      >
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
            สิ่งอำนวยความสะดวก
          </Text>
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              color: Colors.light.darkGrey,
            }}
          >
            อธิบายเกี่ยวกับสิ่งอำนวยความสะดวกของทางสถานที่จัดกิจกรรม
            หรือสิ่งที่คุณจะให้บริการแก่ผู้เข้าร่วมกิจกรรม
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
            อาหารและเครื่องดื่ม (ไม่บังคับ)
          </Text>

          <DropDownPicker
            placeholder="คุณเตรียมอาหารและเครื่องดื่มไว้หรือไม่"
            placeholderStyle={{ color: Colors.light.grey }}
            textStyle={{ fontFamily: "Mitr_400Regular", fontSize: 18 }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            multiple={true}
            mode="BADGE"
            style={{
              borderColor: Colors.light.grey,
              marginTop: 10,
              padding: 15,
            }}
            showBadgeDot={false}
            listMode="SCROLLVIEW"
            zIndex={3000}
            zIndexInverse={1000}
            onPress={() => {
              setOpen2(false);
              setOpen3(false);
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
            การเดินทาง (ไม่บังคับ)
          </Text>
          <DropDownPicker
            placeholder="คุณมีบริการการเดินทางหรือไม่"
            placeholderStyle={{ color: Colors.light.grey }}
            textStyle={{ fontFamily: "Mitr_400Regular", fontSize: 18 }}
            open={open2}
            value={travel}
            items={travelList}
            setOpen={setOpen2}
            setValue={setTravel}
            setItems={settravelList}
            multiple={true}
            mode="BADGE"
            style={{
              borderColor: Colors.light.grey,
              marginTop: 10,
              padding: 15,
            }}
            showBadgeDot={false}
            listMode="SCROLLVIEW"
            zIndex={2000}
            zIndexInverse={2000}
            onPress={() => {
              setOpen(false);
              setOpen3(false);
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
            อื่น ๆ (ไม่บังคับ)
          </Text>
          <DropDownPicker
            placeholder="อื่น ๆ"
            placeholderStyle={{ color: Colors.light.grey }}
            textStyle={{ fontFamily: "Mitr_400Regular", fontSize: 18 }}
            zIndex={1000}
            zIndexInverse={3000}
            open={open3}
            value={etc}
            items={etcList}
            setOpen={setOpen3}
            setValue={setEtc}
            setItems={setEtcList}
            multiple={true}
            mode="BADGE"
            style={{
              borderColor: Colors.light.grey,
              marginTop: 10,
              padding: 15,
            }}
            showBadgeDot={false}
            listMode="SCROLLVIEW"
            onPress={() => {
              setOpen2(false);
              setOpen(false);
            }}
          />

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
                activity[0].facilityFood = value;
                activity[0].facilityTravel = travel;
                activity[0].facilityOther = etc;
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
              onPress={() => {
                activity[0].facilityFood = value;
                activity[0].facilityTravel = travel;
                activity[0].facilityOther = etc;
                prop.navigation.push("CreateActivity5");
              }}
              style={{
                backgroundColor: Colors.light.button,
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
