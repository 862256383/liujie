import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'

Vue.use(Router)
function changeEnter(path,next){
  let routerUrl = store.state.info.menus_url
        if(routerUrl.includes(path)){
          next()
        } else{
          next('/')
        }
}
export const secondRouter = [
  {
    path: 'banner',
    name:'轮播图管理',
    beforeEnter: (to, from, next) => {
      changeEnter('/banner',next)
    },
    component: () => import('../page/banner/banner.vue')
  },{
    path: 'cate',
    name:'商品分类',
    beforeEnter: (to, from, next) => {
      changeEnter('/cate',next)
    },
    component: () => import('../page/cate/cate.vue')
  },{
    path: 'goods',
    name:'商品管理',
    beforeEnter: (to, from, next) => {
      changeEnter('/goods',next)
    },
    component: () => import('../page/goods/goods.vue')
  },{
    path: 'manage',
    name:'管理员管理',
    beforeEnter: (to, from, next) => {
      changeEnter('/manage',next)
    },
    component: () => import('../page/manage/manage.vue')
  },{
    path: 'member',
    name:'会员管理',
    beforeEnter: (to, from, next) => {
      changeEnter('/member',next)
    },
    component: () => import('../page/member/member.vue')
  },{
    path: 'menu',
    name:'菜单管理',
    beforeEnter: (to, from, next) => {
      changeEnter('/menu',next)
    },
    component: () => import('../page/menu/menu.vue')
  },{
    path: 'role',
    name:'角色管理',
    beforeEnter: (to, from, next) => {
      changeEnter('/role',next)
    },
    component: () => import('../page/role/role.vue')
  },{
    path: 'seckill',
    name:'秒杀活动',
    beforeEnter: (to, from, next) => {
      changeEnter('/seckill',next)
    },
    component: () => import('../page/seckill/seckill.vue')
  },{
    path: 'specs',
    name:'商品规格',
    beforeEnter: (to, from, next) => {
      changeEnter('/specs',next)
    },
    component: () => import('../page/specs/specs.vue')
  },
]

let route = new Router({
  routes: [{
    path: '/',
    component: () => import('../page/index/index.vue'),
    children: [{
      path: '',
      component: () => import('../page/home/home.vue')
    },...secondRouter]
  }, {
    path: '/login',
    component: () => import('../page/login/login.vue')
  }]
})
route.beforeEach((to,from,next) => {
  if(to.path=="/login") {
    next()
    return
  }
  if(store.state.info.token){
    next()
    return
  }
  next('/login')
})
export default route
