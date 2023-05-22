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
} from "react-native";
import Colors from "../../constants/Colors";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import axios, { AxiosResponse } from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Lottie from "lottie-react-native";
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

export default function CreateActivityScreen3(prop: Props) {
  const [location, setLocation] = useState({
    latitude: activity[0].latitude,
    longitude: activity[0].longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.06,
  });
  const [address, setAddress] = useState(activity[0].address);
  const [addressDetail, setAddressDetail] = useState(activity[0].addressDetail);
  const [query, setQuery] = useState("" + "_thailand");
  const [results, setResults] = useState<
    { formatted: string; location: { lat: number; lon: number } }[]
  >([]);

  const searchPlace = async (query: string) => {
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&filter=countrycode:th&limit=5&format=json&apiKey=2dee697077eb495d90681ad091352550`;

    try {
      const response = await axios.get(url);

      const data = response.data;
      const formattedResults = data.results.map((result: any) => ({
        formatted: result.formatted,
        location: { lat: result.lat, lon: result.lon },
      }));
      setTimeout(() => {
        setResults(formattedResults);
      }, 0);
    } catch (error) {
      console.log(error);
    }
  };

  const searchLatLon = async (lat: number, lon: number) => {
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=2dee697077eb495d90681ad091352550`;

    try {
      const response = await axios.get(url);

      const data = response.data;

      setTimeout(() => {
        setAddress(data.features[0].properties.formatted);
      }, 0);
    } catch (error) {
      console.log(error);
    }
  };

  const onRegionChangeComplete = (newRegion: Region) => {
    setLocation(newRegion);
    searchLatLon(newRegion.latitude, newRegion.longitude);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Insufficient permissions!",
          "Sorry, we need location permissions to make this work!",
          [{ text: "Okay" }]
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02,
      });
      // searchByLatLon(location.coords.latitude, location.coords.longitude);
    })();
  }, []);
  return (
    <ScrollView
      nestedScrollEnabled
      style={{ backgroundColor: Colors.light.background }}
    >
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
            flexDirection: "column",
            backgroundColor: Colors.light.tabBar,
            paddingHorizontal: 30,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 24,
              color: Colors.light.black,
            }}
          >
            สถานที่จัดกิจกรรม
          </Text>
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              color: Colors.light.darkGrey,
            }}
          >
            แจ้งสถานที่จัดกิจกรรมอย่างละเอียด
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <MapView
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
            onRegionChangeComplete={onRegionChangeComplete}
            region={location}
            initialRegion={location}
            showsMyLocationButton={true}
            showsUserLocation={true}
            provider={"google"}
          >
            <Image
              source={require("../../assets/location-pin.png")}
              style={{ height: 50, width: 50 }}
            />
          </MapView>

          <View
            style={{
              position: "absolute",
              top: 10,
              width: "100%",
              // paddingHorizontal: 20,
            }}
          >
            <TextInput
              style={{
                borderRadius: 10,
                paddingHorizontal: 10,
                borderColor: Colors.light.grey,
                backgroundColor: "#FFF",
                borderWidth: 1,
                height: 45,
                fontSize: 18,
                fontFamily: "Mitr_400Regular",
                marginHorizontal: 20,
              }}
              placeholder={"ค้นหาสถานที่"}
              onChangeText={(query) => {
                if (query.length > 0) {
                  searchPlace(query);
                } else {
                  setResults([]);
                }
                setResults([]);
              }}
              onSubmitEditing={() => searchPlace(query)}
            />
            <View
              style={{
                borderRadius: 10,
                backgroundColor: Colors.light.background,

                marginHorizontal: 20,
                marginTop: 5,
              }}
            >
              {results.map((result, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    padding: 10,
                    borderBottomWidth: index != results.length - 1 ? 0.5 : 0,
                    borderColor: Colors.light.grey,
                  }}
                  onPress={() => {
                    setAddress(result.formatted);
                    setLocation({
                      latitude: result.location.lat,
                      longitude: result.location.lon,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.02,
                    });
                    setResults([]);
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Mitr_400Regular",
                      fontSize: 18,
                      color: Colors.light.black,
                    }}
                  >
                    {result.formatted}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: Colors.light.tabBar,
            paddingTop: 20,
            paddingHorizontal: 30,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Mitr_400Regular",
                fontSize: 20,
              }}
            >
              ที่อยู่
            </Text>
            <MaterialCommunityIcons
              name="information-outline"
              size={20}
              color={"black"}
              style={{ marginLeft: 10 }}
            />
            <Text
              style={{
                fontFamily: "Mitr_400Regular",
                fontSize: 16,
                color: Colors.light.black,
                marginLeft: 5,
              }}
            >
              ข้อมูลจะเป็นไปตามหมุดที่คุณปักไว้
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              color: Colors.light.black,
              display: address ? "flex" : "none",
            }}
          >
            {address}
          </Text>

          <Lottie
            source={require("../../assets/animatedIcon/car-loading.json")}
            autoPlay
            loop
            style={{
              display: address ? "none" : "flex",
              width: "100%",
            }}
          />
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
              paddingBottom: 60,
            }}
            onChangeText={setAddressDetail}
            value={addressDetail}
            placeholder="บอกเพิ่มเติมเกี่ยวกับที่จัดกิจกรรม"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 40,
            paddingHorizontal: 30,
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
              activity[0].address = address;
              activity[0].addressDetail = addressDetail;
              activity[0].latitude = location.latitude;
              activity[0].longitude = location.longitude;
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
            disabled={address == "" ? true : false}
            onPress={() => {
              activity[0].address = address;
              activity[0].addressDetail = addressDetail;
              activity[0].latitude = location.latitude;
              activity[0].longitude = location.longitude;
              prop.navigation.push("CreateActivity4");
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
    </ScrollView>
  );
}
