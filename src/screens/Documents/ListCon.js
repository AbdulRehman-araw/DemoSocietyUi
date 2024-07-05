import { View, Text, ToastAndroid, Alert } from 'react-native';
import React from 'react';
import { styles } from './styles/styles';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { Images } from '../../assets/Images';
import CustomText from '../../components/CustomText';
import { text } from '../../res/strings';
import { fontsFamily } from '../../assets/Fonts';
import { colors } from '../../styles/colors';
import { Dimensions } from 'react-native';
import { Modal } from 'react-native';
import { useState } from 'react';
import Pdf from 'react-native-pdf';
import moment from 'moment';
// import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid } from 'react-native';
import WarningModal from '../../components/Modal/WarningModal';
import Share from 'react-native-share'
import ReactNativeBlobUtil from 'react-native-blob-util';


const { width } = Dimensions.get('window');
const ListCon = ({ data }) => {
  const [modal, setModalVisible] = useState(false);
  const [errorModal1, setErrorModal1] = useState(false);
  const [alertWarning, setAlertWarning] = useState('w');
  const [alertType, setAlertType] = useState('s');
  const [errorModalText, setErrorModalText] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [count, setCount] = useState(0);

  let chk = data?.attachment;
  // console.log('imgUrl',`https://societyhood.mangotech-apps.com/${data?.attachment}`)
  // console.log("🚀 ~ file: ListCon.js:20 ~ ListCon ~ chk:", chk.split('.').pop())
  // const downloadImage = () => {
  //     let date = new Date();
  // let image_URL = `https://societyhood.mangotech-apps.com/${data?.attachment}`;
  //     const { config, fs } = ReactNativeBlobUtil;
  //     let PictureDir = fs.dirs.DownloadDir;
  //     let options = {
  //         fileCache: true,
  //         timeout: 60 * 60,
  //         path: PictureDir + '/' + image_URL.substring(51),
  //         addAndroidDownload: {
  //             useDownloadManager: true,
  //             notifications: true,
  //             title: image_URL.substring(51),
  //             path: PictureDir + '/' + image_URL.substring(51),
  //             description: 'Image'
  //         }
  //     };

  //     config(options)
  //         .fetch('GET', image_URL)
  //         .then(res => {
  //             console.log('Res===>', JSON.stringify(res));
  //             alert('Document has been downloaded successfully.');
  //         })
  //         .catch(error => {
  //             console.log('Download Error:', error);
  //             alert('Download Failed');
  //         });
  // };

  const [loading, setLoading] = useState(false);

  const text = data?.attachment;
  const parts = text.split('Documents/');

  if (parts.length > 1) {
    const result = parts[1]; // Get everything after "Documents/"
    console.log(result);
  } else {
    console.log("Text does not contain 'Documents/'");
  }

  const downloadImage = () => {
    console.log("download image using blob util =====");

    console.log(data.attachment);


    const filePath = data.attachment;
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
        const source = `https://societyhood.mangotech-apps.com/${data.attachment}`;
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
          CameraRoll.save(res.path(), { type: 'photo' })
            .then(() => {
              console.log('Image saved to camera roll');
              // Optionally, display a message indicating successful save
              Alert.alert('Success', 'Image saved to camera roll');
            })
            .catch((error) => {
              console.log('Error saving image to camera roll:', error);
              // Optionally, display an error message if save fails
              Alert.alert('Error', 'Failed to save image to camera roll');
            });
        })
    }
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
          style={styles.water}
          onPress={() => setModalVisible(true)}>
          <View
            style={{
              width: width * 0.06,
              height: width * 0.06,
              marginRight: width * 0.02,
            }}>
            <Image
              source={Images.attach}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          <View>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{
                color: colors.black,
                fontSize: width * 0.035,
                marginTop: 3,
                width: width * 0.6,
              }}>
              {data?.title}
            </CustomText>

            <CustomText
              fontWeight={fontsFamily.bold}
              style={{ color: colors.lightgray, fontSize: width * 0.032 }}>
              {moment(data?.date).format('DD MMMM YYYY, h:mm:ss A')}
            </CustomText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => [
            downloadFile()
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
            {chk.split('.').pop() === 'pdf' ? (
              <Pdf
                source={{
                  uri: `https://societyhood.mangotech-apps.com/${data?.attachment}`,
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
                  uri: `https://societyhood.mangotech-apps.com/${data?.attachment}`,
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
                {data?.title}
              </CustomText>
            </View>
            {/* <TouchableOpacity
              activeOpacity={1}
              onPress={() => downloadImage()}
              style={[styles.HeaderDownload, {marginRight: width * 0.02}]}>
              <Image
                source={Images.download}
                resizeMode={'contain'}
                style={[styles.img, {tintColor: colors.white}]}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ListCon;
