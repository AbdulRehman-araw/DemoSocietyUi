import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerItems } from './DrawerItems';
import { BottomTab } from './BottomTab';
import Chatdiscussions from '../screens/ChatDiscussion';
import Addnewdiscussions from '../screens/NewDiscussion';
import { color } from 'react-native-reanimated';
import { colors } from '../styles/colors';
import { transparent } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

// import screens


const { width } = Dimensions.get("window")

export default function DrawerNavigation() {

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "slide",
        drawerStyle: {
          width: width * 0.7,
          backgroundColor: colors.white,
        },
        headerShown: false,
        drawerActiveBackgroundColor: Colors.transparent,
        drawerInactiveBackgroundColor: Colors.transparent,
        drawerActiveTintColor: colors.active,
        drawerInactiveTintColor: colors.inactive,
        overlayColor: Colors.transparent,
        sceneContainerStyle: {
          backgroundColor: colors.white
        },
      }}
      initialRouteName="bottomTab"
      drawerContent={props => <DrawerItems {...props} />}>
      <Drawer.Screen name="bottomTab" component={BottomTab} />
      <Drawer.Screen name="chat" component={Chatdiscussions} />
      <Drawer.Screen name="addNewDiscussion" component={Addnewdiscussions} />

    </Drawer.Navigator>

  );
}

const Colors = {
  bg: colors.primary,
  active: colors.white,
  inactive: colors.gray,
  transparent: 'transparent'
}

