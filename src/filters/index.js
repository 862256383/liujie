import Vue from 'vue'
import {filterPrice} from './price.js'

let obj = {
    filterPrice
}

for(let i in obj){
    Vue.filter(i,obj[i])
}