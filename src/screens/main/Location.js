import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, RESULTS } from 'react-native-permissions';

const YourComponent = () => {
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      const result = await check('location');
      setLocationPermission(result);
    } catch (error) {
      console.log('Error checking location permission:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const result = await request('location');
      setLocationPermission(result);
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  };

  const turnOnLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        // Location is successfully enabled
        setLocationPermission(RESULTS.GRANTED);
      },
      error => {
        console.log('Error turning on location:', error);
      }
    );
  };

  const renderLocationPopup = () => {
    return (
      <View>
        <Text>Please turn on your device's location.</Text>
        {locationPermission === RESULTS.DENIED ? (
          <Button title="Request Location Permission" onPress={requestLocationPermission} />
        ) : (
          <Button title="Turn On Location" onPress={turnOnLocation} />
        )}
      </View>
    );
  };

  return (
    <View>
      {locationPermission !== RESULTS.GRANTED && renderLocationPopup()}
      {/* Your other components */}
    </View>
  );
};

export default YourComponent;
