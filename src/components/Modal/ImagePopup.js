import { View, Modal, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import { baseUrl } from '../../../axios'
import { Images } from '../../assets/Images'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import ImageZoom from 'react-native-image-pan-zoom';


const { width, height } = Dimensions.get('window')

const ImagePopup = ({ open, close, image }) => {
  console.log('file: ImagePopup.js:8 => ImagePopup => open:', open)
  console.log('file: ImagePopup.js:8 => ImagePopup => image:', image)
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => close()}>
       <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={width}
                       imageHeight={width*1.5}>
        <TouchableOpacity activeOpacity={1} onPress={() => close()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.darkGray }}>
          <View style={{ height: 500, width: '90%', borderRadius: 8, alignItems: 'center', justifyContent: "center" }}>
            {image && <Image source={{ uri: image }} resizeMode="center" style={{ width: '100%', height: '100%' }} />}
          </View>
        </TouchableOpacity>
      </ImageZoom>
    </Modal>
  )
}

export default ImagePopup