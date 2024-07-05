import { View, Text, ToastAndroid, Alert } from 'react-native';
import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { Image } from 'react-native';
import { Modal } from 'react-native';
import { useState } from 'react';
import Pdf from 'react-native-pdf';
// import RNFetchBlob from 'rn-fetch-blob';
import BlobUtil from 'react-native-blob-util';
import { PermissionsAndroid } from 'react-native';
import { Images } from '../../../assets/Images';
import { fontsFamily } from '../../../assets/Fonts';
import { colors } from '../../../styles/colors';
import CustomText from '../../../components/CustomText';
import WarningModal from '../../../components/Modal/WarningModal';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share'
// import CameraRoll from '@react-native-community/cameraroll'

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const DocumentList = ({ data, name }) => {
  const [modal, setModalVisible] = useState(false);
  const [errorModal1, setErrorModal1] = useState(false);
  const [alertWarning, setAlertWarning] = useState('w');
  const [alertType, setAlertType] = useState('s');
  const [errorModalText, setErrorModalText] = useState('');
  const [errorModal, setErrorModal] = useState(false);

  let chk = data;

  const [loading, setLoading] = useState(false);

  const text = data;
  const parts = text?.split('Content/Attachments/Apartment/Rental/');

  if (parts?.length > 1) {
    const result = parts[1]; // Get everything after "Documents/"
    // console.log(result);
  } else {
    console.log("Text does not contain 'Documents/'");
  }

  const downloadImage = () => {


    console.log("download image using blob util =====");

    console.log(data);

    const filePath = data;
    let fileExtension = ''
    // Check if filePath is a non-empty string
    if (filePath && typeof filePath === 'string' && filePath.trim() !== '') {
      // Split the file path by dot ('.') character and get the last element
      const parts = filePath.split('.');
      fileExtension = parts[parts.length - 1];

      console.log('File extension:', fileExtension);
    } else {
      console.log('Invalid file path');
    }

    if (fileExtension == "pdf") {
      console.log("pdf ============");
      try {
        const source = `https://societyhood.mangotech-apps.com/${data}`;
        console.log("source ===>", source);
        let dirs = ReactNativeBlobUtil.fs.dirs;
        ReactNativeBlobUtil.config({
          fileCache: true,
          appendExt: 'pdf',
          path: `${dirs.DocumentDir}/fileName.pdf`,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            title: 'fileName.pdf',
            description: 'File downloaded by download manager.',
            mime: 'application/pdf',
          },
        })
          .fetch('GET', source)
          .then(res => {
            console.log('first', res);
            ToastAndroid.show('Download Completed', ToastAndroid.SHORT);
            // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
            // whereas in android, the download manager is handling the download for us.
            if (Platform.OS === 'ios') {
              const filePath = `file://${res.path()}`; // Convert local path to file URL
              let options = {
                type: 'application/pdf',
                url: filePath,
                saveToFiles: true,
              };
              Share.open(options)
                .then(resp => console.log(resp))
                .catch(err => console.log(err));
            }
          })
          .catch(err => console.log('BLOB ERROR -> ', err));
      } catch (error) {
        console.log('🚀 ~ downloadFile ~ error:', error);
      }
    }
    else {

      const text = data;
      let result = '';

      const parts = text?.split('Content/Attachments/Apartment/');

      if (parts?.length > 1) {
        result = parts[1];
      } else {
        console.log("Text does not contain 'Documents/'");
      }


      setLoading(true);
      console.log("before blob util ===================");
      ReactNativeBlobUtil
        .config({
          fileCache: true,
          // by adding this option, the temp files will have a file extension
          appendExt: 'png'
        })
        .fetch('GET', `https://societyhood.mangotech-apps.com/${data}`, {
          //some headers ..
        })
        .then((res) => {
          console.log('The file saved to ', res.path())
          // CameraRoll.save(res.path(), { type: 'photo' })
          //   .then(() => {
          //     console.log('Image saved to camera roll');
          //     // Optionally, display a message indicating successful save
          //     Alert.alert('Success', 'Image saved to camera roll');
          //   })
          //   .catch((error) => {
          //     console.log('Error saving image to camera roll:', error);
          //     // Optionally, display an error message if save fails
          //     Alert.alert('Error', 'Failed to save image to camera roll');
          //   });
        })
    }


    // const text = data;
    // let result = ''; // Define the 'result' variable outside the if block

    // const parts = text?.split('Content/Attachments/Apartment/Rental/');

    // if (parts?.length > 1) {
    //   result = parts[1]; // Assign the value inside the if block
    // } else {
    //   console.log("Text does not contain 'Documents/'");
    // }

    // setLoading(true);
    // let dirs = RNFetchBlob.fs.dirs;
    // RNFetchBlob.config({
    //   path: dirs?.DownloadDir + `/${result}`,
    //   fileCache: true,
    //   addAndroidDownloads: {
    //     //Related to the Android only
    //     useDownloadManager: true,
    //     notification: true,
    //   },
    // })
    //   .fetch('GET', `https://societyhood.mangotech-apps.com/${data}`, {})
    //   .then(res => {
    //     setLoading(false);
    //     // ToastAndroid.showWithGravity(
    //     //     'Your file has been downloaded to downloads folder!',
    //     //     ToastAndroid.LONG,
    //     //     ToastAndroid.BOTTOM,
    //     // );
    //   });


    // USING BLOB UTIL 

    // const text = data;
    // let result = '';

    // const parts = text?.split('Content/Attachments/Apartment/Rental/');

    // if (parts?.length > 1) {
    //   result = parts[1];
    // } else {
    //   console.log("Text does not contain 'Documents/'");
    // }

    // setLoading(true);

    // BlobUtil.fs.dirs
    //   .getDownloadDir()
    //   .then(downloadDir => {
    //     const filePath = `${downloadDir}/${result}`;

    //     return BlobUtil.config({
    //       fileCache: true,
    //       addAndroidDownloads: {
    //         useDownloadManager: true,
    //         notification: true,
    //         path: filePath,
    //       },
    //     }).fetch('GET', `https://societyhood.mangotech-apps.com/${data}`);
    //   })
    //   .then(() => {
    //     setLoading(false);
    //     // ToastAndroid.showWithGravity(
    //     //     'Your file has been downloaded to downloads folder!',
    //     //     ToastAndroid.LONG,
    //     //     ToastAndroid.BOTTOM,
    //     // );
    //   })
    //   .catch(error => {
    //     console.error('Error downloading file:', error);
    //   });
  };

  const AlertFunction = () => {
    setAlertWarning('w');
    setErrorModalText('Document has been downloaded successfully');
    setErrorModal1(true);
    setTimeout(() => {
      setErrorModal1(false);
    }, 3000);
  };

  const downloadFile = async () => {
    if (Platform.OS == "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to memory to download the file',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadImage(); // Corrected function name
        } else {
          Alert.alert(
            'Permission Denied!',
            'You need to give storage permission to download the file',
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
    else {
      downloadImage(); // Corrected function name

    }

  };
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width * 0.8,
            alignSelf: 'center',
            // backgroundColor:'red',
            paddingVertical: width * 0.02,
            paddingHorizontal: width * 0.01,
            // height:width*0.15,
            // marginTop:40,
            // marginLeft:20
          }}
          onPress={() => setModalVisible(true)}>
          {/* <View
            style={{
              width: width * 0.06,
              height: width * 0.06,
              marginRight: width * 0.02,
            }}>
            <Image
              source={Images.attach}
              resizeMode="contain"
              style={{width: '100%', height: '100%'}}
            />
          </View>

          <View>
            <CustomText
            numberOfLines={1}
              fontWeight={fontsFamily.bold}
              style={styles?.name}>
              {data}
            </CustomText>

          
          </View> */}

          <View style={styles.viewname}>
            <Image
              source={Images.attach}
              resizeMode="contain"
              style={{
                width: width * 0.06,
                height: width * 0.06,
                marginHorizontal: width * 0.035,
              }}
            />
            <View style={{}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                {name}
              </CustomText>

              <CustomText
                numberOfLines={1}
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {parts}
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => [
            downloadFile(),
            // AlertFunction(),
            // setCount(count++)
          ]}
          style={[styles.HeaderDownload, { marginRight: width * 0.02 }]}>
          <Image
            source={Images.download}
            resizeMode={'contain'}
            style={[styles.img, { tintColor: colors.primary }]}
          />
        </TouchableOpacity>

        <WarningModal
          visible={errorModal1}
          close={setErrorModal}
          text={errorModalText}
          type={alertWarning}
          button={false}
        />
      </View>
      <Modal
        visible={modal}
        animationType={'slide'}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalMain}>
          <View style={styles.ImageCon}>
            {chk?.split('.')?.pop() === 'pdf' ? (
              <Pdf
                source={{
                  uri: `https://societyhood.mangotech-apps.com/${data}`,
                  cache: true,
                }}
                style={styles.img}
                trustAllCerts={false}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                }}
                onError={error => {
                  console.log(error);
                }}
                onPressLink={uri => {
                  console.log(`Link pressed: ${uri}`);
                }}
              />
            ) : (
              <Image
                source={{
                  uri: `https://societyhood.mangotech-apps.com/${data}`,
                }}
                resizeMode={'contain'}
                style={styles.img}
              />
            )}
          </View>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setModalVisible(false)}
                style={styles.HeaderCross}>
                <Image
                  source={Images.iconcancel}
                  resizeMode={'contain'}
                  style={[styles.img, { tintColor: colors.white }]}
                />
              </TouchableOpacity>
              <CustomText
                fontWeight={fontsFamily.bold}
                style={{
                  color: colors.white,
                  fontSize: width * 0.04,
                  marginLeft: width * 0.02,
                }}>
                {parts}
              </CustomText>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DocumentList;
export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: width * 0.03,
  },
  water: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.8,
    alignSelf: 'center',
    // backgroundColor:'red',
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.01,
    // height:width*0.15,
    // marginTop:40,
    // marginLeft:20
  },
  electric: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.86,
    height: width * 0.15,
    marginTop: 10,
    marginLeft: 20,
  },
  elevator: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.86,
    height: width * 0.15,
    marginTop: 10,
    marginLeft: 20,
  },
  maintenance: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.86,
    height: width * 0.15,
    marginTop: 10,
    marginLeft: 20,
  },
  modalMain: {
    height: "80%",
    marginTop: 70,
    backgroundColor: colors.black,
    justifyContent: 'center',
  },
  ImageCon: {
    width: width,
    height: "80%",
    marginTop: 70
    // backgroundColor:colors.black
  },
  img: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: width,
    alignSelf: 'center',
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.02,
    backgroundColor: colors.docHeader,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0,
  },
  HeaderCross: {
    width: width * 0.04,
    height: width * 0.04,
  },
  HeaderDownload: {
    width: width * 0.05,
    height: width * 0.05,
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  upperCon: {
    width: '100%',
  },
  textMainCon: {
    width: '100%',
    alignSelf: 'center',
  },
  textTitle: {
    color: colors.black,
    fontSize: width * 0.04,
    marginVertical: width * 0.05,
  },
  textInput: {
    width: '100%',
    borderColor: colors.gray,
    borderWidth: 1,
    color: colors.black,
    borderRadius: width * 0.02,
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.03,
    fontFamily: fontsFamily.regular,
    fontSize: width * 0.03,
  },
  addAttach: {
    width: '100%',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: width * 0.03,
    paddingLeft: width * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  browse: {
    fontSize: width * 0.032,
    color: colors.gray,
    width: width * 0.75,
  },
  browseImgCon: {
    width: width * 0.13,
    height: width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderTopRightRadius: width * 0.03,
    borderBottomRightRadius: width * 0.03,
  },
  viewname: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: width * 0.016,
  },
  name: {
    color: colors.lightdarkgray,
    fontSize: width * 0.024,
  },
  username: {
    color: colors.primary,
    fontSize: width * 0.028,
    maxWidth: "90%"
  },
});
