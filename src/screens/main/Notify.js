import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Notify = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#007bff', '#ffffff']}
        style={styles.linearGradient}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}>
        {/* Your content here */}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    container: {
      width: 375,
      height: 106,
    },
    linearGradient: {
      flex: 1,
    },
  },
  halfMoon: {
    width: 120, // Adjust the width to change the size of the half-moon
    height: 120, // Adjust the height to change the size of the half-moon
    borderRadius: 60, // Half of the width and height
    backgroundColor: 'white', // Background color of the half-moon
    position: 'absolute',
    top: -60, // Position the half-moon above the box
    left: '50%', // Center the half-moon horizontally
    marginLeft: -60, // Offset by half of its width to center it
  },
  box: {
    width: '100%',
    height: 60,
    backgroundColor: 'blue', // Background color of the box
  },
});

export default Notify;
