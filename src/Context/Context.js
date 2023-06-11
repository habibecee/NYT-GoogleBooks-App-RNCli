import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {NativeModules, RefreshControl, useColorScheme} from 'react-native';
import {useForm} from 'react-hook-form';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';

const MainContext = createContext();

const MainContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAvatarUrl, setShowAvatarUrl] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useForm({
    defaultValues: {
      username: 'habibe.ce1996@gmail.com',
      password: 'HabibeCe!.',
    },
  });

  const values = getValues();

  function showInput() {
    setShowAvatarUrl(!showAvatarUrl);
  }

  const logIn = () => {
    console.log('Log In');

    auth()
      .signInWithEmailAndPassword(values.username, values.password)
      .then(() => {
        showMessage({
          type: 'success',
          message: 'Success Sign in!',
        });

        console.log('Log in created user!');
      })
      .catch(error => {
        let message = error.message;

        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          message = 'That email address is already in use!';
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');

          message = 'That email address is invalid!';
        }

        if (error.code === 'auth/user-not-found') {
          console.log('User not found!');
          message = 'User not found!';
        }

        if (error.code === 'auth/wrong-password') {
          console.log('Wrong password!');
          message = 'Wrong password!';
        }

        if (error.code === 'auth/too-many-requests') {
          console.log('Too many requests!');
          message = 'Too many requests!';
        }

        if (error.code === 'auth/user-disabled') {
          console.log('User disabled!');
          message = 'User disabled!';
        }

        if (error.code === 'auth/operation-not-allowed') {
          console.log('Operation not allowed!');
          message = 'Operation not allowed!';
        }

        if (error.code === 'auth/invalid-credential') {
          console.log('Invalid credential!');
          message = 'Invalid credential!';
        }

        console.error(error);

        showMessage({
          type: 'danger',
          message,
        });
      });
  };

  const register = () => {
    console.log('Created user!');
    auth()
      .createUserWithEmailAndPassword(values.username, values.password)
      .then(() => {
        showMessage({
          type: 'success',
          message: 'Created user!',
        });

        setTimeout(() => {
          NativeModules.DevSettings.reload();
        }, 800);
      })
      .catch(error => {
        let message = error.message;

        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          message = 'That email address is already in use!';
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          message = 'That email address is invalid!';
        }

        if (error.code === 'auth/weak-password') {
          console.log('Password should be at least 6 characters!');
          message = 'Password should be at least 6 characters!';
        }

        if (error.code === 'auth/operation-not-allowed') {
          console.log('Operation not allowed!');
          message = 'Operation not allowed!';
        }

        console.error(error);

        showMessage({
          type: 'danger',
          message,
        });
      });
  };

  async function logOut() {
    await auth()
      .signOut()
      .then(() => {
        showMessage({
          type: 'success',
          message: 'Success Log Out!',
        });
      })
      .catch(error => {
        console.log('Error', error);
        showMessage({
          type: 'danger',
          message: "Something's wrong!",
        });
      });
  }

  console.log('Error', errors);

  function onAuthStateChanged(userParams) {
    setUser(userParams);
    if (loading) {
      setLoading(false);
    }
  }

  const updateProfile = async () => {
    const update = {
      username: values.username,
      password: values.password,
      displayName: values.displayName,
      photoURL: values.photoURL,
    };

    await auth().currentUser?.updateProfile(update);
    setTimeout(() => {
      NativeModules.DevSettings.reload();
    }, 800);
  };

  async function updateEmailVerified() {
    user
      ?.sendEmailVerification()
      .then(console.log('Email sent!'))
      .catch(error => console.log('Error', error));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    console.log('User', user);
  }, [user]);

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        logIn,
        register,
        updateProfile,
        logOut,
        control,
        handleSubmit,
        formState: {errors, isValid},
        values,
        onAuthStateChanged,
        showInput,
        showAvatarUrl,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export {useContext, MainContext, MainContextProvider};
