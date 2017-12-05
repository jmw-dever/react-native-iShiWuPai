/**
 * Created by Devil on 2017/10/13.
 */


import React, {PureComponent} from "react";
import {inject, observer} from "mobx-react/native";
import {reaction} from "mobx";
import FeedsCategoryBar from "../../components/FeedsCategoryBar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import MenuCategoryItem from "./MenuCategoryItem";
import MenuCategoryIndex from "./MenuCategoryIndex";

@inject('account')
@observer
export default class MenuCategory extends PureComponent{

    constructor(props){
        super(props);
        this.tableNames = props.tableName
        this.controllers = props.controllers
    }

    render (){
        let controllers = this.controllers
        const {navigator} = this.props;
        return (
            <ScrollableTabView
                renderTabBar={() =>  <FeedsCategoryBar tabNames={this.tableNames}/> }
                tabBarPosition='top'
                scrollWithoutAnimation={false}
            >
                <MenuCategoryIndex
                    listurl=""
                    tabLabel="0"
                    navigator={navigator}
                    key="0"/>

                {controllers.map((data,index) => {
                    let controller = data.listurl
                    return (
                        <MenuCategoryItem
                            listurl={controller}
                            tabLabel={index + 1}
                            navigator={navigator}
                            key={index + 1}/>
                    )
                })}
            </ScrollableTabView>
        )
    }
}
