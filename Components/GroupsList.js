import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllGroups } from '../store/group';

const GroupsList = (props) => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(fetchAllGroups());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Groups</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Add Group');
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Group Chat');
          }}
        >
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      <View style={styles.body}>
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <Image
                style={styles.image}
                source={require('../public/nudgie2.png')}
              />
              <View style={styles.info}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Add Group');
                  }}
                >
                  <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
              <Button
                style={styles.completedButton}
                title="Alert"
                onPress={() => {
                  console.log('sending bat signal');
                }}
              ></Button>
            </View>
          )}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default GroupsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  completedButton: {
    marginRight: 10,
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  item: {
    fontSize: 20,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    // borderWidth: 1,
    borderColor: '#FFFFFF',
    margin: 15,
    // backgroundColor: '#FAF3DD',
  },
  box: {
    display: 'flex',
    width: '95%',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#EBF6EF',
    flexDirection: 'row',
    shadowColor: 'black',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 15,
    padding: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
  },
  priority: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    backgroundColor: 'red',
    width: 25,
    height: 25,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  button: {
    backgroundColor: '#EBF6EF',
    padding: 5,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    margin: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  buttonText: {
    color: '#4a7c59',
    fontWeight: '700',
    fontSize: 22,
  },
  nudgie: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    margin: 5,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
});
