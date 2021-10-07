import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { loggedInDrawer, loggedOutDrawer } from "../services/TabItems";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Inline function"]);
// components
import LogIn from './LogIn';
import SignUp from './SignUp';
import {
  Screens1Navigator,
  Screens2Navigator,
  Screens3Navigator,
  Screens4Navigator,
} from '../services/Stacks';
import { Text, View } from 'react-native';
import { firebase } from '../config/firebase';
import LogOut from "./LogOut";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const Tab = createBottomTabNavigator();
const LOCATION_TASK_NAME = "background-location-task";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data() || {};
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status in main", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let backPerm = await Location.requestBackgroundPermissionsAsync();
      console.log("backPerm", backPerm);

      if (backPerm.status === "granted") {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
        });
      }
    })();
  }, []);

  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (data) {
      const { locations } = data;
      // do something with the locations captured in the background
      console.log("locations in task manager", locations);
    }
  });

  console.log("console log location", location);
  console.log(errorMsg);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .catch(function (error) {
        console.log(error);
      });

    setUser({});
  };

  return (
    <Tab.Navigator
      initialRouteName="Screens 1"
      screenOptions={{
        activeTintColor: '#6ede8a',
        itemStyle: { marginVertical: 10 },
        inactiveTintColor: '#dde5b6',
        style: {
          backgroundColor: '#00818A',
        },
      }}
    >
      {!user.id ? (
        <>
          <Tab.Screen
            name="Log In"
            component={(props) => <LogIn {...props} />}
          />
          <Tab.Screen
            name="Sign Up"
            component={(props) => <SignUp {...props} />}
          />
        </>
      ) : (
        <>
          <Tab.Screen name="Screens 1">
            {(props) => <Screens1Navigator {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Screens 2">
            {(props) => <Screens2Navigator {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Screens 3">
            {(props) => <Screens3Navigator {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Log Out">
            {(props) => <LogOut {...props} logOut={logOut} />}
          </Tab.Screen>
        </>
      )}
    </Tab.Navigator>
  );
};

export default Main;
