<template>
    <div>
        <Header/>

            <div class="container izquierda">
                 <!-- No entres dosilmente en esa buena noche :v -->
                <button class="btn btn-primary" v-on:click="nuevo()" >Nuevo paciente</button>
                <br><br>

                <!-- Buscador De Pacientes -->
                <!-- <form id="demo-b">
                    <input type="search" placeholder="Buscar" v-model="searchData">
                </form> -->
                <div class="control-label">
                    <div class="control">
                        <input type="search" placeholder="Buscar" v-model="searchData">
                    </div>
                </div>
                <br>
                <table class="table table-hover" id="tabla" v-if="cant !== 0">
                    <thead role='rowgroup'>
                        <tr>
                            <th scope="col" class="center">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">DNI</th>
                            <th scope="col">TELEFONO</th>
                            <th scope="col">CORREO</th>
                            <th class="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody role='rowgroup'>
                        <tr v-for="Listapacientes in filteredPacientes" :key="Listapacientes.PacienteId">
                            <th scope="row" data-th='ID'>{{ Listapacientes.PacienteId}}</th>
                            <td data-th='Nombre'>{{ Listapacientes.Nombre }}</td>
                            <td data-th='DPI'>{{ Listapacientes.DNI }}</td>
                            <td data-th='Telefono'>{{ Listapacientes.Telefono }}</td>
                            <td data-th='Correo'>{{ Listapacientes.Correo }}</td>
                            <td data-th='Actions'>
                                <button href="/pacientes/editar" class="btn btn-primary center" title="Mas detalles de este Paciente" v-on:click="editar(Listapacientes.PacienteId)">Mas detalles <img src="@/assets/font-selection-editor.png" width="35px" alt=""></button>
                                <button class="btn center" title="Contactar por WhatsApp" v-on:click="contactar(Listapacientes.Telefono)" type="button"><img src="@/assets/whatsapp.png" width="50px" class="rounded" alt=""></button>
                            </td>
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

            </div><br><br><br><br>

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
            Listapacientes: [],
            pagina:1,
            user:null,
            token:null,
            username:null,
            cant:null,
            rol:null,
            searchData: ''
        }
    },
    components:{
        Header,
        Footer
    },
    computed:{
        filteredPacientes (){
            if(!this.searchData) return this.Listapacientes

            return this.Listapacientes.filter(Listapacientes => {
                return [
                    Listapacientes.PacienteId,
                    Listapacientes.Nombre,
                    Listapacientes.DNI,
                    Listapacientes.Telefono,
                    Listapacientes.Correo
                ].find(field => {
                    return field.toLowerCase().includes(this.searchData.toLowerCase().trim())
                })
            })
        }
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
        this.user = localStorage.getItem("usuario");
        this.token = localStorage.getItem("token");
        this.username = localStorage.getItem("nameuser");
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