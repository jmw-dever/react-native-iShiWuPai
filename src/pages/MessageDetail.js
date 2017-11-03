/**
 * Created by ljunb on 16/5/30.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    WebView,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';

export default class MessageDetail extends Component {

    onBackAction = () => {
        this.props.navigator.pop()
    }

    render() {
        const {msg} = this.props

        return (
            <View>
                <View>
                    <View style={[styles.header, {borderBottomWidth: gScreen.onePix}]}>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            style={styles.leftItem}
                            onPress={this.onBackAction}
                        >
                            <Image style={{width: 20, height: 20}}
                                   source={require('../resource/ic_back_dark.png')}
                                   resizeMode={"contain"}
                            />
                        </TouchableOpacity>
                        <Text>消息通知</Text>
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

                    {isVisiable?
                        <View style={styles.menu}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={this.removeAll}
                            >
                                <Image
                                    style={styles.menuImg}
                                    source={require('../resource/ic_home_analyse.png')}
                                    resizeMode="contain"
                                />
                                <Text>全部清除</Text>
                            </TouchableOpacity>
                        </View>:<View/>
                    }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        top: gScreen.navBarHeight,
        right: 10,
        width: 120,
        height: 40,
        backgroundColor: 'white',
        borderBottomColor: "#d9d9d9",
        borderRadius: 4,
    },
    menuItem: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        height: 20,
        justifyContent: "flex-start"
    },
    menuImg: {
        width: 20,
        height: 20,
        marginTop: 2,
        marginRight: 10
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
    messageItems: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 20,
        width: gScreen.width - 32 * 2,
        height: gScreen.width / 3 *2,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center',
        borderColor: '#999',
        borderWidth:1
    },
    messageTitle: {
        width: gScreen.width - 56*2,
        height: 40,
        paddingTop: 15,
        paddingLeft: 20,
        alignSelf: 'flex-start'
    },
    messageTime: {
        width: gScreen.width - 56 - 46,
        height: 40,
        paddingTop: 5,
        paddingBottom: 5,
        alignSelf: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#999'
    },
    messageImg: {
        flex: 1,
        width: gScreen.width - 56 - 46,
        alignSelf: 'center',
    },
    messageMore:{
        flexDirection: 'row',
        width: gScreen.width -  56 - 46,
        height: 40,
        paddingTop: 5,
        alignSelf: 'center',
        borderTopWidth: 1,
        borderTopColor: '#999'
    },
    header: {
        height: __ANDROID__ ? 50 : 64,
        width: gScreen.width,
        paddingTop: __ANDROID__ ? 0 : 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: gColors.border,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#fff'
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
})
