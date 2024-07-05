import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { colors } from '../styles/colors';
// import colors from '../../styles/colors';
// import color from '../constants/color';


export const successToaster = (title,body) => {
  Toast.show({
    type: 'success',
    text1:title,
    text2: body,
    visibilityTime: 3000,
  });
}

export const errorToaster = (message) => {
  Toast.show({
    type: 'error',
    text2: message,
    visibilityTime: 3000,
  });
}


export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      style={{ borderLeftColor: colors.primary }}
      contentContainerStyle={{ paddingHorizontal: 15,zIndex:99 }}
      text2Style={{
        fontSize: 12,
        color: colors.BLACK,
        fontWeight: '500'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      style={{ borderLeftColor: colors.red, }}
      contentContainerStyle={{ paddingHorizontal: 15,zIndex:99 }}
      text2Style={{
        fontSize: 12,
        color: colors.red,
        fontWeight: '500'
      }}
    />
  ),
};