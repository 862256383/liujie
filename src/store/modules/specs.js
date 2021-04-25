import { specsList, specsCount } from '../../utlis/request.js'
const state = {
    list: [],
    size: 2,
    count: 0,
    page: 4
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeCount(state, n) {
        state.count = n
    },
    changePage(state, n) {
        state.page = n
    }
}
const actions = {
    reqChangeList(context) {
        specsList({ size: context.state.size, page: context.state.page }).then(res => {
            let list = res.data.list ? res.data.list : []
            if (list.length == 0 && context.state.page > 1) {
                context.commit('changePage', context.state.page - 1)
                context.dispatch('reqChangeList')
                return
            }
            list.forEach(item => item.attrs = JSON.parse(item.attrs))
            context.commit('changeList', list)
        })
    },
    reqChangeCount(context) {
        specsCount().then(res => {
            context.commit('changeCount', res.data.list[0].total)
        })
    },
    reqChangePage(context, e) {
        context.commit('changePage', e)
        context.dispatch('reqChangeList')
    }
}
const getters = {
    list(state) {
        return state.list
    },
    size(state) {
        return state.size
    },
    count(state) {
        return state.count
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}