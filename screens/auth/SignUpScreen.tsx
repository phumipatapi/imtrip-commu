import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  Dimensions,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import Colors from "../../constants/Colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authen } from "../../firebase_config";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase_config";

interface Props {
  navigation: any;
  route: any;
}

export default function SignUpScreen(prop: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [surname, setSurname] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  async function signUp() {
    try {
      // Create the user account with email and password
      const userCredential = await createUserWithEmailAndPassword(
        authen,
        email,
        password
      );
      await updateProfile(authen.currentUser!, {
        displayName: name + " " + surname,
      }).catch((err) => console.log(err));

      // Create a new user document in Firestore with the user's information
      const userRef = await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        name: name,
        surname: surname,
        birthday: birthday,
        email: email,
      });

      console.log("User created successfully");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.light.tabBar,
        paddingHorizontal: 30,
        paddingTop: 20,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Mitr_400Regular",
          fontSize: 24,
          color: Colors.light.black,
          marginTop: 20,
        }}
      >
        สมัครสมาชิก
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
        onChangeText={setName}
        value={name}
        placeholder="ชื่อ"
      />
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
        onChangeText={setSurname}
        value={surname}
        placeholder="นามสกุล"
      />
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
        onChangeText={setBirthday}
        value={birthday}
        placeholder="วันเกิด"
      />
      <Text
        style={{
          fontFamily: "Mitr_400Regular",
          fontSize: 16,
          color: Colors.light.grey,
          marginTop: 5,
        }}
      >
        ผู้สมัครต้องอายุ 18 ปีขึ้นไป
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
        onChangeText={setEmail}
        value={email}
        placeholder="อีเมล"
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <TextInput
          style={{
            borderColor: Colors.light.grey,
            borderWidth: 1,
            borderRadius: 10,
            padding: 15,
            marginTop: 10,
            fontFamily: "Mitr_400Regular",
            fontSize: 18,
            flex: 1,
          }}
          onChangeText={setPassword}
          value={password}
          placeholder="รหัสผ่าน"
          secureTextEntry={hidePassword}
          passwordRules="required: lower; required: upper; required: digit; minlength: 8;"
        />

        <TouchableOpacity
          style={{
            marginLeft: 10,
          }}
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <MaterialCommunityIcons
            name={!hidePassword ? "eye-off" : "eye"}
            size={30}
            color={Colors.light.grey}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontFamily: "Mitr_400Regular",
          fontSize: 16,
          marginTop: 5,
          color: Colors.light.grey,
        }}
      >
        {password.length == 0
          ? "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร 1 ตัวอักษรพิมพ์เล็ก 1 ตัวอักษร พิมพ์ใหญ่ 1 ตัวอักษรและตัวเลข"
          : password.length < 8
          ? "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"
          : password.match(/[a-z]/g) == null
          ? "รหัสผ่านต้องมีอย่างน้อย 1 ตัวอักษรพิมพ์เล็ก"
          : password.match(/[A-Z]/g) == null
          ? "รหัสผ่านต้องมีอย่างน้อย 1 ตัวอักษรพิมพ์ใหญ่"
          : password.match(/[0-9]/g) == null
          ? "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัวอักษรตัวเลข"
          : ""}
      </Text>
      <View
        style={{
          flexDirection: "column",

          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontFamily: "Mitr_400Regular",
            fontSize: 18,
            color: Colors.light.black,
          }}
        >
          เมื่อคุณกดลงทะเบียน แสดงว่าคุณยอมรับ
        </Text>
        <TouchableOpacity
          onPress={() => {
            prop.navigation.navigate("Term");
          }}
        >
          <Text
            style={{
              fontFamily: "Mitr_400Regular",
              fontSize: 18,
              color: Colors.light.black,
              textDecorationLine: "underline",
            }}
          >
            เงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          signUp();
        }}
        disabled={
          email.length == 0 ||
          password.length < 8 ||
          password.match(/[a-z]/g) == null ||
          password.match(/[A-Z]/g) == null ||
          password.match(/[0-9]/g) == null ||
          name.length == 0 ||
          surname.length == 0 ||
          birthday.length == 0
        }
        style={{
          backgroundColor:
            email.length == 0 ||
            password.length < 8 ||
            password.match(/[a-z]/g) == null ||
            password.match(/[A-Z]/g) == null ||
            password.match(/[0-9]/g) == null ||
            name.length == 0 ||
            surname.length == 0 ||
            birthday.length == 0
              ? Colors.light.grey
              : Colors.light.button,

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
          ลงทะเบียน
        </Text>
      </TouchableOpacity>
    </View>
  );
}
