<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/inicio">NavBar</b-navbar-brand>
            <b-navbar-brand href="/pacientes/dashboard">Pacientes</b-navbar-brand>
            <b-navbar-brand href="/notas/all-notes">Notas</b-navbar-brand>
            <b-navbar-brand href="/citas/all-dating">Citas</b-navbar-brand>
            <b-navbar-brand v-if="rol === 1" href="/usuarios/all-users">Usuario</b-navbar-brand>
        </b-navbar>
        <br><br>
    </div>
</template>
<script>
export default {
    data(){
        return {
            rol:null,
        }
    },
    unmounted() {
        this.rol = localStorage.getItem("idrol");
    },
}
</script>