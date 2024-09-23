import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Images } from '../assets/Images';
import { colors } from '../styles/colors';
import CustomText from '../components/CustomText';
import { fontsFamily } from '../assets/Fonts';
import DrawerScreenWrapper from '../components/DrawerScreenWrapper';


const MyTabBar = ({ state, descriptors, navigation }) => {

  const renderIcons = (label, isFocused) => {
    if (label == 'userHome' && isFocused) {
      return Images.activeHome
    } else if (label == 'userHome') {
      return Images.InactiveHome
    }
    if (label == 'community' && isFocused) {
      return Images.activeCommunity
    } else if (label == 'community') {
      return Images.InactiveCommunity
    }
    if (label == 'discussion' && isFocused) {
      return Images.activeDiscussion
    } else if (label == 'discussion') {
      return Images.InactiveDiscussion
    }
    if (label == 'profile' && isFocused) {
      return Images.activeUser
    } else if (label == 'profile') {
      return Images.InactiveUser
    }
  }

  return (
    <DrawerScreenWrapper style={{ flex: 0 }}>
      <View
        style={styles.tabBarStyle}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={label}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center' }}>
              <Image
                source={renderIcons(label, isFocused)}
                resizeMode="contain"
                style={{
                  // tintColor: isFocused ? colors.primary : colors.gray,
                  width: '100%',
                  height: 35,
                }}
              />
              <CustomText
                children={label}
                fontWeight={fontsFamily.regular}
                style={{ top: 4, color: isFocused ? colors.dark : colors.darkGray, fontSize:12 }} />
            </TouchableOpacity>
          );
        })}
      </View>
    </DrawerScreenWrapper>
  );
};

export default MyTabBar;

const styles = StyleSheet.create({
  tabBarStyle: {
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    borderBottomLeftRadius:21,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    // paddingBottom: 16,
    width: '100%',
    zIndex: 0,
    flexDirection: "row"
  },
});
