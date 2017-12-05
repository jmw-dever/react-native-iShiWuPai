/**
 * Created by ljunb on 2016/12/14.
 */
import {action, computed, observable, runInAction} from "mobx";
import {post} from "../common/HttpTool";

export default class FoodEncyclopediaStore {
    @observable foodCategoryList = []
    @observable errorMsg = ''
    @observable isRefreshing = false;
    @observable page = 1

    constructor(url){
        this.listurl = url
        this.fetchCategoryList()
    }
    @action
    fetchCategoryList = async() => {
        try {
            const url = this.listurl
            const responseData = await post({url}).then(res => res)

            runInAction(() => {
                this.isRefreshing = false
                let listInfo =JSON.parse(responseData._bodyInit).list;
                this.foodCategoryList.replace(listInfo)
                this.errorMsg = ''
            })
        } catch (error) {
            if (error.msg) {
                this.errorMsg = error.msg
            } else {
                this.errorMsg = error
            }
        }
    }

    @computed
    get isFetching() {
        return this.foodCategoryList.length === 0 && this.errorMsg === ''
    }

    @computed
    get isNoResult() {
        return this.foodCategoryList.length === 0
    }
}
