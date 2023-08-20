import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {height, width} from '../screens/components/Colors';
import LinearGradient from 'react-native-linear-gradient';

const CommonButton = ({name, onPress}) => {
  return (
    <View style={styles.Container}>
      <LinearGradient
        colors={['#888BF4', '#5151C6']}
        start={{x: 0, y: 1}} // bottom-left
        end={{x: 1, y: 0}} // top-right
        style={styles.touch}>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => {
            onPress();
          }}>
          <Text style={styles.button}>{name}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  Container: {
    height: height * 0.07,
    width: width * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    
  },
  button: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  touch: {
    borderRadius: 30,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    // backgroundColor:
  },
});
