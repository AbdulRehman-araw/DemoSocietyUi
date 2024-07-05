import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { colors } from '../../../styles/colors'
import { fontsFamily } from '../../../assets/Fonts'
import CustomText from '../../../components/CustomText'
import { Fragment } from 'react'
import PrimaryButton from '../../../components/Button/PrimaryButton'
import { alphabet } from '../../../utils/defaultData'
import { Images } from '../../../assets/Images'


const { height, width } = Dimensions.get('window')
const QuestionCon = ({ state, setState, index, data }) => {
  const deleteOption = (i) => {
    let temp = [...state]
    let opt = temp[index].options
    opt.splice(i, 1)
    temp[index].options = opt
    setState(temp)
  }
  const deleteQuestion = () => {
    let temp = [...state]
    temp.splice(index, 1)
    setState(temp)
  }
  return (
    <Fragment>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: width * 0.04,
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: width * 0.03,
      }}>
        <TextInput
          placeholder={`Question`}
          placeholderTextColor={colors.gray}
          onChangeText={(e) => {
            let temp = [...state]
            temp[index].question = e
            setState(temp)
          }}
          style={[styles.Text, state.length < 1 && { width: '100%' }]}
        />
        {state.length > 1 && <TouchableOpacity onPress={() => deleteQuestion()} activeOpacity={1} style={styles.optionDelete}>
          <Image
            resizeMode='contain'
            style={[styles.img, { tintColor: colors.darkGray }]}
            source={Images.icondelete}
          />
        </TouchableOpacity>}
      </View>
      {data?.options.map((val, i) => (
        <View key={i} style={styles.optionsCon}>
          <View style={styles.optionsConMain}>
            <CustomText fontWeight={fontsFamily.regular} style={styles.optionText}>{alphabet[i].toUpperCase()}</CustomText>
          </View>
          <View style={styles.optionsConMainRight}>
            <TextInput
              placeholder=''
              placeholderTextColor={colors.black}
              style={[styles.TextInputCon, state[index].options.length < 2 && { width: "100%" }]}
              onChangeText={(e) => {
                let temp = [...state]
                let opt = temp[index].options
                opt[i].option = e
                temp[index].options = opt
                setState(temp)
              }}
            />
            {state[index].options.length > 2 && <TouchableOpacity onPress={() => deleteOption(i)} activeOpacity={1} style={styles.optionDelete}>
              <Image
                resizeMode='contain'
                style={[styles.img, { tintColor: colors.darkGray }]}
                source={Images.icondelete}
              />
            </TouchableOpacity>}
          </View>
        </View>
      ))}

    </Fragment>
  )
}

export default QuestionCon

const styles = StyleSheet.create({
  Text: {
    width: '85%',
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.05,
    fontFamily: fontsFamily.regular,
    color: colors.black,
  },
  optionsCon: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: width * 0.04
  },
  optionsConMain: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsConMainRight: {
    width: '70%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: width * 0.03,
  },
  optionText: {
    color: colors.black,
    fontSize: width * 0.035,
  },
  TextInputCon: {
    width: '85%',
    paddingHorizontal: width * 0.02,
    paddingVertical: width * 0.015,
    fontFamily: fontsFamily.regular,
    fontSize: width * 0.03,
    color: colors.black
  },
  optionDelete: {
    width: width * 0.04,
    height: width * 0.04,
    marginRight: width * 0.02
  },
  img: {
    width: '100%',
    height: '100%',
  },
  BtnMainCon: {
    width: '80%',
    alignSelf: 'center',
    // paddingVertical:10,
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})