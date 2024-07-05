import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import screens
import Splash from '../screens/Splash';
import Onboarding from '../screens/Onboarding';
import Login from '../screens/Auth/Login';
import SignUpOtp from '../screens/Auth/SignUpOtp';
import AuthorizationPage from '../screens/Auth/AuthorizationPage';
import DrawerNavigation from './DrawerNavigation';
import ForgetPwd from '../screens/Auth/ForgetPwd';
import ForgetPwdOtp from '../screens/Auth/ForgetPwdOtp';
import Registration from '../screens/Auth/Registration';
import RegistrationTenant from '../screens/Auth/RegistrationTenant';

const RootStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: true,
        animation: 'none',
      }}>
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="onboarding" component={Onboarding} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="ForgetPwd" component={ForgetPwd} />
      <Stack.Screen name="ForgetPwdOtp" component={ForgetPwdOtp} />
      <Stack.Screen name="SignUpOtp" component={SignUpOtp} />
      <Stack.Screen name="AuthorizationPage" component={AuthorizationPage} />
      <Stack.Screen name="drawer" component={DrawerNavigation} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="RegistrationTenant" component={RegistrationTenant} />
    </Stack.Navigator>
  );
};

export default RootStack;
