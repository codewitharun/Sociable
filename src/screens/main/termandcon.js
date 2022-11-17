import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import {height, width} from '../components/Colors';

const Termandcon = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            backgroundColor: 'gray',
            height: height * 1,
            width: width * 1,
          }}>
          <Text>Terms and Conditions</Text>

          <Text style={{fontWeight: 'bold'}}>Welcome to Sociable!</Text>

          <Text>
            These terms and conditions outline the rules and regulations for the
            use of Sociable's Website, located at codewitharun.github.io.
          </Text>

          <Text>
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use Sociable if you do not agree to
            take all of the terms and conditions stated on this page.
          </Text>

          <Text>
            The following terminology applies to these Terms and Conditions,
            Privacy Statement and Disclaimer Notice and all Agreements:
            "Client", "You" and "Your" refers to you, the person log on this
            website and compliant to the Companys terms and conditions. "The
            Company", "Ourselves", "We", "Our" and "Us", refers to our Company.
            "Party", "Parties", or "Us", refers to both the Client and
            ourselves. All terms refer to the offer, acceptance and
            consideration of payment necessary to undertake the process of our
            assistance to the Client in the most appropriate manner for the
            express purpose of meeting the Clients needs in respect of provision
            of the Companys stated services, in accordance with and subject to,
            prevailing law of Netherlands. Any use of the above terminology or
            other words in the singular, plural, capitalization and/or he/she or
            they, are taken as interchangeable and therefore as referring to
            same.
          </Text>

          <Text>License</Text>

          <Text>
            Unless otherwise stated, Sociable and/or its licensors own the
            intellectual property rights for all material on Sociable. All
            intellectual property rights are reserved. You may access this from
            Sociable for your own personal use subjected to restrictions set in
            these terms and conditions.
          </Text>

          <Text>You must not:</Text>

          <Text>
            This Agreement shall begin on the date hereof. Our Terms and
            Conditions were created with the help of the Aruns mind
          </Text>

          <Text>
            Parts of this website offer an opportunity for users to post and
            exchange opinions and information in certain areas of the website.
            Sociable does not filter, edit, publish or review Comments prior to
            their presence on the website. Comments do not reflect the views and
            opinions of Sociable,its agents and/or affiliates. Comments reflect
            the views and opinions of the person who post their views and
            opinions. To the extent permitted by applicable laws, Sociable shall
            not be liable for the Comments or for any liability, damages or
            expenses caused and/or suffered as a result of any use of and/or
            posting of and/or appearance of the Comments on this website.
          </Text>

          <Text>
            Sociable reserves the right to monitor all Comments and to remove
            any Comments which can be considered inappropriate, offensive or
            causes breach of these Terms and Conditions.
          </Text>

          <Text>
            You hereby grant Sociable a non-exclusive license to use, reproduce,
            edit and authorize others to use, reproduce and edit any of your
            Comments in any and all forms, formats or media.
          </Text>

          <Text>Hyperlinking to our Content</Text>

          <Text>
            These organizations may link to our home page, to publications or to
            other Website information so long as the link: is not in any way
            deceptive; does not falsely imply sponsorship, endorsement or
            approval of the linking party and its products and/or services; and
            fits within the context of the linking partys site.
          </Text>

          <Text>
            We may consider and approve other link requests from the following
            types of organizations:
          </Text>

          <Text>
            We will approve link requests from these organizations if we decide
            that: the link would not make us look unfavorably to ourselves or to
            our accredited businesses; the organization does not have any
            negative records with us; the benefit to us from the visibility of
            the hyperlink compensates the absence of Sociable; and the link is
            in the context of general resource information.
          </Text>

          <Text>
            These organizations may link to our home page so long as the link:
            is not in any way deceptive; does not falsely imply sponsorship,
            endorsement or approval of the linking party and its products or
            services; and fits within the context of the linking partys site.
          </Text>

          <Text>
            If you are one of the organizations listed in paragraph 2 above and
            are interested in linking to our website, you must inform us by
            sending an e-mail to Sociable. Please include your name, your
            organization name, contact information as well as the URL of your
            site, a list of any URLs from which you intend to link to our
            Website, and a list of the URLs on our site to which you would like
            to link. Wait 2-3 weeks for a response.
          </Text>

          <Text>
            No use of Sociable's logo or other artwork will be allowed for
            linking absent a trademark license agreement.
          </Text>

          <Text>Content Liability</Text>

          <Text>
            We shall not be hold responsible for any content that appears on
            your Website. You agree to protect and defend us against all claims
            that is rising on your Website. No link should appear on any Website
            that may be interpreted as libelous, obscene or criminal, or which
            infringes, otherwise violates, or advocates the infringement or
            other violation of, any third party rights.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Termandcon;

const styles = StyleSheet.create({});
