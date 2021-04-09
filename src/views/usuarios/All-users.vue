<template>
    <div>
        <Header/>

            <div class="container izquierda">

                <button class="btn btn-primary" v-on:click="nuevo()" >Nuevo usuario</button>
                <br><br>
                <table class="table table-hover" id="tabla" v-if="cant !== 0">
                    <thead class="bg-primary">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Telefono</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="usuario in Listausuarios" :key="usuario.id_usuario">
                            <th scope="row">{{ usuario.id_usuario}}</th>
                            <td data-th="Nombre">{{ usuario.nombre }}</td>
                            <td data-th="Usuario">{{ usuario.usuario }}</td>
                            <td data-th="Telefono">{{ usuario.telefono }}</td>
                            <td data-th="Acciones"><a class="btn btn-success" title="Mas detalles" type="button" :key="usuario.id_usuario" v-on:click="editar(usuario.id_usuario)" >Mas detalles</a></td>
                        </tr>
                    </tbody>
                </table>
                    <div class="card mx-auto" v-if="cant === 0">
                        <div class="card-body">
                        <h1>Hola {{ username }}</h1>
                        <p clsss="lead">Aun no hay ningun Usuario</p>
                        <a href="/notas/new-notes" class="btn btn-success btn-block">Crear Uno!</a>
                        </div>
                    </div>

            </div><br><br><br><br>

        <Footer />
    </div>

</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';
export default {
    name:"All-dating",
    data(){
        return {
            Listausuarios:null,
            pagina:1,
            user:null,
            token:null,
            username:null,
            day:null,
            cant:null
        }
    },
    components:{
        Header,
        Footer
    },
    methods:{
            editar(id){
                this.$router.push('/usuarios/edit-users/' + id);
            },
            nuevo(){
                this.$router.push('/usuarios/new-users');
            }
            
    },
    
    mounted:function(){
        this.idrol = localStorage.idrol;
        this.token = localStorage.token;
        this.username = localStorage.nameuser;
        this.day = Date('Y-m-d');
        let direccion = "http://localhost/Apiproyect/usuarios?idrol=" + this.idrol + "&token=" + this.token;
        axios.get(direccion).then( data =>{
            if(data.data.status == "ok"){
                console.log(data);
                this.Listausuarios = data.data.result.usuarios;
                this.cant = this.Listausuarios.length
            }else{
                let errors = "No estas Autorizado";
                console.log(errors);
                this.$router.push('/');
            }
        });
    }
}
</script>
<style  scoped>
    .izquierda{
        text-align: left;
    }
</style>