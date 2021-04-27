

const actions = {
    reqChangeInfo(context, obj) {
        context.commit('changeInfo', obj)
        if(obj.token) {
            sessionStorage.setItem('userInfo',JSON.stringify(obj))
        }else {
            sessionStorage.removeItem('userInfo')
        }
    }
}
export default actions