import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import { firebase } from '../config/firebase';
import React, { useState, useEffect } from 'react';

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Nudge for Toothpaste',
    body: 'You are close to a Target, do you still need toothpaste?',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

const Screen1 = (props) => {

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is Screen 1</Text>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(
            'ExponentPushToken[HUGDheOPfKBBF_iDUs2ETG]'
          );
          console.log('sent');
        }}
      />

      <TouchableOpacity onPress={()=>console.log('pressed')}>
        <Text>Fetch All Task</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
