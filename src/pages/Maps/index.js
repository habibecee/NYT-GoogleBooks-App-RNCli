import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useContext, useRef} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import useFetch from '../../Context/useFetch';
import LoadingMap from '../../components/LoadingMap';
import {MainContext} from '../../Context/Context';
import UserMarker from '../../components/Marker';

export default function Maps() {
  const {userData, user} = useContext(MainContext);
  const {data, loading, error} = useFetch(
    'https://random-data-api.com/api/v2/users?size=16',
  );

  const mapRef = useRef();

  const activeCard = coordinates => {
    mapRef.current.animateToRegion({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: 10,
      longitudeDelta: 10,
    });
  };
  return (
    <View style={[GeneralStyles.container, styles.container]}>
      {loading ? (
        <LoadingMap />
      ) : (
        <MapView
          // provider={PROVIDER_GOOGLE}
          style={styles.MapView}
          // showsUserLocation={true}
          // initialRegion={{
          //   latitude: 41.0854333,
          //   longitude: 29.0413267,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
        >
          {user && (
            <UserMarker
              coordinate={{
                latitude: 41.0854333,
                longitude: 29.0413267,
              }}
              title={userData?.username}
              description={userData?.email}
              UserImage={userData?.avatar && {uri: userData?.avatar}}
            />
          )}

          {data.map(user => {
            return (
              <UserMarker
                key={user?.id}
                UserImage={{uri: user?.avatar}}
                coordinate={{
                  latitude: user?.address?.coordinates?.lat,
                  longitude: user?.address?.coordinates?.lng,
                }}
                title={`${user?.first_name} ${user?.last_name}`}
                description={user?.employment?.title}
                onPress={() => activeCard}
              />
            );
          })}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },

  ScrollView: {
    flex: 1,
    width: '100%',
  },

  MapView: {
    width: '100%',
    height: Dimensions.get('screen').height,
  },

  SubText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.dark,
    textAlign: 'center',
    marginBottom: 20,
  },
});
