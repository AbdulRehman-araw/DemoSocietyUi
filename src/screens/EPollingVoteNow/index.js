import {
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    View,
  
  } from 'react-native';
  import React, { useState } from 'react';
  
  import { Images } from '../../assets/Images';
  import { text } from '../../res/strings';
  import PrimaryButton from '../../components/Button/PrimaryButton';
  import CustomText from '../../components/CustomText';
  import { fontsFamily } from '../../assets/Fonts';
  import { styles } from './styles/styles';
  import { colors } from '../../styles/colors';
  import HeaderClose from '../../components/Header/HeaderClose';
import { useEffect } from 'react';

  
  const { width } = Dimensions.get("window")
  
   
  
  const EPollingVote = ({ navigation }) => {
  const [ changecolor, setChangeColor ] = useState('')
  const [isClicked, setIsClicked] = useState(false);
  


const changetextcolor = () => {
if(!isClicked){
    setIsClicked(colors.primary)
}else{
    setIsClicked('')
}
   
 }


    const goBack = () => {
      navigation.goBack()
    }



    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <StatusBar translucent backgroundColor={colors.white} barStyle="light-content" />
  
   <View style={{ paddingHorizontal: width * 0.025, flex: 1,marginTop:30 }}>         
     
     <HeaderClose
        onBack={goBack}
        leftarrow={{ marginLeft: 10 }}
        title={"Terminate 5 star bathroom"}
        showRightBtn={true}
        headertext={{fontSize:width*0.042,}}
      /> 

<View style={styles.line}/> 
        
<CustomText
fontWeight={fontsFamily.bold}
style={styles.viewtext}>
 Is there any need of terminating 
  </CustomText>   

  <CustomText
  fontWeight={fontsFamily.bold}
  style={styles.viewtext2}>
   five star bathroom from the lobby?
    </CustomText>   
    
<TouchableOpacity style= {styles.btn}
 onPress={changetextcolor}>
 <View style={styles.viewtextimg}> 
 <View style={styles.bullet}/>       
    <CustomText fontWeight={fontsFamily.bold}
     style={{
     color: isClicked ? colors.white: styles.txt1,
      }}>
        Yes 
          </CustomText>         
</View>
</TouchableOpacity>
  
<TouchableOpacity style={styles.btn2}>
 <View style={styles.viewtextimg}>
  <View style={styles.bullet}/> 
  <CustomText fontWeight={fontsFamily.bold}
     style={styles.txt}>
            NO
          </CustomText>         
</View>
</TouchableOpacity>
     
    <View style={{ marginVertical:width*0.45 }}>
              <PrimaryButton
                customStyle={{ padding: width * 0.035, width: width * 0.88, marginLeft: 10 }}
                title={text.submit}
                paytitle={{ fontSize: width * 0.043 }}
                onPress={() =>  navigation.navigate("feedBack")}
              />
        </View>

        </View>
         </SafeAreaView>
  
    );
  };
       
  

  export default EPollingVote;

