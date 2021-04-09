<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/inicio">Inicio</b-navbar-brand>
            <b-navbar-brand href="/pacientes/dashboard">Pacientes</b-navbar-brand>
            <b-navbar-brand href="/notas/all-notes">Notas</b-navbar-brand>
            <b-navbar-brand href="/citas/all-dating">Citas</b-navbar-brand>
            <div v-if="rol == 1"><b-navbar-brand href="/usuarios/all-users">Usuario</b-navbar-brand></div>
        </b-navbar>
        <br><br>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
    name: 'Header',
    computed: {
      ...mapState(['rol'])
    },
}
</script>