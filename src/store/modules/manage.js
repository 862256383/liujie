import {manageList,manageCount} from '../../utlis/request.js'
const state ={
    list:[],
    size:2,
    count:0,
    page:1
}
const mutations = {
    changeList(state,arr){
        state.list = arr
    },
    changeCount(state,n){
        state.count = n
    },
    changePage(state,n){
        state.page = n
    }
}
const actions = {
    reqChangeList(context){
        manageList({size:context.state.size,page:context.state.page}).then(res => {
            
            let list = res.data.list?res.data.list:[]
            if(list.length == 0 && context.state.page>1){
                context.commit('changePage',context.state.page-1)
                context.dispatch('reqChangeList')
            }
            context.commit('changeList',list)
        })
    },
    reqChangeCount(context){
        manageCount().then(res => {
            context.commit('changeCount',res.data.list[0].total)
        })
    },
    reqChangePage(context,n){
        context.commit('changePage',n)
        context.dispatch('reqChangeList')
    }
}
const getters = {
    list(state){
        return state.list
    },
    size(state){
        return state.size
    },
    count(state){
        return state.count
    },
    page(state){
        return state.page
    }
}
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}