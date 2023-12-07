import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CommonImage from '../screens/components/CommonImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('screen');

const ProfileHeader = ({name}) => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={CommonImage.ProfileHeader}
      style={styles.imageBackground}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left-thin" size={40} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{name}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: height * 0.2,
    width: width,
    justifyContent: 'center',
  },
  container: {
    height: height * 0.1,
    width: width * 0.95,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    width: '90%',
    fontFamily:
      Platform.OS === 'android'
        ? 'Logo-Regular'
        : 'FONTSPRINGDEMO-BlueVinylRegular',
    fontSize: 20,
    lineHeight: 60,
  },
});

export default ProfileHeader;
