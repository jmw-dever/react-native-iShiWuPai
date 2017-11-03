/**
 * Created by Devil on 2017/10/30.
 */

import {observable, computed, action, runInAction} from 'mobx'
import MyStorage from '../store/MyStorage'

export default class LoadMessage {
    @observable messagesList = []
    @observable isRefreshing = false;
    @observable errorMsg = ''

    @action
    fetchList = async() => {
        try {
            let myCurrent = []
            MyStorage.load('currentKey',function (value) {
                if(null != value){
                    this.messagesList.replace(value) ;
                }
            })

            runInAction(() => {
                this.isRefreshing = false
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
        return this.messagesList.length === 0 && this.errorMsg === ''
    }

    @computed
    get isNoResult() {
        return this.messagesList.length === 0
    }

}
