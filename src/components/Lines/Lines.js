import {
    Dimensions,
    View,

} from 'react-native';
import React, { useState } from 'react';

import { colors } from '../../styles/colors';

const { width, height } = Dimensions.get("window")



const LinesDraw = () => {
    return (
        <View style={{ paddingHorizontal: width * 0.025, flex: 1 }}>
            <View style={{
                borderBottomWidth: 1,
                borderColor: colors.lightoffwhite,
                shadowColor: "#4d4d4d",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.8,
                shadowRadius: 13.51,
                elevation: 4,
                marginVertical:10
                
            }} />
        </View>
    );
};





export default LinesDraw;