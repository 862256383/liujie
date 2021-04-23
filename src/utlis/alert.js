import Vue from 'vue';
const vm = new Vue();
export const success = message => {
    vm.$message({
        message,
        type: 'success'
      });
}

export const warning = message => {
    vm.$message({
        message,
        type: 'warning'
      });
}