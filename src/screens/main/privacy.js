import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {height, width} from '../components/Colors';

const Privacy = ({navigation}) => {
  return (
    <SafeAreaView>
      <View
        style={{backgroundColor: 'gray', height: height * 1, width: width * 1}}>
        <Text>Your Privacy</Text>

        <Text>Please read Privacy Policy</Text>

        <Text>Reservation of Rights</Text>

        <Text>
          We reserve the right to request that you remove all links or any
          particular link to our Website. You approve to immediately remove all
          links to our Website upon request. We also reserve the right to amen
          these terms and conditions and it’s linking policy at any time. By
          continuously linking to our Website, you agree to be bound to and
          follow these linking terms and conditions.
        </Text>

        <Text>Removal of links from our website</Text>

        <Text>
          If you find any link on our Website that is offensive for any reason,
          you are free to contact and inform us any moment. We will consider
          requests to remove links but we are not obligated to or so or to
          respond to you directly.
        </Text>

        <Text>
          We do not ensure that the information on this website is correct, we
          do not warrant its completeness or accuracy; nor do we promise to
          ensure that the website remains available or that the material on the
          website is kept up to date.
        </Text>

        <Text styles={{fontWeight: 'bold'}}>Disclaimer</Text>

        <Text>
          To the maximum extent permitted by applicable law, we exclude all
          representations, warranties and conditions relating to our website and
          the use of this website. Nothing in this disclaimer will:
        </Text>

        <Text>
          The limitations and prohibitions of liability set in this Section and
          elsewhere in this disclaimer: (a) are subject to the preceding
          paragraph; and (b) govern all liabilities arising under the
          disclaimer, including liabilities arising in contract, in tort and for
          breach of statutory duty.
        </Text>

        <Text>
          As long as the website and the information and services on the website
          are provided free of charge, we will not be liable for any loss or
          damage of any nature.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Privacy;

const styles = StyleSheet.create({});
