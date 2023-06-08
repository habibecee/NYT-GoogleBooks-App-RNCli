import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import {useForm, Controller} from 'react-hook-form';
import Avatar from '../../components/Avatar';

export default function LogIn() {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid, dirty},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = data => console.log(data);

  return (
    <View style={[GeneralStyles.container, styles.container]}>
      <ScrollView>
        <Avatar
          style={styles.Avatar}
          source={require('../../../assets/animations/simpleUserIcon.json')}
        />

        <View style={styles.InputContainer}>
          <Text style={styles.InputText}>E-Mail</Text>
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'Please enter your email!'},
              validate: value => {
                return (
                  [/[a-z]/, /[@]/, /[.]/].every(pattern =>
                    pattern.test(value),
                  ) || 'Please enter a valid email address!'
                );
              },
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
          {errors?.email && (
            <Text style={styles.ErrorText}>{errors?.email?.message}</Text>
          )}

          <Text style={styles.InputText}>Password</Text>
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'Please enter your password!'},
              maxLength: {value: 20, message: 'Password is too long!'},
              minLength: {
                value: 6,
                message: 'Password is minimum 6 characters!',
              },
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
          {errors?.password && (
            <Text style={styles.ErrorText}>{errors?.password?.message}</Text>
          )}

          <TouchableOpacity
            style={
              !isValid
                ? [styles.ButtonContainer, {opacity: 0.7}]
                : styles.ButtonContainer
            }
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.ButtonText}>Log In</Text>
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

  Avatar: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    marginBottom: 20,
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
