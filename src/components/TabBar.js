/**
 * Created by ljunb on 16/8/21.
 */
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'
import MyStorage from '../store/MyStorage'

export default class TabBar extends Component {
    static propType = {
        goToPage    : React.PropTypes.func,
        activeTab   : React.PropTypes.number,
        tabs        : React.PropTypes.array,

        tabNames    : React.PropTypes.array,
        tabIconNames: React.PropTypes.array
    }

    state = {
        allCount: 0
    }

    constructor(props){
        super(props)
        MyStorage.load("allCount",this.onCallBack)
    }

    onCallBack = (value) =>{
        if(null != value){
            this.setState({allCount: value})
        }
    }

    render() {
        const { activeTab, selectedTabIconNames, tabIconNames, tabNames, goToPage } = this.props
        const {allCount} = this.state
        let readFlag = false
        if(allCount != 0){
            readFlag = true
        }
        return (
            <View style={[styles.tabs, {borderTopWidth: gScreen.onePix}]}>
                {this.props.tabs.map((tab, i) => {
                    let color = activeTab === i ? 'red' : 'gray'
                    let icon = activeTab === i ? selectedTabIconNames[i] : tabIconNames[i]
                    return (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.8}
                            style={styles.tab}
                            onPress={()=>goToPage(i)}
                        >
                            <View style={styles.tabItem}>
                                <Image style={styles.icon} source={icon}/>
                                <Text style={styles.infoNum} isShow={!readFlag}>{allCount}</Text>
                                <Text style={{color: color, fontSize: 12}}>{tabNames[i]}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: 49,
        borderTopColor: '#d9d9d9',
    },

    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    icon: {
        width: 26,
        height: 26,
        marginBottom: 2
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