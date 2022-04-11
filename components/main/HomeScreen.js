import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../images/gamelogo.png";
import firebase from "firebase";

import { useFonts } from "@expo-google-fonts/lato";

export default function HomeScreen() {
  let [fontsLoaded, error] = useFonts({
    "Lato-Bold": require("../fonts/Lato/Lato-Bold.ttf"),
  });
  const [prevScore, setScore] = useState("");
  async function getScore() {
    try {
      let doc = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();
      let dataObj = doc.data();
      setScore(dataObj.gameScore);
    } catch (err) {
      alert(err.message);
    }
  }
  getScore();
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#B6E3FC", alignItems: "center" }}>
      <Image source={logo} style={{ width: 305, height: 159 }} />
      <Text
        style={{
          fontFamily: "Lato-Bold",
          fontSize: 30,
          color: "#4F37C1",
        }}
      >
        Multiplication Game
      </Text>
      <Text
        style={{
          fontFamily: "Lato-Bold",
          fontSize: 18,
          color: "#4F37C1",
          paddingTop: 20,
        }}
      >
        Previous Game Score: {prevScore}
      </Text>
      <View
        style={{ flex: 12, justifyContent: "center", alignItems: "center" }}
      >
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => {
            navigation.navigate("MultiplicationGame"), getScore();
          }}
        >
          <Text style={styles.buttonOutlineText}>Start Game!</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ></View>
    </View>
  );
}
const backgroundStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#B6E3FC",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B6E3FC",
  },
  inputContainer: {
    width: "80%",
    flex: 12,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 19,
    marginTop: 5,
    fontSize: 18,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0682F9",
    width: "80%",
    padding: 10,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
