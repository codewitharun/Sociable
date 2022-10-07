import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {height, width} from '../components/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Dashboard = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View
        style={{
          height: height * 1,
          // justifyContent: 'flex-start',
          width: width * 1,
          backgroundColor: 'black',
        }}>
        <View
          style={{
            height: '9%',
            width: '95%',
            backgroundColor: 'red',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily:
                  Platform.OS == 'android'
                    ? 'Logo-Regular'
                    : 'FONTSPRINGDEMO-BlueVinylRegular',
                fontSize: 35,
                // textAlign: 'center',
                // lineHeight: 29,
                color: 'white',
              }}>
              Sociable
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity>
                <Icon name="rocket" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity>
                <Icon name="rocket" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
