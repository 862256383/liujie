export const state = {
    info:sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):{}
}
export const mutations = {
    changeInfo(state, obj) {
        state.info = obj
    }
}
export const getters = {
    info(state) {
        return state.info
    }
}