/**
 * Created by ljunb on 2016/12/1.
 */
import React, {PureComponent} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import MyStorage from "../store/MyStorage";

export default class MessageInfo extends PureComponent{

    state = {
        viewCount:0
    }

    constructor(props){
        super(props);
        MyStorage.load(props.type+"count",this.onCallBack);
    }

    onCallBack = (value) => {
        if(null == value || "undefined" == value || "" == value){
            value = 0;
        }
        this.setState({viewCount: value});
    }
    render(){
        const {viewCount} = this.state
        let readFlag = true
        if(viewCount == 0){
            readFlag = false
        }
        const {title,content, cardImg, publisher,type,createTime,onPress} = this.props
        let text = readFlag?<Text style={styles.infoNum} >{viewCount}</Text>:null
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                style={styles.container}
                onPress={onPress}
            >
                <View style={{justifyContent: 'space-between'}}>
                    <Text numberOfLines={2} style={styles.title}>{title}</Text>
                    <View style={styles.content}>
                        <Text style={{color: 'rgb(150,150,150)', fontSize: 13}}>{publisher}</Text>
                        <View style={styles.imgWrapper}>
                            <Image
                                style={styles.feedIcon}
                                source={require('../resource/ic_feed_watch.png')}
                            />
                            <Text style={styles.viewCount}>{createTime}</Text>
                        </View>
                    </View>
                </View>
                <Image
                    style={styles.image}
                    source={{uri: cardImg}}
                    defaultSource={require('../resource/img_news_default.png')}
                />
                {text}
            </TouchableOpacity>
        )
    }
}


const FeedSingleImageItem = ({
    title,
    content,
    cardImg,
    publisher,
    type,
    createTime,
    onPress
}) => {

    alert(title)


}

const styles = StyleSheet.create({
    container: {
        width: gScreen.width,
        padding: 15,
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    title: {
        width: gScreen.width * 0.55,
        fontSize: 15
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imgWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 80,
        width: (gScreen.width - 15 * 2 - 10 * 2) / 3
    },
    feedIcon: {
        width: 14,
        height: 14,
        marginRight: 3
    },
    viewCount: {
        color: 'rgb(150,150,150)',
        fontSize: 13
    },
    infoNum: {
        fontSize: 12,
        minWidth: 20,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 24,
        position: 'absolute',
        top: 8,
        right: 8,
        color: 'white',
        paddingLeft: 4,
        paddingRight: 5,
        textAlign: 'center'
    }
})
