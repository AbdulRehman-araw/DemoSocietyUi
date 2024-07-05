import { ActivityIndicator, Dimensions, PermissionsAndroid, Platform, StyleSheet, View } from 'react-native'
import React, {  useState } from 'react'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import AlertModal from './Modal/AlertModal';
import PrimaryButton from './Button/PrimaryButton';
// import { Text } from 'react-native';
import { colors } from '../styles/colors';
// import notifee from '@notifee/react-native';
// import { Images } from '../assets/Images';

const { width } = Dimensions.get('window');
const StatementPdf = ({ data }) => {
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [type, setType] = useState('s');
  const [loader, setLoader] = useState(false);
   
 


  const currentHTMl = `<!DOCTYPE html>
<html>
<head>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
footer {
  bottom: 0px;
  position:fixed;
}
h2 {
  text-align: center;
}
</style>
</head>
<body>

<h2>Customer Statement</h2>

<table>
  <tr>
    <th>Particulars</th>
    <th>Debit</th>
    <th>Credit</th>
    <th>Balance</th>
  </tr>
   
  <tr>
    <td>${data[0] == undefined ? '' : data[0].detail}</td>
    <td>${data[0] == undefined ? '' : data[0].debit}</td>
    <td>${data[0] == undefined ? '' : data[0].credit}</td>
    <td>${data[0] == undefined ? '' : data[0].balance}</td>
  </tr>
  <tr>
  <td>${data[1] == undefined ? '' : data[1].detail}</td>
  <td>${data[1] == undefined ? '' : data[1].debit}</td>
  <td>${data[1] == undefined ? '' : data[1].credit}</td>
  <td>${data[1] == undefined ? '' : data[1].balance}</td>
</tr>
<tr>
<td>Total</td>
<td>${data[1] == undefined || data[0] == undefined ? '' : data[1].debit + data[0].debit}</td>
<td>${data[1] == undefined || data[0] == undefined ? '' : data[1].credit + data[0].credit}</td>
<td>${data[1] == undefined || data[0] == undefined ? '' : data[1].balance + data[0].balance}</td>
</tr>
  
</table>
<footer>
  <p>Muhaish<br>
  <a href="mailto:muhaish@muhaish.com">muhaish@muhaish.com</a></p>
</footer>

</body>
</html>`

  const generatePDF = async () => {
    setLoader(true)
    handlePDF();
  }


  const handlePDF=async()=>{
    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to memory to download the file',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

          let options = {
            html: currentHTMl,
            fileName: 'Statement',
            directory: 'Documents',
          };

          // let file = await RNHTMLtoPDF.convert(options)
          // console.log(file.filePath);
          try {
            let { filePath } = await RNHTMLtoPDF.convert(options);
            // Specify the download folder path
            const downloadFolderPath = RNFS.DownloadDirectoryPath;

            // Specify the destination path for the downloaded file
            const destinationPath = `${downloadFolderPath}.pdf`;

            // Move the file to the download folder
            await RNFS.moveFile(filePath, destinationPath);
            // Alert.alert("Success",`PDF Downloaded at: ${destinationPath}`);
            setErrorModal(true)
            setType('s')
            setErrorModalText(`PDF Downloaded at: ${destinationPath}`)
            setLoader(false)

          } catch (err) {
            console.log("Error", err)
            setLoader(false)
            setErrorModalText('Something went wrong');
          }
        } else {
          setErrorModal(true)
          setType('c')
          setErrorModalText(
            'Permission Denied!, You need to give storage permission to download the file. Please goto settings and allow Muhaish to Storage Permission');
          setLoader(false)
        }
      } catch (error) {

        console.log("Error In Pdf Dowmload")
        setErrorModalText(
          'Something went wrong',
        );
        setLoader(false)
      }

    } else {
    }
  }



  return (

    loader ?
      <View style={{ marginVertical: width * 0.1 }}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
      :
      <View style={{ width: "100%" }}>
        {/* onPress={generatePDF} */}

        {/* <Image
            source={Images.pdfIcon}
            resizeMode="center"
            style={{ width: 30, height: 30,alignSelf:"flex-start",marginLeft:10}}
          /> */}
        <PrimaryButton
          customStyle={{ padding: width * 0.032 }}
          title={'Download Statements'}
          onPress={ generatePDF}
        />

        <AlertModal
          visible={errorModal}
          close={setErrorModal}
          text={errorModalText}
          type={type}
        />
      </View>




  )
}

const styles = StyleSheet.create({})


export default StatementPdf