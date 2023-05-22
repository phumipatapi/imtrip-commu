import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AboutUsScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo-imtrip.png")}
          style={{ height: 150, resizeMode: "contain" }}
        />
        <Text style={styles.title}>เกี่ยวกับ อิ่มทริป</Text>
        <Text style={styles.description}>
          เราเป็นนิสิตวิทยาลัยนวัตกรรมสื่อสารสังคม เอกคอมพิวเตอร์เพื่อการสื่อสาร
          มหาวิทยาลัยศรีนครินทรวิโรฒ
          ที่มีความสนใจทางด้านเทคโนโลยีและการพัฒนาแอปพลิเคชันที่เกี่ยวข้องกับการท่องเที่ยวเชิงสร้างสรรค์โดยชุมชน
          ด้วยความมุ่งมั่นในการพัฒนาและค้นหานวัตกรรมใหม่ๆ
          ที่เหมาะสมกับการท่องเที่ยวเชิงสร้างสรรค์โดยชุมชน
          เราได้ศึกษาและวิจัยเพื่อพัฒนาแอปพลิเคชันที่ตอบโจทย์ความต้องการของชุมชนและนักท่องเที่ยว
          และได้สร้างแอปพลิเคชัน {"\n"}"อิ่มทริป"
        </Text>
        <Text style={styles.description}>
          เราต้องขอขอบคุณ Icon8
          ที่เป็นแหล่งรวมไอคอนที่ใช้ในการออกแบบแอปพลิเคชันของเรา
          ซึ่งไอคอนเหล่านี้เป็นประโยชน์อย่างมากในการเพิ่มความสวยงามและความสมบูรณ์ของแอปพลิเคชัน
          "อิ่มทริป"
        </Text>
        {/* <Text style={styles.description}>
        Thank you for choosing our products and services. We look forward to
        working with you to achieve your goals and drive your business forward.
      </Text> */}
        <MaterialCommunityIcons name="heart" color="#FF1493" size={40} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Mitr_400Regular",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Mitr_400Regular",
  },
});

export default AboutUsScreen;
