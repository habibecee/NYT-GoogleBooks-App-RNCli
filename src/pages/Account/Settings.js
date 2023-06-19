import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import {MainContext} from '../../Context/Context';
import Avatar from '../../components/Avatar';
import {Controller, set} from 'react-hook-form';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
import Button from '../../components/Button';

export default function Settings({route}) {
  const uid = route.params.uid;

  const {
    showInput,
    showAvatarUrl,
    updateProfile,
    control,
    handleSubmit,
    dbCheck,
    userData,
    setUserData,
    formState: {errors, isValid, dirty},
  } = useContext(MainContext);

  useEffect(() => {
    dbCheck(uid).then(userData => {
      setUserData(userData);
    });
  }, []);

  return (
    <View style={[GeneralStyles.container, styles.container]}>
      <FlashMessage position="top" />
      <ScrollView>
        <View style={styles.changeAvatar}>
          <TouchableOpacity>
            {userData?.avatar ? (
              <Image style={styles.Avatar} source={{uri: userData?.avatar}} />
            ) : (
              <Avatar
                style={styles.Avatar}
                source={require('../../../assets/animations/read-book.json')}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={showInput}>
            <Text style={styles.changeText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.InputContainer}>
          {showAvatarUrl && (
            <>
              <Text style={styles.InputText}>Avatar</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                  message: 'Please enter url!',
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.TextInput}
                    placeholderTextColor={colors.secondary}
                    placeholder="Avatar"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    defaultValue={userData?.avatar}
                  />
                )}
                name="avatar"
              />
              {errors?.avatar && (
                <Text style={styles.ErrorText}>{errors?.avatar?.message}</Text>
              )}
            </>
          )}
          <Text style={styles.InputText}>Display Name</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              message: 'Please enter your name!',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.TextInput}
                placeholderTextColor={colors.secondary}
                placeholder="Display Name"
                onBlur={onBlur}
                onChangeText={onChange}
                defaultValue={userData?.username}
              />
            )}
            name="username"
          />
          {errors?.username && (
            <Text style={styles.ErrorText}>{errors?.username?.message}</Text>
          )}

          <Text style={styles.InputText}>Email</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              message: 'Please enter a valid email address!',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.TextInput}
                placeholderTextColor={colors.secondary}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                defaultValue={userData?.email}
                autoCapitalize={'none'}
              />
            )}
            name="email"
          />
          {errors?.email && (
            <Text style={styles.ErrorText}>{errors?.email?.message}</Text>
          )}

          <Text style={styles.InputText}>Password</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              message: 'Please enter your password!',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.TextInput}
                placeholderTextColor={colors.secondary}
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                defaultValue={userData?.password}
                secureTextEntry
                autoCapitalize={'none'}
              />
            )}
            name="password"
          />
          {errors?.password && (
            <Text style={styles.ErrorText}>{errors?.password?.message}</Text>
          )}

          <Button
            onPress={handleSubmit(updateProfile)}
            title="Save Changes"
            styleButton={
              !isValid
                ? {backgroundColor: colors.dark, opacity: 0.7}
                : {backgroundColor: colors.dark}
            }
            isValid={isValid}
            disabled={!isValid}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    justifyContent: 'center',
  },

  changeAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  changeText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.secondary,
  },

  Avatar: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    marginBottom: 5,
    width: 150,
    minHeight: 150,
    borderRadius: 100,
  },

  InputContainer: {
    margin: 10,
    padding: 10,
    gap: 10,
  },

  InputText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.dark,
  },

  TextInput: {
    borderWidth: 1,
    borderColor: colors.dark,
    padding: 10,
    borderRadius: 10,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.dark,
  },

  ErrorText: {
    color: 'red',
    fontFamily: fonts.regular,
    fontSize: 16,
  },
});
