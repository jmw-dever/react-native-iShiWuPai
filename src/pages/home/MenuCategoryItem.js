/**
 * Created by Devil on 2017/10/13.
 */

import React, {PureComponent} from "react";
import {Image,Platform,RefreshControl,Linking, ScrollView, ToastAndroid,StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react/native";
import {reaction} from "mobx";
import Loading from "../../components/Loading";
import Toast from 'react-native-root-toast'
import FoodEncyclopediaStore from "../../store/foodEncyclopediaStore";
import JoeWebView from "../../components/JoeWebView"

@observer
export default class MenuCategoryItem extends PureComponent{

    constructor(props){
        super(props)
        this.foodEncyclopediaStore = new FoodEncyclopediaStore(this.props.listurl)
    }

    componentDidMount() {
        reaction(
            () => this.foodEncyclopediaStore.page,
            () => this.foodEncyclopediaStore.fetchCategoryList()
        );
    }

    componentWillReact() {
        const {errorMsg} = this.foodEncyclopediaStore
        errorMsg && this.toast && this.toast.show(errorMsg)
    }

    _onRefresh = () => {
        this.foodEncyclopediaStore.isRefreshing = true;
        this.foodEncyclopediaStore.fetchCategoryList()
    };

    onPress = (murl) => {
        if(murl.startsWith("http://")){
            this.props.navigator.push({id: 'JoeWebView',passProps: {url: murl,onBack: ()=> this.props.navigator.pop()}});
        }else{
            Linking.canOpenURL(murl).then(supported => { // weixin://  alipay://
                if (supported) {
                    Linking.openURL(murl);
                } else {
                    let message = "请先安装软件";
                    if(Platform.OS === 'ios'){
                        // Add a Toast on screen.
                        let toast = Toast.show(message, {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.CENTER,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                            onShow: () => {
                                // calls on toast\`s appear animation start
                            },
                            onShown: () => {
                                // calls on toast\`s appear animation end.
                            },
                            onHide: () => {
                                // calls on toast\`s hide animation start.
                            },
                            onHidden: () => {
                                // calls on toast\`s hide animation end.
                            }
                        });

                        // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
                        setTimeout(function () {
                            Toast.hide(toast);
                        }, 1000);
                    }else if(Platform.OS === 'android'){
                        ToastAndroid.show(message,ToastAndroid.SHORT)
                    }
                }
            });
        }
    }
    render () {
        const {foodCategoryList,isFetching,isRefreshing} = this.foodEncyclopediaStore
        return (
            <ScrollView style={{flex: 1}}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={this._onRefresh}
                                colors={['rgb(217, 51, 58)']}
                            />
                        }
            >
                {!isFetching &&
                <View>
                    {foodCategoryList.map((category) => {
                            return (
                                <View style={styles.categoryView} key={category.id}>
                                    <View style={styles.groupHeader}>
                                        <Text style={{color: 'gray',alignSelf: 'center'}}>{category.mName}</Text>
                                        <View style={{width: gScreen.width - 16 * 2, height: 14, backgroundColor: '#f5f5f5'}}>
                                            <Image style={{width: gScreen.width - 16 * 2, height: 14}}
                                                   source={require('../../resource/img_home_list_bg.png')}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.categoryContainer}>
                                        {category.mChildren.map((children) => {
                                            return (
                                                <TouchableOpacity
                                                    key={children.id}
                                                    activeOpacity={0.75}
                                                    style={styles.category}
                                                    onPress={() => this.onPress(children.mUrl)}
                                                >
                                                    <Image
                                                        style={styles.categoryIcon}
                                                        source={{uri: children.mImg}}
                                                        resizeMode="contain"
                                                    />
                                                    <Text style={styles.categoryTitle}>{children.mName}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </View>
                            )
                        })}
                </View>
                }
                <Loading isShow={isFetching}/>
                <Toast ref={toast => this.toast = toast}/>
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