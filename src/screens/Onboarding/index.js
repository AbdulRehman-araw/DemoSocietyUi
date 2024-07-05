import { View, Text, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';

import { slides } from '../../utils/defaultData';

// *import components
import OnboardingItems from './components/OnboardingItems';
import styles from './styles/styles';
import { text } from '../../res/strings';
import { colors } from '../../styles/colors';
import { StackActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setOnBoarding } from '../../redux/slices/userDataSlice';
import { Images } from '../../assets/Images';

const { width } = Dimensions.get('window');

const Onboarding = ({ navigation }) => {

  const slidesRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [cureentIndex, setCurrentIndex] = useState(0);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const dispatch = useDispatch();

  const navigateToLogin = () => {
    dispatch(setOnBoarding(true));
    navigation.dispatch(StackActions.replace('login'));
  };

  return (
    <>
      <StatusBar backgroundColor={colors.white} />

      <SafeAreaView style={styles.container}>
        <ImageBackground source={Images.lightBG}>
          <View style={styles.TopBar}>
            <Text onPress={() => navigateToLogin()} style={styles.TopBarLeftText}>
              {text.skip}
            </Text>
          </View>
          <View
            style={{
              flex: 3,
            }}>
            <FlatList
              data={slides}
              renderItem={({ item }) => (
                <OnboardingItems
                  item={item}
                  scrollX={scrollX}
                  navigateLogin={navigateToLogin}
                />
              )}
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                },
              )}
              onViewableItemsChanged={viewableItemsChanged}
              viewabilityConfig={viewConfig}
              scrollEventThrottle={32}
              ref={slidesRef}
            />
            {/* <Paginator data={slides} scrollX={scrollX}/> */}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default Onboarding;
