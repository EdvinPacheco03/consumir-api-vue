import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import Inicio from '../views/Inicio.vue';


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
    component: Home
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/pacientes/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/pacientes/editar/:id',
    name: 'Editar',
    component: Editar
  },
  {
    path: '/pacientes/nuevo',
    name: 'Nuevo',
    component: Nuevo
  },
  {
    path: '/notas/all-notes',
    name: 'All-notes',
    component: Allnotes
  },
  {
    path: '/notas/edit-notes/:id',
    name: 'Edit-notes',
    component: Editnotes
  },
  {
    path: '/notas/new-notes',
    name: 'New-notes',
    component: Newnotes
  },
  {
    path: '/citas/all-dating',
    name: 'All-dating',
    component: Alldating
  },
  {
    path: '/citas/edit-dating/:id',
    name: 'Edit-dating',
    component: Editdating
  },
  {
    path: '/citas/new-dating',
    name: 'New-dating',
    component: Newdating
  },
  {
    path: '/usuarios/all-users',
    name: 'All-users',
    component: Allusers
  },
  {
    path: '/usuarios/edit-users/:id',
    name: 'Edit-users',
    component: Editusers
  },
  {
    path: '/usuarios/new-users',
    name: 'New-users',
    component: Newusers
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
