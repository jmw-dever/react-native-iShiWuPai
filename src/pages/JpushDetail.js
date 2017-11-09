/**
 * Created by Devil on 2017/10/28.
 */

import React,{ Component } from 'react';
import {
    View,
    AppRegistry,
    StatusBar,
    Text,
    Animated,
    StyleSheet
} from 'react-native';
import {Provider} from 'mobx-react/native'
import stores from '../store'
import {observer, inject} from 'mobx-react/native'
import {Navigator} from 'react-native-deprecated-custom-components'
import Router from '../common/Routers'
import App from '../index'

export default class JpushDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            promptPosition: new Animated.Value(0),
            navigator: null,
        }
    }

    configureScene = route => {
        if (route.sceneConfig) return route.sceneConfig

        return {
            ...Navigator.SceneConfigs.PushFromRight,
            gestures: {}    // 禁用左滑返回手势
        }
    }

    renderScene = (route, navigator) => {
        let Component = Router[route.id].default
        return <Component navigator={navigator} {...route.passProps}/>
    }

    render() {
        const initialPage = 'Messages'
        let positionY = this.state.promptPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [-30, __IOS__ ? 20 : 0]
        });
        return (
            <View style={{flex: 1}}>
                <Provider {...stores}>
                    <App isMessage="true" />
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

AppRegistry.registerComponent('JPushDetail', () => JpushDetail)