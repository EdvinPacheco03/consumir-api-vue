
export default {
  state: {
    rol: null
  },
  mutations: {
    userRol(state,payload) {
      state.rol = payload
    },
  },
  actions:{
    userAdmin({ commit }){
      /**
       * Esta pequeña funcion se encarga de revisar si el Rol guardado como
       * idrol, esta en el LocalStorage y si esta, guardarlo en su respectivo State,
       * esto es para verificar que el usuario es administrador".
       */
      if(localStorage.getItem('idrol')){
        commit('userRol', localStorage.getItem('idrol'));
        
      } else {
        commit('setToken', null);
      }
    },
  }
};
