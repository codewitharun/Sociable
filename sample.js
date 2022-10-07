<SafeAreaView style={{backgroundColor: 'black'}}>
  <View
    style={{
      height: height * 1,
      justifyContent: 'center',
      width: width * 1,
      backgroundColor: 'black',
    }}>
    <View style={{height: '12%', width: '90%', alignSelf: 'center'}}>
      <Text
        style={{
          fontFamily:
            Platform.OS == 'android'
              ? 'Logo-Regular'
              : 'FONTSPRINGDEMO-BlueVinylRegular',
          fontSize: 35,
          textAlign: 'center',
          // lineHeight: 29,
          color: 'white',
        }}>
        Welcome
      </Text>
    </View>
  </View>
</SafeAreaView>;
