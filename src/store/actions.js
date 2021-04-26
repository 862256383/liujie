const actions = {
    reqChangeInfo(context, obj) {
        context.commit('changeInfo', obj)
        sessionStorage.setItem('userInfo',JSON.stringify(obj))
    }
}
export default actions