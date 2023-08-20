import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

export default function showAlert(textBody) {
  if (textBody !== null && textBody !== '') {
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: 'Warning',
      textBody: textBody,
    });
  }
}
