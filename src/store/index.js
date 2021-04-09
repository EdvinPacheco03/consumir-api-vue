import Vue from 'vue'
import Vuex from 'vuex'
// import auth from './modules/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rol: null,
  },
  mutations: {
    userRol(state,payload) {
      state.rol = payload
    },
  },
  actions:{
    userAdmin({ commit }){
      /*Funcion para asignar el rol del usuario logueado en el state y listo v: */
      if(localStorage.getItem('idrol')){
        commit('userRol', localStorage.getItem('idrol'));
        
      } else {
        commit('userRol', null);
      }
    },
  },
  // modules: {
  //   auth
  // }
})