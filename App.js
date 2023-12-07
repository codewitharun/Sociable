import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {store} from './src/redux/store';
import thunk from 'redux-thunk';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {Provider} from 'react-redux';
import Routes from './src/screens/routes/routes';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = ({navigation}) => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <AlertNotificationRoot theme="light">
          <Routes />
        </AlertNotificationRoot>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
