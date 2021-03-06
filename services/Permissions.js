import React from 'react';
import { StyleSheet } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

const requestPermissions = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();

  if (status === 'granted') {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
    });
  }
};


TaskManager.defineTask(LOCATION_TASK_NAME, (loc) => {
  const error = loc.error;
  const data = loc.data;
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
  }
});

export default PermissionsButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#709775',
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
});
