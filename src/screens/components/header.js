import {View, Text} from 'react-native';
import React from 'react';
export const Header = () => {
  <View>
    <Text
      style={{
        fontFamily:
          Platform.OS == 'android'
            ? 'Logo-Regular'
            : 'FONTSPRINGDEMO-BlueVinylRegular',
        fontSize: 35,
        textAlign: 'center',
        // lineHeight: 29,
        color: 'white',
      }}>
      Sociable
    </Text>
  </View>;
};
