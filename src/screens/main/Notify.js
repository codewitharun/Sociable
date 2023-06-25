import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import {Button, Text, View, SafeAreaView, TextInput} from 'react-native';
import io from 'socket.io-client';
import {
  RTCView,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices,
} from 'react-native-webrtc';

const Notify = () => {
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [prod, setProd] = useState(true);
  const [user, setUser] = useState('arun');
  const [roomId, setRoomId] = useState('test');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const link = prod
      ? 'https://sociable-xisn.onrender.com'
      : 'http://10.0.2.2:3001';
    socketRef.current = io(link, {
      transports: ['websocket'],
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      // socketRef.current.emit('joinSession', user);s
      // socketRef.current.emit('joinSession', user, roomId);
      // Join the session with user and room ID
      // Join the session with user and room ID
    });

    socketRef.current.on('incomingOffer', async data => {
      try {
        const {offer, socketId} = data;
        const configuration = {
          iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
        };
        const peerConnection = new RTCPeerConnection(configuration);
        peerConnectionRef.current = peerConnection;

        peerConnection.onicecandidate = event => {
          if (event.candidate) {
            const iceCandidateData = {
              candidate: event.candidate,
              socketId,
            };
            socketRef.current.emit('iceCandidate', iceCandidateData);
          }
        };

        peerConnection.ontrack = event => {
          const remoteStream = event.streams[0];
          remoteStreamRef.current = remoteStream;
        };

        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer),
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        const answerData = {
          answer: peerConnection.localDescription,
          socketId,
        };
        socketRef.current.emit('answer', answerData);
      } catch (error) {
        console.error('Error handling incoming offer:', error);
      }
    });

    socketRef.current.on('incomingAnswer', async data => {
      try {
        const {answer, socketId} = data;
        const peerConnection = peerConnectionRef.current;
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(answer),
        );
      } catch (error) {
        console.error('Error handling incoming answer:', error);
      }
    });

    socketRef.current.on('incomingIceCandidate', async data => {
      try {
        const {candidate, socketId} = data;
        const peerConnection = peerConnectionRef.current;
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error('Error handling incoming ICE candidate:', error);
      }
    });

    // return () => {
    //   socketRef.current.disconnect();
    // };
  }, []);

  const disconnectSocket = () => {
    socketRef.current.disconnect(); // Disconnect the socket
    setIsConnected(false);

    // Replace 'your-room-id' with the actual room ID
    socketRef.current.emit('disconnectRoom', roomId);
  };
  const initiateCall = async () => {
    socketRef.current.emit('joinSession', {user, roomId});
    try {
      const stream = await mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;

      const configuration = {
        iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
      };
      const peerConnection = new RTCPeerConnection(configuration);
      peerConnectionRef.current = peerConnection;

      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });

      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          const data = {
            candidate: event.candidate,
            socketId: 'server',
          };
          socketRef.current.emit('iceCandidate', data);
        }
      };

      peerConnection.ontrack = event => {
        const remoteStream = event.streams[0];
        remoteStreamRef.current = remoteStream;
      };

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      const roomIdentifier = roomId == '' ? generateRoomId() : roomId; // Generate a random room ID
      setRoomId(roomIdentifier); // Set the generated room ID in state

      const data = {
        offer: peerConnection.localDescription,
        roomId: roomIdentifier,
      };
      socketRef.current.emit('offer', data);
    } catch (error) {
      console.error('Error initializing video call:', error);
    }
  };

  const generateRoomId = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return result;
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={{color: 'black'}}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </Text>
        <Text style={{color: 'black'}}>Room ID: {roomId}</Text>
        <TextInput
          style={{color: 'black'}}
          placeholder="Custom Room id "
          onChangeText={txt => {
            setRoomId(txt);
          }}
        />
        <TextInput
          style={{color: 'black'}}
          placeholder="Custom User "
          onChangeText={txt => {
            setUser(txt);
          }}
        />
        <Button
          title="Click me"
          onPress={() => {
            initiateCall();
          }}
        />
        {/* Render remote and local video streams */}
        {remoteStreamRef.current && (
          <RTCView
            streamURL={remoteStreamRef.current.toURL()}
            style={{width: 200, height: 150}}
          />
        )}
        {localStreamRef.current && (
          <RTCView
            streamURL={localStreamRef.current.toURL()}
            style={{width: 200, height: 150}}
          />
        )}
        <Button
          title="Disconnect"
          onPress={() => {
            disconnectSocket();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notify;
