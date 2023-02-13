import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const CustomFunction = ({url, method, data}) => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        let response;
        if (method === 'GET') {
          response = await axios.get(url);
        } else if (method === 'POST') {
          response = await axios.post(url, data);
        }
        setResponseData(response.data);
      } catch (e) {
        setError(e);
      }
    };

    makeRequest();
  }, [url, method, data]);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>Error: {error.message}</Text>
      ) : responseData ? (
        <Text style={styles.text}>Data: {JSON.stringify(responseData)}</Text>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomFunction;
