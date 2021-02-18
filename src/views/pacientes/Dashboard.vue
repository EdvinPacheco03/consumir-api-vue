<template>
    <div>
        <Header/>

            <div class="container izquierda">

                <button class="btn btn-primary" v-on:click="nuevo()" >Nuevo paciente</button>
                <br><br>


                <table class="table table-hover" v-if="cant !== 0">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">DNI</th>
                            <th scope="col">TELEFONO</th>
                            <th scope="col">CORREO</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="paciente in Listapacientes" :key="paciente.PacienteId">
                            <th scope="row">{{ paciente.PacienteId}}</th>
                            <td>{{ paciente.Nombre }}</td>
                            <td>{{ paciente.DNI }}</td>
                            <td>{{ paciente.Telefono }}</td>
                            <td>{{ paciente.Correo }}</td>
                            <a href="/pacientes/editar" class="btn btn-primary" v-on:click="editar(paciente.PacienteId)">Mas detalles</a>
                            <a class="btn btn-success" title="Contactar por WhatsApp" v-on:click="contactar(paciente.Telefono)" type="button">wusap</a>
                        </tr>
                
                    </tbody>
                </table>
                <div class="card mx-auto" v-else>
                        <div class="card-body">
                        <h1>Hola {{ username }}</h1>
                        <p clsss="lead">Aun no hay Pacientes que mostrar.</p>
                        <a href="/pacientes/nuevo" class="btn btn-success btn-block">Crear Una!</a>
                        </div>
                    </div>

            </div><br><br>

        <Footer />
    </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';
export default {
    name:"Dashboard",
    data(){
        return {
            Listapacientes:null,
            pagina:1,
            user:null,
            token:null,
            username:null,
            cant:null,
            rol:null
        }
    },
    components:{
        Header,
        Footer
    },
    methods:{
            editar(id){
                this.$router.push('/pacientes/editar/' + id);
            },
            nuevo(){
                this.$router.push('/pacientes/nuevo');
            },
            contactar(Telefono){
                window.open('https://api.whatsapp.com/send?phone=+502'+ Telefono, '_blank');
            }
    },
    
    mounted:function(){
        this.user = localStorage.usuario;
        this.token = localStorage.token;
        this.username = localStorage.nameuser;
        this.rol = localStorage.getItem("idrol");
        let direccion = "http://localhost/Apiproyect/pacientes?iduser=" + this.user + "&token=" + this.token;
        axios.get(direccion).then( data =>{
            if(data.data.status == "ok"){
                console.log(data);
                this.Listapacientes = data.data.result.pacientes;
                this.cant = this.Listapacientes.length;
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