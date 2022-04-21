//START OF LOGIN.JS


import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

import firebase from "firebase";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("success: " + result);
      })
      .then((error) => {
        console.log("error: " + error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>
        <View
          style={{ flex: 10, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            onPress={() => this.onSignUp()}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;

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
    width: "100%",
    padding: 15,
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
