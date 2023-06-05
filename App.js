import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {store} from './src/redux/store';
import thunk from 'redux-thunk';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {Provider} from 'react-redux';
import Routes from './src/screens/routes/routes';
const App = ({navigation}) => {
  return (
    <Provider store={store}>
      <AlertNotificationRoot>
        <Routes />
      </AlertNotificationRoot>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
