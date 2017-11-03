/**
 * Created by ljunb on 2017/5/25.
 */
import React from 'react'
import {Animated, StyleSheet, View, Text, AppRegistry} from 'react-native'
import {Provider} from 'mobx-react/native'
import stores from './src/store'
import NetInfoDecorator from './src/common/NetInfoDecorator'
import MyStorage from './src/store/MyStorage'
import JPushModule from 'jpush-react-native'
import App from './src'

if (!__DEV__) {
    global.console = {
        log: () => {}
    }
}

@NetInfoDecorator
export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promptPosition: new Animated.Value(0),
            navigator: null,
        }
    }

    componentDidMount(){
        JPushModule.notifyJSDidLoad((resultCode) => {
           if (resultCode === 0) {

           }
         });

        // 接收自定义消息
        JPushModule.addReceiveCustomMsgListener((message) => {
            if(null != message && "undefined" != message && "" != message){
                //this.setState({pushMsg: message});
                //alert(JSON.stringify(message));
            }
        });
        // 接收推送通知
        JPushModule.addReceiveNotificationListener((message) => {
            if(null != message && "undefined" != message && "" != message){
                let extras = JSON.parse(message.extras);
                let messageKey = extras.messageKey
                MyStorage.load(messageKey,(msg) =>{
                    let myCurrent = [];
                    if(msg != null){
                        myCurrent = msg;
                    }
                    alert(msg);
                    myCurrent.push(message);
                    MyStorage.save(messageKey,myCurrent);
                });

                MyStorage.load(messageKey+"count",(value)=>{
                    if(null != value){
                        value ++;
                    }else{
                        value = 1;
                    }
                    MyStorage.save(messageKey+"count",value)
                });
            }
        });
        // 打开通知
        JPushModule.addReceiveOpenNotificationListener((map) => {
            const {navigator} = this.props
            let extras = JSON.parse(map.extras);
            let messageKey = extras.messageKey
            MyStorage.save('currentKey',messageKey);
            MyStorage.save(messageKey+"count",0);
            this.state.navigator = this.props.navigator
            JPushModule.jumpToPushActivity("JPushDetailActivity");
        });

    }

    componentWillReceiveProps(nextProps) {
        const {isConnected} = nextProps
        // 无网络
        if (!isConnected) {
            Animated.timing(this.state.promptPosition, {
                toValue: 1,
                duration: 200
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(this.state.promptPosition, {
                        toValue: 0,
                        duration: 200
                    }).start()
                }, 2000);
            })
        }
    }

    render() {
        let positionY = this.state.promptPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [-30, __IOS__ ? 20 : 0]
        });
        return (
            <View style={{flex: 1}}>
                <Provider {...stores}>
                    <App />
                </Provider>
                <Animated.View style={[styles.netInfoView, {top: positionY}]}>
                    <Text style={styles.netInfoPrompt}>欢迎您</Text>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    netInfoView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        position: 'absolute',
        right: 0,
        left: 0,
        backgroundColor: gColors.theme
    },
    netInfoPrompt: {
        color: 'white',
        fontWeight: 'bold'
    }
})

AppRegistry.registerComponent('iShiWuPai', () => Root)