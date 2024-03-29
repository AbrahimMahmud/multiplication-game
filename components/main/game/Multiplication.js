//START OF MULTIPLICATION.JS

import React, { Component, useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  Alert,
} from "react-native";
import firebase from "firebase";
import CountDown from "react-native-countdown-component";

export default function Multiplication({ navigation }) {
  const [answer, setAnswer] = useState();
  var [score, setScore] = useState(100);
  var [one, setOne] = useState(2);
  var [two, setTwo] = useState(3);
  var [answ, setAnsw] = useState(6);
  var num = parseInt(score);
  var ques1 = 0;
  var ques2 = 1; 
  var quesAns = 2;

  function checkAnswer(ans, corAns) {
    if (ans == corAns) {
      setScore(score + 100);
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          gameScore: score,
        });
      nextQuestion();
    } else {
      Alert.alert("Incorrect, try again!", "", [
        { text: "Try Again" },
        { text: "Next Question", onPress: () => nextQuestion() },
      ]);
    }
  }
  function getRandQuestions() {
    var quesList = [];
    for (var i = 0; i < 10; i++) {
      var randNumOne = Math.floor(Math.random() * (17 - 1) + 1);
      var randNumTwo = Math.floor(Math.random() * (10 - 1) + 1);
      var correctAnswer = randNumOne * randNumTwo;
      quesList.push(randNumOne, randNumTwo, correctAnswer);
    }
    return quesList;
  }
  function nextQuestion() {
    var newQuestion = getRandQuestions();
    setOne(newQuestion[ques1]);
    setTwo(newQuestion[ques2]);
    setAnsw(newQuestion[quesAns]);
    ques1 = ques1 + 3;
    ques2 = ques2 + 3;
    quesAns = quesAns + 3;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#B6E3FC",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#B6E3FC",
          paddingTop: 85,
        }}
      >
        <CountDown
          until={15}
          onFinish={() => {
            Alert.alert(
              "Time is up! Your score for this game:",
              String(score),
              [{ text: "OK", onPress: () => navigation.navigate("Game") }]
            );
          }}
          size={24}
          digitStyle={{
            backgroundColor: "#B6E3FC",
            borderWidth: 3,
            borderColor: "#94A6FF",
          }}
          digitTxtStyle={{ color: "#94A6FF" }}
          timeLabelStyle={{ color: "#94A6FF", fontWeight: "bold" }}
          timeToShow={["S"]}
          timeLabels={{ s: "TIME REMAINING" }}
        />
        <Text
          style={{
            fontWeight: "500",
            fontSize: 20,
            color: "#4F37C1",
          }}
        >
          Score: {num}
        </Text>
        <Text
          style={{
            fontFamily: "Lato-Bold",
            fontSize: 27,
            color: "#4F37C1",
            paddingTop: 30,
          }}
        >
          Answer The Question:
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#B6E3FC",
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: 27,
            color: "#4F37C1",
          }}
        >
          {one} x {two} = ?
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="type answer"
            keyboardType="numeric"
            onChangeText={(val) => setAnswer(val)}
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={() => {
              checkAnswer(answer, answ);
            }}
          >
            <Text style={styles.buttonOutlineText}>Submit!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
    paddingTop: 75,
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
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 50,
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
