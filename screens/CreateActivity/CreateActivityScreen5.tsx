import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Colors from "../../constants/Colors";

import * as ImagePicker from "expo-image-picker";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { activity } from "../model/createActivity";

interface Props {
  navigation: any;
  route: any;
}
export default function CreateActivityScreen5(prop: Props) {
  const [selectedImages, setSelectedImages] = useState<string[]>(
    activity[0].activityImage
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = { uri: result.assets[0].uri };
      const newSelectedImages = [...selectedImages];
      const firstEmptyIndex = newSelectedImages.findIndex((uri) => uri === "");

      if (firstEmptyIndex === -1) {
        console.warn("Cannot add more than 6 images");
        return;
      }

      newSelectedImages[firstEmptyIndex] = newImage.uri;
      console.log(newSelectedImages);
      setSelectedImages(newSelectedImages);
    }
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
            รูปภาพกิจกรรม
          </Text>
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              color: Colors.light.darkGrey,
            }}
          >
            ใส่รูปภาพกิจกรรมของคุณเพื่อเพิ่มความน่าสนใจให้กับผู้เข้าร่วมกิจกรรม
            โดยรูปภาพต้องมีความชัดเจนและแสดงถึงกิจกรรมที่จะจัด
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
              fontSize: 18,
              color: Colors.light.darkGrey,
              marginTop: 20,
            }}
          >
            ใส่รูปภาพอย่างน้อยสามรูป
          </Text>

          <View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {[...Array(6)].map((_, index) => {
                if (selectedImages[index]) {
                  return (
                    <Image
                      key={index}
                      source={{ uri: selectedImages[index] }}
                      style={{ width: 100, height: 100, marginTop: 20 }}
                    />
                  );
                } else {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: Colors.light.grey,
                        borderRadius: 10,
                        marginTop: 20,
                      }}
                      onPress={pickImage}
                    >
                      <MaterialCommunityIcons
                        name="plus"
                        size={100}
                        color={Colors.light.background}
                      />
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          </View>

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
                activity[0].activityImage = selectedImages;
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
              disabled={!selectedImages[2]}
              onPress={() => {
                activity[0].activityImage = selectedImages;
                prop.navigation.push("CreateActivity6");
              }}
              style={{
                backgroundColor: !selectedImages[2]
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
