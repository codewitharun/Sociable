import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {mediaDevices, RTCView} from 'react-native-webrtc';

const Notify = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const startLocalStream = async () => {
    console.log('Start Local Stream');
    if (!localStream) {
      try {
        const stream = await mediaDevices.getUserMedia({video: true});
        setLocalStream(stream);
      } catch (e) {
        console.error('Error starting local stream:', e);
      }
    }
  };

  const stopLocalStream = () => {
    console.log('Stop Local Stream');
    if (localStream) {
      localStream.release();
      setLocalStream(null);
    }
  };

  const startRemoteStream = async () => {
    console.log('Start Remote Stream');
    if (!remoteStream) {
      try {
        const stream = await mediaDevices.getUserMedia({video: true});
        setRemoteStream(stream);
      } catch (e) {
        console.error('Error starting remote stream:', e);
      }
    }
  };

  const stopRemoteStream = () => {
    console.log('Stop Remote Stream');
    if (remoteStream) {
      remoteStream.release();
      setRemoteStream(null);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {localStream && (
          <RTCView streamURL={localStream.toURL()} style={styles.localStream} />
        )}
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteStream}
          />
        )}
        <View style={styles.footer}>
          <Button title="Start Local" onPress={startLocalStream} />
          <Button title="Stop Local" onPress={stopLocalStream} />
          <Button title="Start Remote" onPress={startRemoteStream} />
          <Button title="Stop Remote" onPress={stopRemoteStream} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C0C0C0',
  },
  localStream: {
    flex: 1,
  },
  remoteStream: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
});

export default Notify;
