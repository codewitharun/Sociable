import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CommonImage from '../screens/components/CommonImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {height, width} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';
const ProfileHeader = ({name}) => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={CommonImage.ProfileHeader}
      style={{
        height: height * 0.2,
        width: width * 1,
        justifyContent: 'center',
        position: 'relative',
        // top: 0,
      }}>
      <View
        style={{
          height: height * 0.1,
          width: width * 0.95,
          alignSelf: 'center',
          //   justifyContent: 'center',
          position: 'absolute',
          top: 0,
          //   backgroundColor: 'red',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'space-between',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-left-thin" size={40} color={'white'} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              width: '90%',
              fontFamily:
                Platform.OS == 'android'
                  ? 'Logo-Regular'
                  : 'FONTSPRINGDEMO-BlueVinylRegular',
              fontSize: 20,
              lineHeight: 60,
              //   backgroundColor: 'red',
            }}>
            {name}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({});
