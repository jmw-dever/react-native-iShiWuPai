/**
 * Created by ljunb on 16/8/21.
 */
import React, {Component} from "react";
import {Image, Platform} from "react-native";
import Storage from "../store/MyStorage";

import UpgradeAndroid from "./UpgradeApk";

export default class Splash extends Component {
    constructor(props){
        super(props);
        if(Platform.OS === 'android'){
            let formData = new FormData()
            url = gIntent.ip+'/api/upgrade';
            let options = {
                method: 'POST',
                headers: {},
                body: formData
            }
            fetch(url).then((response) => response.text()).then((responseText) => {
                let result = JSON.parse(responseText)
                if(result.status == "200"){
                    UpgradeAndroid.upgradeApk(result.url);
                }
            }).done()
        }
    }

    componentDidMount() {
        const { navigator } = this.props
        Storage.load('data',(data) => {
            if(null == data || undefined == data){
                this.timer = setTimeout(()=>{
                    navigator.resetTo({id: 'Login'})
                },2000)
                this.props.isConnected = false
            }else{
                this.props.isConnected = true
                this.timer = setTimeout(()=>{
                    navigator.resetTo({id: 'TabBarView'})
                },2000)
            }
        })
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        return (
            <Image
                style={{width: gScreen.width, height: gScreen.height}}
                source={require('../resource/img_intro_4.png')}
            />
        )
    }
}