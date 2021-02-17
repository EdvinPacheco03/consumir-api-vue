<template>
    <div>
        <Header />
        <div class="container">

            <div class="form-group">
                <button type="button" class="btn btn-primary" v-on:click="salir()" >Salir</button>
            </div>

            <!--Todas las citas para el dia presente(pero que es el presente?) -->
            <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">MOTIVO</th>
                            <th scope="col">NOMBRE</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cita in Listacitas" :key="cita.CitaId" v-on:click="editar(cita.CitaId)">
                            <th scope="row">{{ cita.CitaId}}</th>
                            <td>{{ cita.Estado }}</td>
                            <td>{{ cita.Fecha }}</td>
                            <td>{{ cita.Motivo }}</td>
                            <td>{{ cita.Nombre }}</td>
                            <a class="btn btn-success" title="Mas detalles" type="button" :key="cita.CitaId" v-on:click="editar(cita.CitaId)" >Mas detalles</a>
                        </tr>
                
                    </tbody>
                </table>
        </div>

        <Footer />
    </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';
export default {
    name: 'Inicio',
    components:{
        Header,
        Footer
    },
    data:function(){
        return {
            user:null,
            Listacitas:null,
            token:null,
            tokio:{
                "token": ""
            },
        }
    },
    methods:{
        salir(){
            var enviar = {
            "token" : this.tokio.token
            };
            axios.delete("http://localhost/Apiproyect/token", { headers : enviar })
            .then( datos => {
                console.log(datos);
                localStorage.clear();
            this.$router.push('/');
            });
        },
        editar(id){
        this.$router.push('/citas/edit-dating/' + id);
        },
    },
    mounted:function(){
        this.user = localStorage.usuario;
        this.token = localStorage.token;
        let direccion = "http://localhost/Apiproyect/citas?idusuario=" + this.user + "&token=" + this.token;
        axios.get(direccion).then( data =>{
            if(data.data.status == "ok"){
                console.log(data);
                this.tokio.token = localStorage.token;
                this.Listacitas = data.data.result.citas;
                console.log(this.Listacitas);
            }else{
                let errors = "No estas Autorizado";
                console.log(errors);
                this.$router.push('/');
            }
        });
    }
    
}
</script>