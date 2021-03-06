import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { _createGroupTask } from '../store/task';
import { useNavigation } from '@react-navigation/core';
import { DismissKeyboard } from '../services/dismissKeyboard';

const AddGroupTask = (props) => {
  const [text, onChangeText] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedGroup = useSelector((state) => state.groups.selectedGroup);

  const onSubmit = async () => {
    await dispatch(
      _createGroupTask(selectedGroup.id, {
        name: text,
      })
    );
    onChangeText('');
    navigation.navigate('Group Tasks');
  };
  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboard>
      <View
        style={{
          margin: 20,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Image
          source={require('../public/nudgie2.png')}
          style={styles.nudgie}
        />
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Text style={styles.title}>
            New Task in {selectedGroup.group.name}
          </Text>
          <TextInput
            style={styles.itemName}
            onChangeText={onChangeText}
            value={text}
            placeholder="Enter item name"
          />
        </View>
        <TouchableOpacity style={styles.save} onPress={onSubmit} title="save">
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.save}
          onPress={() => navigation.navigate('Group Tasks')}
          title="cancel"
        >
          <Text style={styles.saveText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </DismissKeyboard>
    </SafeAreaView>
  );
};
export default AddGroupTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 20,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: 'transparent',
    borderRadius: 4,
    margin: 5,
    padding: 10,
    width: 250,
    backgroundColor: '#EBF6EF',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  selected: {
    backgroundColor: '#83CA9E',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 90,
    width: 80,
    margin: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  notSelected: {
    backgroundColor: '#EBF6EF',
    color: 'gray',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 90,
    width: 80,
    margin: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  nudgie: {
    height: 150,
    width: 150,
    borderRadius: 24,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  selectedText: {
    color: 'black',
    fontWeight: 'bold',
  },
  notSelectedText: {
    color: 'gray',
  },
  save: {
    justifyContent: 'center',
    width: 80,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 1,
    elevation: 3,
    backgroundColor: '#83CA9E',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    marginTop: 10,
  },
  saveText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  storeIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    marginBottom: 5,
  },
  notSelectedPriority: {
    backgroundColor: '#EBF6EF',
    color: 'gray',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 30,
    width: 100,
    margin: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
});
