import React, { Component, useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC_Hem-kPo3oK5drd4a6M3mM4y8j5TOtBk",
  authDomain: "multiplication-game-8b7c2.firebaseapp.com",
  projectId: "multiplication-game-8b7c2",
  storageBucket: "multiplication-game-8b7c2.appspot.com",
  messagingSenderId: "345589082665",
  appId: "1:345589082665:web:3c1df0f9e6b2c9d0eaca38",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import MainScreen from "./components/Main";
import LoginScreen from "./components/auth/Login";
import MultiplicationGame from "./components/main/game/Multiplication";

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Game">
            <Stack.Screen
              name="Game"
              component={MainScreen}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: "#B6E3FC" },
                headerTintColor: "#B6E3FC",
              }}
            />
            <Stack.Screen
              name="MultiplicationGame"
              component={MultiplicationGame}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
