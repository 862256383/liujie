import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import actions from './actions.js'
import { state, mutations, getters } from './mutations'
import menu from './modules/menu.js'
import role from './modules/role.js'
import manage from './modules/manage.js'
import cate from './modules/cate'
import specs from './modules/specs.js'
import goods from './modules/goods'
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: {
        menu,
        role,
        manage,
        cate,
        specs,
        goods
    }
})