import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import RootStack from './src/navigation/RootStack';
import {toastConfig} from './src/utils/toastConfig';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {PermissionsAndroid, StatusBar} from 'react-native';
import {apiCall} from './src/Services/apiCall';
import {colors} from './src/styles/colors';

let persistor = persistStore(store);

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function App() {
  // const navigation = useNavigation();
  const [initialRoute, setInitialRoute] = useState('Home');

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification 36 ===>>',
  //       remoteMessage,
  //     );
  //     navigate(remoteMessage.data.pagename);
  //   });
  //   messaging().onMessage(remoteMessage => {
  //     console.log(
  //       'Notification 43 ===>>',
  //       remoteMessage,
  //     );
  //     // navigate(remoteMessage.data.pagename);
  //   })

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification 55 ===>>',
  //           remoteMessage,
  //         );
  //         navigate(remoteMessage.data.pagename);
  //         setInitialRoute(remoteMessage.data.pagename); // e.g. "Settings"
  //       }
  //       // setLoading(false);
  //     });
  // }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <RootStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
}

export default App;
