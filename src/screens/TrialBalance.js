import {
    View,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Dimensions,
    Platform,
    BackHandler,
    Text,
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
const { width } = Dimensions.get('window');
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import axios from 'axios';
import { apiCall } from '../Services/apiCall';
import ListCard from './Reports/ListCard';
import { useIsFocused } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { colors } from '../styles/colors';
import CustomText from '../components/CustomText';
import { fontsFamily } from '../assets/Fonts';
 
export default function TrialBalance({ navigation }) {
    const user = useSelector(state => state.userDataReducer.userAccountDetails);

    useEffect(() => {
        getTrialData()
    }, [])

    const [data, setData] = useState('')
    const [total, setTotal] = useState('')

    const [expandedAccounts, setExpandedAccounts] = useState({});
    const [expandedSubHeads, setExpandedSubHeads] = useState({});

    // Function to toggle visibility of subheads for a specific head
    const toggleExpandSubHead = (headIndex) => {
        setExpandedSubHeads(prevState => ({
            ...prevState,
            [headIndex]: !prevState[headIndex]
        }));
    };
    // Function to toggle visibility of subaccounts for a specific account
    const toggleExpandAccount = (accountCode) => {
        setExpandedAccounts(prevState => ({
            ...prevState,
            [accountCode]: !prevState[accountCode]
        }));
    };

    async function getTrialData() {
        axios.get(`https://societyhood.mangotech-apps.com/api/Account/GetTrailBalance?society_id=20`).then((res) => {
            console.log("response ====>", res.data.data);
            setData(res.data?.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    const goBack = () => {
        navigation.goBack();
    };
     return (
      
        <View style={{
            flex: 1,
            backgroundColor: "white",
        }}>
            <View style={{
                marginTop: 40,
                marginLeft: 20
            }}>
                <Header onBack={goBack} title={'Trial balance'} />
            </View>
            <ScrollView style={{
                marginVertical: 20
            }}>
                <FlatList
                    style={{ width: '100%' }}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        let headTitle = item?.name
                        return (
                            <View style={{
                                width: '100%', marginTop: 10, marginLeft: 5,

                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold',color:"black" }}>{`${index + 1}) ${item?.name}`}</Text>
                                {item?.subHeads && (
                                    <FlatList
                                        style={{ marginLeft: 10, width: '100%' }}
                                        data={item?.subHeads}
                                        keyExtractor={(item, index) => index.toString()} // Change to index.toString()
                                        renderItem={({ item: subHeadItem, index: subHeadIndex }) => ( // Rename 'item' and 'index' to avoid confusion
                                            <View style={{
                                                borderBottomWidth: 1,
                                                borderColor: "grey",
                                                marginVertical: 5
                                            }} >
                                                <TouchableOpacity
                                                    onPress={() => toggleExpandSubHead(`${index}_${subHeadIndex}`)}
                                                    style={{ flexDirection: 'row', alignItems: 'center' }}
                                                >
                                                    <Image source={expandedSubHeads[`${index}_${subHeadIndex}`] ? require('../assets/Images/arrowdown.png') : require('../assets/Images/catRight.png')} style={{
                                                        height: 10,
                                                        width: 10,
                                                        resizeMode: "contain",
                                                        marginVertical: 2
                                                    }} />
                                                    <Text style={{
                                                        marginLeft: 5,
                                                        marginVertical: 2,
                                                        color:"black"
                                                    }}>{`${subHeadItem?.name}`}</Text>
                                                </TouchableOpacity>
                                                {expandedSubHeads[`${index}_${subHeadIndex}`] && subHeadItem?.accounts && (
                                                    <FlatList
                                                        style={{ marginLeft: 10, width: '100%' }}
                                                        data={subHeadItem?.accounts}
                                                        keyExtractor={(item, index) => index.toString()}
                                                        renderItem={({ item }) => (
                                                            <View style={{
                                                                borderColor: "grey",
                                                                marginVertical: 5,
                                                            }}>
                                                                <TouchableOpacity
                                                                    style={{ flexDirection: 'row' }}
                                                                    onPress={() => toggleExpandAccount(item.code)}
                                                                >
                                                                    <Image source={expandedAccounts[item.code] ? require('../assets/Images/arrowdown.png') : require('../assets/Images/catRight.png')} style={{
                                                                        height: 10,
                                                                        width: 10,
                                                                        resizeMode: "contain",
                                                                        marginVertical: 2
                                                                    }} />
                                                                    <Text style={{
                                                                        marginLeft: 10,
                                                                        color:"black"
                                                                    }}>{item?.name}</Text>
                                                                </TouchableOpacity>
                                                                {item?.sub_accounts?.length > 0 && expandedAccounts[item.code] && (
                                                                    <View style={{
                                                                        marginTop: 10
                                                                    }}>
                                                                        <View style={{ flexDirection: 'row', width: "100%", backgroundColor: "#4bb340" }}>
                                                                            <Text style={{ width: '30%', color: "white", marginLeft: 2 }}>Code</Text>
                                                                            <Text style={{ width: '30%', marginLeft: 10, color: "white" }}>Name</Text>
                                                                            <Text style={{ width: '10%', marginLeft: 10, color: "white" }}>Debit</Text>
                                                                            <Text style={{ width: '20%', marginLeft: 10, color: "white" }}>Credit</Text>
                                                                        </View>
                                                                        <FlatList
                                                                            style={{ width: '100%' }}
                                                                            data={item?.sub_accounts}
                                                                            keyExtractor={(item, index) => index.toString()}
                                                                            renderItem={({ item, index }) => (
                                                                                <View style={{
                                                                                    flexDirection: 'row', marginVertical: 5,
                                                                                    borderBottomWidth: 0.5,
                                                                                    borderColor: "grey"
                                                                                }}>
                                                                                    <Text style={{ width: '30%', marginVertical: 5, color:"black" }}>{item?.code}</Text>
                                                                                    <Text style={{ width: '30%', marginLeft: 10, marginVertical: 5,color:"black" }}>{item?.name}</Text>
                                                                                    <Text style={{ width: '10%', marginLeft: 10, textAlign: 'center', marginVertical: 5,color:"black" }}>{item?.debit}</Text>
                                                                                    <Text style={{ width: '20%', marginLeft: 10, textAlign: 'center', marginVertical: 5,color:"black" }}>{item?.credit}</Text>
                                                                                </View>
                                                                            )}

                                                                        />
                                                                    </View>
                                                                )}
                                                            </View>
                                                        )}

                                                    />
                                                )}
                                            </View>
                                        )
                                        }


                                    />
                                )}

                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: 5,
                                    borderBottomWidth: 0.5,
                                    borderColor: "grey",
                                    backgroundColor: "#2aacde",
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ width: '20%', marginVertical: 5, marginLeft: 5, color: "white" }}>Total</Text>
                                    <Text style={{ width: '30%', marginLeft: 10, marginVertical: 5, color: "white" }}>Total {item?.name}</Text>
                                    <Text style={{ width: '20%', marginLeft: 10, textAlign: 'center', marginVertical: 5, color: "white" }}>{item?.total_debit}</Text>
                                    <Text style={{ width: '20%', marginLeft: 10, textAlign: 'center', marginVertical: 5, color: "white" }}>{item?.total_credit}</Text>
                                </View>
                            </View >
                        )
                    }}
                />
                < View style={{
                    height: 150
                }}></View >
            </ScrollView >
               
        </View >
    )
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "red",
    },
    tableTitle: {
        flex: 0.4,
    },
    tableCell: {
        justifyContent: 'center',
    },
    border: {
        borderColor: colors.gray,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
});