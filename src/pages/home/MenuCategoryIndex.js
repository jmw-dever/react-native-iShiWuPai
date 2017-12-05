/**
 * Created by Devil on 2017/10/13.
 */

import React, {PureComponent} from "react";
import {ScrollView, StyleSheet} from "react-native";
import {observer} from "mobx-react/native";
import {reaction} from "mobx";

@observer
export default class MenuCategoryIndex extends PureComponent{

    constructor(props){
        super(props)
    }

    onPress = (murl) => {
        // Linking.canOpenURL(murl).then(supported => { // weixin://  alipay://
        //     if (supported) {
        //         Linking.openURL(murl);
        //     } else {
        //         ToastAndroid.show(`请先安装XXX`,ToastAndroid.SHORT);
        //     }
        // });
        alert(murl);
    }
    render () {
        return (
            <ScrollView style={{flex: 1}}>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    category: {
        width: (gScreen.width - 16 * 2) / 4,
        height: 65,
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    categoryIcon: {
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
    categoryTitle: {
        color: 'gray',
        fontSize: 12,
        marginTop: 5,
    },
    groupHeader: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryView:{
        width: gScreen.width - 16 * 2,
        alignSelf: 'center',
        marginBottom: 10,
        overflow: 'hidden',
        backgroundColor: 'white'
    }
})