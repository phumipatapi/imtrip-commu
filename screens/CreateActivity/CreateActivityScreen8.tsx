import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import Lottie from "lottie-react-native";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { activity } from "../model/createActivity";
import axios from "axios";
import { authen } from "../../firebase_config";
interface Props {
  navigation: any;
  route: any;
}

export default function CreateActivityScreen8(prop: Props) {
  const [accept, setAccept] = useState(false);
  var imageUri: string[] = [];
  function clearDraftData() {
    activity[0].district = "";
    activity[0].activityType = [];
    activity[0].useToActivity = "";
    activity[0].activityName = "";
    activity[0].time = 0;
    activity[0].activityDetail = "";
    activity[0].address = "";
    activity[0].latitude = 0;
    activity[0].longitude = 0;
    activity[0].activityImage = ["", "", "", "", "", ""];
    activity[0].limit = "";
    activity[0].price = "";
    activity[0].addressDetail = "";
  }


  // async function uploadImage(image: string) {
  //   if (!image) {
  //     console.log('Empty image URI');
  //     return; // Exit the function if image URI is empty
  //   }

  //   let formData = new FormData();
  //   console.log(image);
  //   formData.append('image', {
  //     uri: image,
  //     type: 'image/jpeg',
  //     name: 'image.jpg',
  //   });

  //   fetch('https://clumsy-bat-handbag.cyclic.app/upload', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log('Success:', result);
  //       setImageUri(result['imageUrl']);
  //       return result;
  //     });
  // }

  async function fetchActivity() {
    await axios("https://clumsy-bat-handbag.cyclic.app/activity/insert", {
      method: "POST",
      data: {
        district: activity[0].district,
        activity_type: activity[0].activityType,
        is_use_to_activity: activity[0].useToActivity == "true" ? true : false,
        activity_name: activity[0].activityName,
        activity_detail: activity[0].activityDetail,
        activity_time: activity[0].time,
        address: activity[0].address,
        latitude: activity[0].latitude,
        longtitude: activity[0].longitude,
        activity_image: imageUri,
        participation_limit: parseInt(activity[0].limit),
        activity_price: parseInt(activity[0].price),
        status: "pending",
        address_detail: activity[0].addressDetail,
        user_id: authen.currentUser?.uid,
      },
    })
      .then((response) => response)
      .then((data) => {
        console.log("success");

      })
      .catch((error) => {
        console.log("error");
        console.error(error);
      });
  }
  const slideData = [
    {
      image: require("../../assets/animatedIcon/time.json"),
      text: "กิจกรรมของคุณจะปิดรับการจองก่อนเวลาเริ่มกิจกรรม 2 ชั่วโมงเสมอ",
      key: "1",
    },
    {
      image: require("../../assets/animatedIcon/money.json"),
      text: "คุณจะได้รับเงินจากการจองกิจกรรมเมื่อเสร็จสิ้นกิจกรรม ",
      key: "2",
    },
    {
      image: require("../../assets/animatedIcon/check.json"),
      text: "เมื่อสิ้นสุดการสร้างกิจกรรมนี้ ทางเราจะทำการตรวจสอบข้อมูลกิจกรรมของคุณภายใน 24 ชั่วโมงก่อนที่จะเผยแพร่",
      key: "3",
    },
  ];


  async function uploadActivityImages() {
    // try {
    //   const imagePromises = activity[0].activityImage.map(async (uri) => {
    //     if (!uri) {
    //       console.log('Invalid URI:', uri);
    //       return;
    //     }
    //     await uploadImage(uri);
    //   })




    // } catch (error) {
    //   console.error('Error uploading images:', error);
    // }
    return Promise.all(activity[0].activityImage.map(async (uri) => {
      if (!uri) {
        console.log('Invalid URI:', uri);
        return;
      }
      let formData = new FormData();

      formData.append('image', {
        uri: uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      await fetch('https://clumsy-bat-handbag.cyclic.app/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('Success:', result);
          imageUri.push(result['imageUrl']);
          return result;
        }
        );

    })).then(() => {
      fetchActivity();
      clearDraftData();
      prop.navigation.push("Home");
    }
    )

  };

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const renderItem = ({ item }: { item: any }) => {
    return (
      <View
        style={{
          justifyContent: "center",
          backgroundColor: Colors.light.tabBar,
          alignItems: "center",
          paddingHorizontal: 30,
          marginTop: 80,
          width: Dimensions.get("window").width,
          paddingBottom: 50,
        }}
      >
        <Lottie source={item.image} autoPlay loop style={{ width: 200 }} />
        <Text
          style={{
            fontFamily: "Mitr_400Regular",
            fontSize: 18,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          {item.text}
        </Text>
      </View>
    );
  };
  return (
    <ScrollView style={{ backgroundColor: Colors.light.background }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: Colors.light.tabBar,
          paddingTop: 20,
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
            ใกล้เสร็จสิ้นการสร้างกิจกรรมแล้ว!
          </Text>
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              color: Colors.light.darkGrey,
            }}
          >
            ข้อมูลเพิ่มเติมเกี่ยวกับการสร้างกิจกรรม
          </Text>
          <View
            style={{
              marginTop: 20,
              borderBottomColor: Colors.light.grey,
              borderBottomWidth: 1,
            }}
          />
        </View>

        <FlatList
          data={slideData}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          decelerationRate={"normal"}
          scrollEventThrottle={16}
        />
        <ExpandingDot
          data={slideData}
          expandingDotWidth={30}
          scrollX={scrollX}
          inActiveDotOpacity={0.6}
          dotStyle={{
            width: 10,
            height: 10,
            backgroundColor: "#347af0",
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          containerStyle={{
            position: "relative",
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <BouncyCheckbox
            size={25}
            fillColor={Colors.light.button}
            unfillColor={Colors.light.background}
            text="คุณยอมรับข้อตกลงและเงื่อนไขของ ImTrip"
            innerIconStyle={{ borderWidth: 2 }}
            iconStyle={{ borderColor: Colors.light.button }}
            textStyle={{
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              color: Colors.light.darkGrey,
              textDecorationLine: "none",
            }}
            onPress={(isChecked: boolean) => {
              setAccept(isChecked);
            }}
          />
        </View>
        <TouchableOpacity
          disabled={accept == false ? true : false}
          onPress={() => {
            uploadActivityImages();
            // uploadImage(
            //   activity[0].activityImage[0]
            // )
            // fetchActivity();
            // clearDraftData();
            // prop.navigation.push("Home");
          }}
          style={{
            backgroundColor:
              accept == false ? Colors.light.grey : Colors.light.button,
            width: Dimensions.get("window").width - 60,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            marginTop: 20,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 20,
              color: Colors.light.background,
            }}
          >
            สร้างกิจกรรม
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            prop.navigation.goBack();
          }}
          style={{
            borderColor: Colors.light.button,
            width: Dimensions.get("window").width - 60,
            borderWidth: 1,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            marginTop: 20,
            alignSelf: "center",
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
      </View>
    </ScrollView>
  );
}
