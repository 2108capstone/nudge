import { firebase } from '../config/firebase';
const SET_USER = 'SET_USER';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const logInUser = (email, password) => {
  return async (dispatch) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (response) => {
          const uid = response.user.uid;
          const usersRef = firebase.firestore().collection('users');
          usersRef
            .doc(uid)
            .get()
            .then((firestoreDocument) => {
              if (!firestoreDocument.exists) {
                alert('User does not exist anymore.');
                return;
              }
              const data = firestoreDocument.data();
              dispatch(setUser(data));
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const listenToUser = (uid) => {

  return async (dispatch) => {
    try {
      const usersRef = firebase.firestore().collection('users');
      await usersRef
        .doc(uid)
        .onSnapshot(

        )
        .catch(function (error) {
          console.log(error);
        });

      dispatch(setUser({}));
    } catch (err) {
      console.log(err);
    }
  };
};


export const logOutUser = () => {
  console.log('log out user button clicked')
  return async (dispatch) => {
    try {
      await firebase
        .auth()
        .signOut()
        .catch(function (error) {
          console.log(error);
        });

      dispatch(setUser({}));
    } catch (err) {
      console.log(err);
    }
  };
};

export const signUpUser = (email, password, first, last, location) => {
  return async (dispatch) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (response) => {
          const uid = response.user.uid;
          await AsyncStorage.setItem('USER_ID', uid);
          const data = {
            id: uid,
            email,
            fullName: first + last,
            lat: location.coords.latitude,
            long: location.coords.longitude,
          };

          const usersRef = firebase.firestore().collection('users');

          usersRef
            .doc(uid)
            .set(data)
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
      dispatch(setUser(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default (state = {user: {}}, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.user};
    default:
      return state;
  }
};
