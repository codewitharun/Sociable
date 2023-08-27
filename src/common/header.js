import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  ImageBackground,
} from 'react-native';
import React from 'react';
import CommonImage from '../screens/components/CommonImage';

const {height, width} = Dimensions.get('screen');
const Header = ({name}) => {
  return (
    <ImageBackground
      source={CommonImage.AuthHeader}
      style={{
        height: height * 0.4,
        width: width * 1,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
      }}>
        
      <View
        style={{
          height: height * 0.2,
          width: width * 0.95,
          alignSelf: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontFamily:
              Platform.OS == 'android'
                ? 'Logo-Regular'
                : 'FONTSPRINGDEMO-BlueVinylRegular',
            fontSize: 55,
            marginTop: 100,
            lineHeight: 60,
          }}>
          {name}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({});
