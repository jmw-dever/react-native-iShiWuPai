/**
 * Created by yuanguozheng on 16/3/10.
 */
'use strict';

import React,{Component} from "react";

import {
    View,
    WebView,
    Platform,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import MenuItems from "../components/MenuItems";

export default class JoeWebView extends Component {
    state = {
        isVisiable: false
    }

    constructor(props) {
        super(props);
    }

    onPressAction = () => {
        this.setState({isVisiable: !this.state.isVisiable});
    }

    onMenuPress = (value) =>{
        this.setState({isVisiable: !this.state.isVisiable});
        switch (value){
            case "myScanner":
                this.props.navigator.push({
                    id: 'Scanner',
                    passProps: {
                        onBarCodeRead: obj => alert(JSON.stringify(obj))
                    }
                })
                break;
            default:
                alert(value)
        }
    }

    render() {
        let isVisiable = this.state.isVisiable
        const {onBack} = this.props
        return (
            <View style={{flex:1,paddingTop:Platform.os==='ios'?20:0}}>
                <View style={{flex: 1}}>
                    <View style={[styles.header, {borderBottomWidth: gScreen.onePix}]}>
                        <LeftItem onPress={onBack}/>
                        <Text>详情</Text>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            style={styles.photo}
                            onPress={this.onPressAction}
                        >
                            <Image
                                style={{width: 20, height: 20}}
                                source={require('../resource/ic_analyze_search_red.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    <WebView startInLoadingState={true}
                             javaScriptEnabled={true}
                             source={{uri:this.props.url,method:'GET'}}/>
                    {isVisiable?
                        <MenuItems onMenuPress={this.onMenuPress}/>:<View/>
                    }
                </View>

            </View>
        )
    }
}

const LeftItem = ({onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.leftItem}
            onPress={onPress}
        >
            <Image style={{width: 20, height: 20}}
                   source={require('../resource/ic_back_dark.png')}
                   resizeMode={"contain"}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'rgba(1,1,1,0)',
        overflow: 'hidden'
    },
    leftItem: {
        position: 'absolute',
        top: __ANDROID__ ? 0 : 20,
        left: 0,
        height: __ANDROID__ ? 50 : 44,
        width: 60,
        paddingLeft: 5,
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row',
        height: gScreen.navBarHeight,
        paddingTop: gScreen.navBarPaddingTop,
        alignItems: 'center',
        borderBottomColor: '#d9d9d9',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    photo: {
        width: __IOS__ ? 44 : 50,
        height: __IOS__ ? 44 : 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: gScreen.navBarPaddingTop
    },
})