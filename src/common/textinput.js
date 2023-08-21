import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {height, width} from '../screens/components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CommonTextInput = ({
  placeholder,
  showEye,
  setText,
  validate,
  hidden,
  hide,
}) => {
  return (
    <View
      style={{
        width: width * 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.09,
        flexDirection: 'row',
        // backgroundColor: 'green',
      }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'#BDBDBD'}
        secureTextEntry={hidden}
        autoCapitalize={false}
        onChangeText={txt => {
          setText(txt), validate(txt);
        }}
        style={{
          backgroundColor: '#F3F5F7',
          borderRadius: 30,
          paddingHorizontal: 20,
          color: '#BDBDBD',
          fontFamily: 'InstagramSans-Medium',
          alignSelf: 'center',

          width: '85%',
          height: '70%',
          fontSize: 16,
        }}
      />

      {hide && (
        <TouchableOpacity onPress={() => showEye()} style={styles.eyeIcon}>
          {/* You can use appropriate icons or images for the show/hide toggle */}
          {hidden ? (
            <Icon name="eye-off" size={30} color="gray" />
          ) : (
            <Icon name="eye" size={30} color="gray" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CommonTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
    position: 'absolute',
    right: 40,
  },
});
