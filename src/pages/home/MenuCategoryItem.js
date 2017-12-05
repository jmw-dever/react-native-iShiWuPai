/**
 * Created by Devil on 2017/10/13.
 */

import React, {PureComponent} from "react";
import {StyleSheet, View,TouchableOpacity,Image,Text,Linking,RefreshControl,ScrollView} from "react-native";
import {observer} from "mobx-react/native";
import {reaction} from "mobx";
import Loading from "../../components/Loading";
import Toast from "react-native-easy-toast";
import FoodEncyclopediaStore from "../../store/foodEncyclopediaStore";

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
        Linking.canOpenURL(murl).then(supported => { // weixin://  alipay://
            if (supported) {
                Linking.openURL(murl);
            } else {
                ToastAndroid.show(`请先安装XXX`,ToastAndroid.SHORT);
            }
        }); 
        //alert(murl);
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
                <View style={styles.categoryView}>
                    <View style={styles.groupHeader}>
                        <Text style={{color: 'gray',alignSelf: 'center'}}>标题</Text>
                        <View style={{width: gScreen.width - 16 * 2, height: 14, backgroundColor: '#f5f5f5'}}>
                            <Image style={{width: gScreen.width - 16 * 2, height: 14}}
                                   source={require('../../resource/img_home_list_bg.png')}
                            />
                        </View>
                    </View>
                    <View style={styles.categoryContainer}>
                        {foodCategoryList.map((category) => {
                            return (
                                <TouchableOpacity
                                    key={category.mindex}
                                    activeOpacity={0.75}
                                    style={styles.category}
                                    onPress={() => this.onPress(category.murl)}
                                >
                                    <Image
                                        style={styles.categoryIcon}
                                        source={{uri: category.mimageView}}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.categoryTitle}>{category.mtitle}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
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
        alignItems: 'center',
        marginBottom: 10,
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
        padding: 10,
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