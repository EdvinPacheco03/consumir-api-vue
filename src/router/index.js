import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import Inicio from '../views/Inicio.vue';
import Prueba from '../views/Prueba.vue';


//PacientesAz
import Dashboard from '../views/pacientes/Dashboard.vue';
import Editar from '../views//pacientes/Editar.vue';
import Nuevo from '../views/pacientes/Nuevo.vue';

//Notas
import Allnotes from '../views/notas/All-notes.vue';
import Editnotes from '../views/notas/Edit-notes.vue';
import Newnotes from '../views/notas/New-notes.vue';

//Citas
import Alldating from '../views/citas/All-dating.vue';
import Editdating from '../views/citas/Edit-dating.vue';
import Newdating from '../views/citas/New-dating.vue';

//Usuarios
import Allusers from '../views/usuarios/All-users.vue';
import Editusers from '../views/usuarios/Edit-users.vue';
import Newusers from '../views/usuarios/New-users.vue';

 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      libre: true
    }
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: Inicio,
    meta: {
      loggeado: true
    }
  },
  {
    path: '/pacientes/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      loggeado: true
    }
  },
  {
    path: '/pacientes/editar/:id',
    name: 'Editar',
    component: Editar,
    meta: {
      loggeado: true
    }
  },
  {
    path: '/pacientes/nuevo',
    name: 'Nuevo',
    component: Nuevo,
    meta: {
      loggeado: true
    }
  },
  {
    path: '/notas/all-notes',
    name: 'All-notes',
    component: Allnotes,
    meta: {
      loggeado: true
    }
  },
  {
    path: '/notas/edit-notes/:id',
    name: 'Edit-notes',
    component: Editnotes,
    meta: {
      loggeado: true
    }
  },
  {
    path: '/notas/new-notes',
    name: 'New-notes',
    component: Newnotes,
    meta: {
      loggeado: true
    }
  },
  {
    path: '/citas/all-dating',
    name: 'All-dating',
    component: Alldating,
    meta: {
      loggeado: true
    }
  },
  {
    path: '/citas/edit-dating/:id',
    name: 'Edit-dating',
    component: Editdating,
    meta: {
      loggeado: true
    }
  },
  {
    path: '/citas/new-dating',
    name: 'New-dating',
    component: Newdating,
    meta: {
      loggeado: true
    }
  },
  {
    path: '/usuarios/all-users',
    name: 'All-users',
    component: Allusers,
    meta: {
      loggeado: true
    }
  },
  {
    path: '/usuarios/edit-users/:id',
    name: 'Edit-users',
    component: Editusers,
    meta: {
      loggeado: true
    }
  },
  {
    path: '/usuarios/new-users',
    name: 'New-users',
    component: Newusers,
    meta: {
      loggeado: true
    }
  },
  {
    path: '/prueba',
    name: 'prueba',
    component: Prueba,
    meta: {
      loggeado: true
    }
    
  },

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function existToken() {
  return !!localStorage.getItem("token");
}

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.libre)){
    next();
  } else if (existToken()){
    //eslint-disable-next-line
    if (to.matched.some(record => record.meta.loggeado)){
      next();
    }
  } else {
    next({path:'/'});
  }
})

export default router
