import {showMessage, hideMessage} from 'react-native-flash-message';
export default function showAlert(textBody, type) {
  if (textBody !== null && textBody !== '') {
    showMessage({
      message: textBody,
      type: type,
    });
  }
}
