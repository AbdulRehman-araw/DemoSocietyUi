import React, {useState} from 'react';
import {Text, Dimensions, TouchableOpacity, View, Image, PermissionsAndroid, Alert} from 'react-native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Images} from '../../assets/Images';
import {colors} from '../../styles/colors';
import moment from 'moment';
import AlertModal from '../Modal/AlertModal';
import {globalVariable} from '../../enviroment/GlobalVariable';
import RNFS from 'react-native-fs';
const {width} = Dimensions.get('window');
const ConvertToPdf = ({data}) => {
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const createPDF = async () => {

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
            // downloadImage(); // Corrected function name
             let options = {
                html: `<!DOCTYPE html>
                <html>
                <head>
                    <title>HTML to API - Invoice</title>
                    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,700&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
                    <!-- <link rel="stylesheet" href="sass/main.css" media="screen" charset="utf-8"/> -->
                    <meta content="width=device-width, initial-scale=1.0" name="viewport">
                    <meta http-equiv="content-type" content="text-html; charset=utf-8">
                    <style type="text/css">
                        html, body, div, span, applet, object, iframe,
                        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
                        a, abbr, acronym, address, big, cite, code,
                        del, dfn, em, img, ins, kbd, q, s, samp,
                        small, strike, strong, sub, sup, tt, var,
                        b, u, i, center,
                        dl, dt, dd, ol, ul, li,
                        fieldset, form, label, legend,
                        table, caption, tbody, tfoot, thead, tr, th, td,
                        article, aside, canvas, details, embed,
                        figure, figcaption, footer, header, hgroup,
                        menu, nav, output, ruby, section, summary,
                        time, mark, audio, video {
                            margin: 0;
                            padding: 0;
                            border: 0;
                            font: inherit;
                            font-size: 100%;
                            vertical-align: baseline;
                        }
                
                        html {
                            line-height: 1;
                        }
                
                        ol, ul {
                            list-style: none;
                        
                        }
                
                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }
                
                        caption, th, td {
                            text-align: left;
                            font-weight: normal;
                            vertical-align: middle;
                        }
                
                        q, blockquote {
                            quotes: none;
                        }
                        q:before, q:after, blockquote:before, blockquote:after {
                            content: "";
                            content: none;
                        }
                
                        a img {
                            border: none;
                        }
                
                        article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
                            display: block;
                        }
                
                        body {
                            font-weight: 300;
                            font-size: 12px;
                            margin: 0;
                            padding: 0;
                        }
                        body a {
                            text-decoration: none;
                            color: inherit;
                        }
                        body a:hover {
                            color: inherit;
                            opacity: 0.7;
                        }
                        body .container {
                            min-width: 500px;
                            margin: 0 auto;
                            padding: 0 20px;
                        }
                        body .clearfix:after {
                            content: "";
                            display: table;
                            clear: both;
                        }
                        body .left {
                            float: left;
                        }
                        body .right {
                            float: right;
                        }
                        body .helper {
                            display: inline-block;
                            height: 100%;
                            vertical-align: middle;
                        }
                        body .no-break {
                            page-break-inside: avoid;
                        }
                
                        header {
                            margin-top: 20px;
                            margin-bottom: 50px;
                        }
                        header figure {
                            float: left;
                            width: 60px;
                            height: 60px;
                            margin-right: 10px;
                            background-color: #E8F3DB;
                            border-radius: 50%;
                            text-align: center;
                        }
                        header figure img {
                            margin-top: 13px;
                        }
                        header .company-address {
                            float: left;
                            max-width: 150px;
                            line-height: 1.7em;
                        }
                        header .company-address .title {
                            color: ${colors.primary};
                            font-weight: 400;
                            font-size: 1.5em;
                            text-transform: uppercase;
                        }
                        header .company-contact {
                            float: right;
                            height: 60px;
                            padding: 0 10px;
                            background-color: ${colors.primary};
                            color: white;
                        }
                        header .company-contact span {
                            display: inline-block;
                            vertical-align: middle;
                        }
                        header .company-contact .circle {
                            width: 20px;
                            height: 20px;
                            background-color: white;
                            border-radius: 50%;
                            text-align: center;
                        }
                        header .company-contact .circle img {
                            vertical-align: middle;
                        }
                        header .company-contact .phone {
                            height: 100%;
                            margin-right: 20px;
                        }
                        header .company-contact .email {
                            height: 100%;
                            min-width: 100px;
                            text-align: right;
                        }
                
                        section .details {
                            margin-bottom: 55px;
                        }
                        section .details .client {
                            width: 50%;
                            line-height: 20px;
                        }
                        section .details .client .name {
                            color: ${colors.primary};
                        }
                        section .details .data {
                            width: 50%;
                            text-align: right;
                        }
                        section .details .title {
                            margin-bottom: 15px;
                            color: ${colors.primary};
                            font-size: 3em;
                            font-weight: 400;
                            text-transform: uppercase;
                        }
                        section table {
                            width: 100%;
                            border-collapse: collapse;
                            border-spacing: 0;
                            font-size: 0.9166em;
                        }
                        section table .qty, section table .unit, section table .total {
                            width: 15%;
                        }
                        section table .desc {
                            width: 55%;
                        }
                        section table thead {
                            display: table-header-group;
                            vertical-align: middle;
                            border-color: inherit;
                        }
                        section table thead th {
                            padding: 5px 10px;
                            background: ${colors.primary};
                            border-bottom: 5px solid #FFFFFF;
                            border-right: 4px solid #FFFFFF;
                            text-align: right;
                            color: white;
                            font-weight: 400;
                            text-transform: uppercase;
                        }
                        section table thead th:last-child {
                            border-right: none;
                        }
                        section table thead .desc {
                            text-align: left;
                        }
                        section table thead .qty {
                            text-align: center;
                        }
                        section table tbody td {
                            padding: 10px;
                            background: #E8F3DB;
                            color: #777777;
                            text-align: right;
                            border-bottom: 5px solid #FFFFFF;
                            border-right: 4px solid #E8F3DB;
                        }
                        section table tbody td:last-child {
                            border-right: none;
                        }
                        section table tbody h3 {
                            margin-bottom: 5px;
                            color: ${colors.primary};
                            font-weight: 600;
                        }
                        section table tbody .desc {
                            text-align: left;
                        }
                        section table tbody .qty {
                            text-align: center;
                        }
                        section table.grand-total {
                            margin-bottom: 45px;
                        }
                        section table.grand-total td {
                            padding: 5px 10px;
                            border: none;
                            color: #777777;
                            text-align: right;
                        }
                        section table.grand-total .desc {
                            background-color: transparent;
                        }
                        section table.grand-total tr:last-child td {
                            font-weight: 600;
                            color: ${colors.primary};
                            font-size: 1.18181818181818em;
                        }
                
                        footer {
                            margin-bottom: 20px;
                        }
                        footer .thanks {
                            margin-bottom: 40px;
                            color: ${colors.primary};
                            font-size: 1.16666666666667em;
                            font-weight: 600;
                        }
                        footer .notice {
                            margin-bottom: 25px;
                        }
                        footer .end {
                            padding-top: 5px;
                            border-top: 2px solid ${colors.primary};
                            text-align: center;
                        }
                    </style>
                </head>
                
                <body>
                    <header class="clearfix">
                        <div class="container">
                            <figure>
                                <img class="logo" src=${
                                  globalVariable?.logoUrl
                                } alt="" width="80%">
                            </figure>
                            <div class="company-address">
                                <h2 class="title">${globalVariable?.societyName}</h2>
                                <p>
                                    455 Foggy Heights,<br>
                                    AZ 85004, US
                                </p>
                            </div>
                            <div class="company-contact">
                            <div class="phone left">
                                <span class="circle"><img src="https://societyhood.mangotech-apps.com/Content/Logo/phone.png" width="100%" alt=""><span class="helper"></span></span>
                                <a href="tel:602-519-0450">(021) 0900-78601</a>
                                <span class="helper"></span>
                            </div>
                            <div class="email right">
                                <span class="circle"><img src="https://societyhood.mangotech-apps.com/Content/Logo/mailgreen.png" width="100%" alt=""><span class="helper"></span></span>
                                <a href="mailto:company@example.com">company@example.com</a>
                                <span class="helper"></span>
                            </div>
                        </div>
                        </div>
                    </header>
                
                    <section>
                        <div class="container">
                            <div class="details clearfix">
                                <div class="client left">
                                <p style="font-size: 16px;">INVOICE TO:</p>
                                    <p class="name">${data?.residentName}</p>
                                    <p>${data?.building}, ${
                  data?.unitNumber ? data?.unitNumber : 'N/A'
                }</p>
                                    <p>${
                                      data?.residentEmail ? data?.residentEmail : 'N/A'
                                    }</p>
                                    <p>${
                                      data?.residentContactNo
                                        ? data?.residentContactNo
                                        : 'N/A'
                                    }</p>
                                </div>
                                <div class="data right">
                                    <div class="title">Invoice ${
                                      data?.invoiceID ? data?.invoiceID : 'N/A'
                                    }</div>
                                    <div class="date">
                                        Date of Invoice: ${moment(
                                          data?.invoiceDate,
                                        ).format('DD/MMM/YYYY')}<br>
                                        Due Date: ${moment(data?.dueDate).format(
                                          'DD/MMM/YYYY',
                                        )}
                                    </div>
                                </div>
                            </div>
                
                            <table border="0" cellspacing="0" cellpadding="0">
                                <thead>
                                    <tr>
                                        <th class="desc">Description</th>
                                        <th class="unit">Amount</th>
                                        <th class="total">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="desc"><h3>${data?.title}</h3>${
                  data?.description
                }</td>
                                        <td class="unit">Rs ${data?.amount}</td>
                                        <td class="total">Rs ${data?.amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="no-break">
                                <table class="grand-total">
                                    <tbody>
                                        <tr>
                                            <td class="desc"></td>
                                            <td class="qty"></td>
                                            <td class="unit">SUBTOTAL:</td>
                                            <td class="total">Rs ${data?.amount}</td>
                                        </tr>
                                        <tr>
                                            <td class="desc"></td>
                                            <td class="qty"></td>
                                            <td class="unit">TAX 13%:</td>
                                            <td class="total">${(
                                              parseFloat(data?.amount) * 0.13
                                            ).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td class="desc"></td>
                                            <td class="unit" colspan="2">GRAND TOTAL:</td>
                                            <td class="total">${(
                                              parseFloat(data?.amount) +
                                              parseFloat(data?.amount) * 0.13
                                            ).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                
                    <footer>
                        <div class="container">
                            <div class="thanks">Thank you!</div>
                            <div class="notice">
                                <div>NOTICE:</div>
                                <div>A finance charge penelty will be made on unpaid balances after 30 days.</div>
                            </div>
                            <div class="end">Invoice was created on a computer and is valid without the signature and seal.</div>
                        </div>
                    </footer>
                
                </body>
                
                </html>
                `,
                fileName: (data?.invoiceID).toString(),
                directory: 'Documents',
              };
          
              try {
                let {filePath} = await RNHTMLtoPDF.convert(options);
                 // Specify the download folder path
              const downloadFolderPath = RNFS.DownloadDirectoryPath;
          
              // Specify the destination path for the downloaded file
              const destinationPath = `${downloadFolderPath}/${(data?.invoiceID).toString()}.pdf`;
          
              // Move the file to the download folder
              await RNFS.moveFile(filePath, destinationPath);
                setErrorModal(true);
                setErrorModalText(`Invoice downloaded sucessfully`);
                setTimeout(() => {
                  setErrorModal(false);
                }, 3000);
              } catch (error) {
                console.error('Error creating PDF:', error);
              }
          } else {
            Alert.alert(
              'Permission Denied!',
              'You need to give storage permission to download the file. Please goto settings and allow Muhaish to Storage Permission',
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
      <View>
        <TouchableOpacity
          onPress={createPDF}
          activeOpacity={1}
          style={{
            width: width * 0.13,
            height: width * 0.13,
            marginRight: width * 0.02,
            backgroundColor: colors.primaryLight,
            borderRadius: 10,
            padding: width * 0.02,
            alignItems: 'center',
            justifyContent: 'center',
            
          }}>
          <Image
            resizeMode="contain"
            style={{
              // tintColor: colors.white,
              width: width * 0.08,
              height: width * 0.08,
            }}
            source={Images.pdf}
          />
        </TouchableOpacity>
      </View>
      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={'s'}
      />
    </>
  );
};

export default ConvertToPdf;
