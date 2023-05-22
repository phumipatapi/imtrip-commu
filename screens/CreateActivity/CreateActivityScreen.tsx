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
import { RadioButton } from "react-native-paper";
import { Activity, activity } from "../model/createActivity";
import { set } from "firebase/database";


interface Props {
  navigation: any;
  route: any;
}

export default function CreateActivityScreen(prop: Props) {
  const [city, setCity] = useState(activity[0].district);
  const [useToActivity, setuseToActivity] = useState(activity[0].useToActivity);
  const [open, setOpen] = useState(false);
  const [activityType, setType] = useState(activity[0].activityType);
  const [typeList, setList] = useState([
    { label: "อาหาร", value: "อาหาร" },
    { label: "ศิลปะ", value: "ศิลปะ" },
    { label: "วัฒนธรรม", value: "วัฒนธรรม" },
    { label: "ประวัติศาสตร์", value: "ประวัติศาสตร์" },
    { label: "ธรรมชาติ", value: "ธรรมชาติ" },
    { label: "สุขภาพ", value: "สุขภาพ" },
  ]);

  const [open2, setOpen2] = useState(false);
  const [cityList, setcityList] = useState([

    { label: "กรุงเทพมหานคร", value: "กรุงเทพมหานคร" },
    { label: "กระบี่", value: "กระบี่" },
    { label: "กาญจนบุรี", value: "กาญจนบุรี" },
    { label: "กาฬสินธุ์", value: "กาฬสินธุ์" },
    { label: "กำแพงเพชร", value: "กำแพงเพชร" },
    { label: "ขอนแก่น", value: "ขอนแก่น" },
    { label: "จันทบุรี", value: "จันทบุรี" },
    { label: "ฉะเชิงเทรา", value: "ฉะเชิงเทรา" },
    { label: "ชลบุรี", value: "ชลบุรี" },
    { label: "ชัยนาท", value: "ชัยนาท" },
    { label: "ชัยภูมิ", value: "ชัยภูมิ" },
    { label: "ชุมพร", value: "ชุมพร" },
    { label: "เชียงราย", value: "เชียงราย" },
    { label: "เชียงใหม่", value: "เชียงใหม่" },
    { label: "ตรัง", value: "ตรัง" },
    { label: "ตราด", value: "ตราด" },
    { label: "ตาก", value: "ตาก" },
    { label: "นครนายก", value: "นครนายก" },
    { label: "นครปฐม", value: "นครปฐม" },
    { label: "นครพนม", value: "นครพนม" },
    { label: "นครราชสีมา", value: "นครราชสีมา" },
    { label: "นครศรีธรรมราช", value: "นครศรีธรรมราช" },
    { label: "นครสวรรค์", value: "นครสวรรค์" },
    { label: "นนทบุรี", value: "นนทบุรี" },
    { label: "นราธิวาส", value: "นราธิวาส" },
    { label: "น่าน", value: "น่าน" },
    { label: "บึงกาฬ", value: "บึงกาฬ" },
    { label: "บุรีรัมย์", value: "บุรีรัมย์" },
    { label: "ปทุมธานี", value: "ปทุมธานี" },
    { label: "ประจวบคีรีขันธ์", value: "ประจวบคีรีขันธ์" },
    { label: "ปราจีนบุรี", value: "ปราจีนบุรี" },
    { label: "ปัตตานี", value: "ปัตตานี" },
    { label: "พระนครศรีอยุธยา", value: "พระนครศรีอยุธยา" },
    { label: "พังงา", value: "พังงา" },
    { label: "พัทลุง", value: "พัทลุง" },
    { label: "พิจิตร", value: "พิจิตร" },
    { label: "พิษณุโลก", value: "พิษณุโลก" },
    { label: "เพชรบุรี", value: "เพชรบุรี" },
    { label: "เพชรบูรณ์", value: "เพชรบูรณ์" },
    { label: "แพร่", value: "แพร่" },
    { label: "พะเยา", value: "พะเยา" },
    { label: "ภูเก็ต", value: "ภูเก็ต" },
    { label: "มหาสารคาม", value: "มหาสารคาม" },
    { label: "มุกดาหาร", value: "มุกดาหาร" },
    { label: "แม่ฮ่องสอน", value: "แม่ฮ่องสอน" },
    { label: "ยะลา", value: "ยะลา" },
    { label: "ยโสธร", value: "ยโสธร" },
    { label: "ร้อยเอ็ด", value: "ร้อยเอ็ด" },
    { label: "ระนอง", value: "ระนอง" },
    { label: "ระยอง", value: "ระยอง" },
    { label: "ราชบุรี", value: "ราชบุรี" },
    { label: "ลพบุรี", value: "ลพบุรี" },
    { label: "ลำปาง", value: "ลำปาง" },
    { label: "ลำพูน", value: "ลำพูน" },
    { label: "เลย", value: "เลย" },
    { label: "ศรีสะเกษ", value: "ศรีสะเกษ" },
    { label: "สกลนคร", value: "สกลนคร" },
    { label: "สงขลา", value: "สงขลา" },
    { label: "สตูล", value: "สตูล" },
    { label: "สมุทรปราการ", value: "สมุทรปราการ" },
    { label: "สมุทรสงคราม", value: "สมุทรสงคราม" },
    { label: "สมุทรสาคร", value: "สมุทรสาคร" },
    { label: "สระแก้ว", value: "สระแก้ว" },
    { label: "สระบุรี", value: "สระบุรี" },
    { label: "สิงห์บุรี", value: "สิงห์บุรี" },
    { label: "สุโขทัย", value: "สุโขทัย" },
    { label: "สุพรรณบุรี", value: "สุพรรณบุรี" },
    { label: "สุราษฎร์ธานี", value: "สุราษฎร์ธานี" },
    { label: "สุรินทร์", value: "สุรินทร์" },
    { label: "หนองคาย", value: "หนองคาย" },
    { label: "หนองบัวลำภู", value: "หนองบัวลำภู" },
    { label: "อ่างทอง", value: "อ่างทอง" },
    { label: "อำนาจเจริญ", value: "อำนาจเจริญ" },
    { label: "อุดรธานี", value: "อุดรธานี" },
    { label: "อุตรดิตถ์", value: "อุตรดิตถ์" },
    { label: "อุทัยธานี", value: "อุทัยธานี" },
    { label: "อุบลราชธานี", value: "อุบลราชธานี" },
  ]);



  return (
    <ScrollView style={{ backgroundColor: Colors.light.background }}>
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
            เริ่มสร้างกิจกรรมการท่องเที่ยวเชิงสร้างสรรค์
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
            คุณจัดกิจกรรมการท่องเที่ยวเชิงสร้างสรรค์ในจังหวัดใด?
          </Text>
          {/* <TextInput
            style={{
              borderColor: Colors.light.grey,
              borderWidth: 1,
              borderRadius: 10,
              padding: 15,
              marginTop: 10,
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
            }}
            onChangeText={setCity}
            value={city}
            placeholder="จังหวัด"
          />
           */}
          <DropDownPicker
            placeholder="จังหวัด"
            placeholderStyle={{ color: Colors.light.grey }}
            textStyle={{ fontFamily: "Mitr_400Regular", fontSize: 18 }}
            open={open2}
            value={city}
            items={
              cityList
            }
            setOpen={setOpen2}
            setValue={setCity}
            setItems={setcityList}
            multiple={false}
            mode="BADGE"
            style={{
              borderColor: Colors.light.grey,
              marginTop: 10,
              padding: 15,
            }}
            zIndex={3000}
            zIndexInverse={1000}
            showBadgeDot={false}
            listMode="SCROLLVIEW"
          />
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 20,
              color: Colors.light.black,
              marginTop: 20,
            }}
          >
            คุณจัดกิจกรรมการท่องเที่ยวเกี่ยวกับอะไร?
          </Text>
          <DropDownPicker
            placeholder="ประเภทของกิจกรรม"
            placeholderStyle={{ color: Colors.light.grey }}
            textStyle={{ fontFamily: "Mitr_400Regular", fontSize: 18 }}
            open={open}
            value={activityType}
            items={typeList}
            setOpen={setOpen}
            setValue={setType}
            setItems={setList}
            multiple={true}
            mode="BADGE"
            style={{
              borderColor: Colors.light.grey,
              marginTop: 10,
              padding: 15,
            }}
            zIndex={2000}
            zIndexInverse={2000}
            showBadgeDot={false}
            listMode="SCROLLVIEW"
          />
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 20,
              color: Colors.light.black,
              marginTop: 20,
            }}
          >
            คุณเคยจัดกิจกรรมการท่องเที่ยวเชิงสร้างสรรค์มาก่อนหรือไม่?
          </Text>

          <RadioButton.Group
            onValueChange={(checked) => setuseToActivity(checked)}
            value={useToActivity}
          >
            <RadioButton.Item
              label="ฉันเคยจัดกิจกรรมมาก่อน"
              value="true"
              mode="android"
              labelStyle={{ fontFamily: "Mitr_400Regular", fontSize: 18 }}
              color={Colors.light.button}
              uncheckedColor={Colors.light.grey}
            />
            <RadioButton.Item
              label="ฉันไม่เคยจัดกิจกรรมมาก่อน"
              value="false"
              mode="android"
              labelStyle={{ fontFamily: "Mitr_400Regular", fontSize: 18 }}
              color={Colors.light.button}
              uncheckedColor={Colors.light.grey}
            />
          </RadioButton.Group>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              disabled={
                city === "" ||
                activityType.length === 0 ||
                useToActivity === ""
              }
              onPress={() => {
                activity[0].district = city;
                activity[0].activityType = activityType;
                activity[0].useToActivity = useToActivity;

                prop.navigation.push("CreateActivity2");
              }}
              style={{
                backgroundColor:
                  city === "" ||
                    activityType.length === 0 ||
                    useToActivity === ""
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


