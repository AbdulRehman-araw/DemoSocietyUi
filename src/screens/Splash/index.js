import { Dimensions, Image, ImageBackground, SafeAreaView, StatusBar, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles/styles'
import { Images } from '../../assets/Images'
import { StackActions } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import LinearGradientPrimaryButton from '../../components/Button/LinearGradientPrimaryButton'

const { width } = Dimensions.get("window")

const Splash = ({ navigation }) => {
  const userData = useSelector(state => state.userDataReducer.userData);
  const onBoarding = useSelector(state => state.userDataReducer.onBoarding);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (userData?.access_token) {
  //       navigation.dispatch(
  //         StackActions.replace('drawer')
  //       )
  //     } else if (onBoarding) {
  //       navigation.dispatch(
  //         StackActions.replace('login')
  //       )
  //     } else {
  //       navigation.dispatch(
  //         StackActions.replace('onboarding')
  //       );
  //     }
  //   }, 2000);
  // }, [])

  const navigateToNextScreen = () => {
    if (userData?.access_token) {
      navigation.dispatch(
        StackActions.replace('drawer')
      )
    } else if (onBoarding) {
      navigation.dispatch(
        StackActions.replace('login')
      )
    } else {
      navigation.dispatch(
        StackActions.replace('onboarding')
      );
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar hidden />
      <ImageBackground source={Images.lightBG} resizeMode="cover" style={styles.backgroundImage} >
        <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
        <View style={styles.center}>
          <LinearGradientPrimaryButton title={'Continue'} onPress={() => navigateToNextScreen()}/>
        </View>
      </ImageBackground>

      {/* <Image source={Images.screen3} style={{width:"100%",height:400}} /> */}
    </SafeAreaView>
  )
}

export default Splash
