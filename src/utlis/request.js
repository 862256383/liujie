import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
let baseUrl = '/api'
Vue.prototype.$imgUrl = 'http://localhost:3000'
// let baseUrl = ''
// Vue.prototype.$imgUrl = ''

axios.interceptors.response.use(res => {
    console.log('===拦截开始===');
    console.log(res);
    console.log('===拦截结束===');
    return res
})
// =======菜单管理======
// 添加
export const menuAdd = form => {
    return axios({
        url:baseUrl + '/api/menuadd',
        method:'post',
        data:qs.stringify(form)
    })
}

// 列表
export const menuList = () => {
    return axios({
        url:baseUrl + '/api/menulist',
        method:'get',
        params:{
            istree:true
        }
    })
}
// 删除
export  const menuDel = (form) => {
    return axios({
        url:baseUrl +'/api/menudelete',
        method:'post',
        data:qs.stringify(form)
    })
}
//获取一条信息
export const menuInfo = (id) => {
    return axios({
        url:baseUrl + '/api/menuinfo',
        method:'get',
        params:{
            id:id
        }
    })
}
// 修改
export const menuEdit = (form) => {
    return axios({
        url:baseUrl + '/api/menuedit',
        method:'post',
        data:qs.stringify(form)
    })
}

// =======角色管理=======
// 添加
export const roleAdd = (form) => {
    return axios({
        url:baseUrl + '/api/roleadd',
        method:'post',
        data:qs.stringify(form)
    })
}
// 列表
export  const roleList = (id) => {
    return axios({
        url:baseUrl + '/api/rolelist',
        method:'get',
        params:{
            id:id
        }
    })
}
// 获取一条信息
export  const roleInfo = (id) => {
    return axios({
        url:baseUrl + '/api/roleinfo',
        method:'get',
        params:{
            id:id
        }
    })
}
// 确定编辑
export const roleEdit = (form) => {
    return axios({
        url:baseUrl + '/api/roleedit',
        method:'post',
        data:qs.stringify(form)
    })
}
// 删除
export const roleDel = (id) => {
    return axios({
        url:baseUrl + '/api/roledelete',
        method:'post',
        data:qs.stringify({
            id:id
        })
    })
}
// =======管理员管理=======
//添加
export const manageAdd = (form) => {
    return axios({
        url:baseUrl + '/api/useradd',
        method:'post',
        data:qs.stringify(form)
    })
}
// 列表
export const manageList = (form) => {
    return axios({
        url:baseUrl + '/api/userlist',
        method:'get',
        params:form
    })
}
// 获取一条信息
export const manageInfo = (uid) => {
    return axios({
        url: baseUrl + '/api/userinfo',
        method:'get',
        params:{
            uid:uid
        }
    })
}
// 编辑
export const manageEdit = (form) => {
    return axios({
        url: baseUrl + '/api/useredit',
        method:'post',
        data:qs.stringify(form)
    })
}
// 删除
export const manageDel = (uid) => {
    return axios({
        url:baseUrl + '/api/userdelete',
        method:'post',
        data:qs.stringify(uid)
    })
}
// 总数(计算分页)
export const manageCount = () => {
    return axios({
        url:baseUrl + '//api/usercount',
        method:'get'
    })
}
// 商品分类管理
// 列表
export const cateList = (form) => {
    return axios({
        url:baseUrl + '/api/catelist',
        method:'get',
        params:form
    })
}
// 添加
export const cateAdd = (form) => {
    let obj = new FormData()
    for(let i in form){
        obj.append(i,form[i])
    }
    return axios({
        url:baseUrl + '/api/cateadd',
        method:'post',
        data:obj
    })
}
// 删除
export const catDel = id => {
    return axios({
        url:baseUrl + '/api/catedelete',
        method:'post',
        data:qs.stringify(id)
    })
}
// 获取一条信息
export const cateInfo = (id) => {
    return axios({
        url:baseUrl + '/api/cateinfo',
        method:'get',
        params:{
            id:id
        }
    })
}
// 编辑
export const cateEdit = (form) => {
    let obj = new FormData()
    for(let i in form){
        obj.append(i,form[i])
    }
    return axios({
        url:baseUrl + '/api/cateedit',
        method:'post',
        data:obj
    })
}