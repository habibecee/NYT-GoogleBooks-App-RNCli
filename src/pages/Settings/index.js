import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import {MainContext} from '../../Context/Context';
import Avatar from '../../components/Avatar';
import {Controller} from 'react-hook-form';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';

export default function Settings({route}) {
  const {id, item} = route.params;
  const {
    logOut,
    showInput,
    showAvatarUrl,
    user,
    updateProfile,
    control,
    handleSubmit,
    formState: {errors, isValid, dirty},
  } = useContext(MainContext);

  return (
    <View style={[GeneralStyles.container, styles.container]}>
      <FlashMessage position="top" />
      <ScrollView>
        <View style={styles.changeAvatar}>
          <TouchableOpacity>
            <Avatar
              style={styles.Avatar}
              source={require('../../../assets/animations/read-book.json')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showInput}>
            <Text style={styles.changeText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.InputContainer}>
          {showAvatarUrl && (
            <>
              <Text style={styles.InputText}>Avatar Url</Text>
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
                    placeholder="Avatar Url"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="Avatar Url"
              />
              {item?.errors?.photoURL && (
                <Text style={styles.ErrorText}>
                  {item?.errors?.photoURL?.message}
                </Text>
              )}
            </>
          )}
          <Text style={styles.InputText}>Username</Text>
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
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="Username (E-Mail)"
          />
          {item?.errors?.displayName && (
            <Text style={styles.ErrorText}>
              {item?.errors?.displayName?.message}
            </Text>
          )}

          <Text style={styles.InputText}>Mail</Text>
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
                placeholder="E-Mail"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize={'none'}
              />
            )}
            name="Email"
          />
          {item?.errors?.email && (
            <Text style={styles.ErrorText}>{item?.errors?.email?.message}</Text>
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
                value={value}
                secureTextEntry
                autoCapitalize={'none'}
              />
            )}
            name="password"
          />
          {item?.errors?.password && (
            <Text style={styles.ErrorText}>
              {item?.errors?.password?.message}
            </Text>
          )}

          <TouchableOpacity
            style={
              !isValid
                ? [styles.ButtonContainer, {opacity: 0.7}]
                : styles.ButtonContainer
            }
            disabled={!isValid}
            onPress={handleSubmit(updateProfile)}>
            <Text style={styles.ButtonText}>Save Changes</Text>
          </TouchableOpacity>
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

  ButtonContainer: {
    backgroundColor: colors.dark,
    padding: 10,
    borderRadius: 10,
  },
  ButtonText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});
