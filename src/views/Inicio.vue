<template>
    <div>
        <Header />
        <div class="container">

            <div class="form-group">
                <button type="button" class="btn btn-primary mr-2" v-on:click="salir()" title="Cerrar Sesion"><img src="@/assets/signout.png" width="40px" alt=""></button>
                <b-button v-b-modal.ModalCount class="mr-3px" title="Editar datos de Cuenta"><img src="@/assets/settings.png" width="40px" alt=""></b-button>
            </div>
            <ModalCount />
            <div class="form-group">
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-sm-6 ">
                        <div class="card-box bg-blue">
                            <div class="inner">
                                <p class="text-card"> Total de Pacientes Registrados </p>
                                <center><h3 class="h3"> {{ totalp }} </h3></center>
                                
                            </div>
                            <div class="icon">
                                <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                            </div>
                            <a href="/pacientes/Dashboard.vue" class="card-box-footer">Ver Mas <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <div v-if="rol == 1" class="col-lg-3 col-sm-6 ml-4 mr-4">
                        <div class="card-box bg-green">
                            <div class="inner">
                                <p class="text-card"> Total de usuarios Registrados </p>
                                <h3 class="h3"> {{ totalu }} </h3>
                            </div>
                            <div class="icon">
                                <i class="fa fa-money" aria-hidden="true"></i>
                            </div>
                            <a href="/usuarios/all-users" class="card-box-footer">Ver Mas <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <div v-else class="col-lg-3 col-sm-6 ml-4 mr-4">
                        <div class="card-box bg-green">
                            <div class="inner">
                                <p class="text-card"> Bienvenido </p>
                                <h3 class="h3"> {{ nameuser }} </h3>
                            </div>
                            <div class="icon">
                                <i class="fa fa-money" aria-hidden="true"></i>
                            </div>
                            <a href="/usuarios/all-users" class="card-box-footer">Ver Mas <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="card-box bg-orange">
                            <div class="inner">
                                <p class="text-card"> Total de Notas Registrados </p>
                                <h3 class="h3"> {{ totaln }} </h3>
                            </div>
                            <div class="icon">
                                <i class="fa fa-user-plus" aria-hidden="true"></i>
                            </div>
                            <a href="/notas/all-notes" class="card-box-footer">Ver Mas <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <!--Todas las citas para el dia presente(pero que es el presente?) -->
            <table class="table table-hover" id="tabla">
                    <thead>
                        <tr>
                            <th scope="col" class="center">ID</th>
                            <th scope="col" class="center">Estado</th>
                            <th scope="col" class="center">Fecha</th>
                            <th scope="col">MOTIVO</th>
                            <th scope="col">NOMBRE</th>
                            <th scope="col" class="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cita in Listacitas" :key="cita.CitaId" v-on:click="editar(cita.CitaId)">
                            <th scope="row">{{ cita.CitaId}}</th>
                            <td>{{ cita.Estado }}</td>
                            <td>{{ cita.Fecha }}</td>
                            <td>{{ cita.Motivo }}</td>
                            <td>{{ cita.Nombre }}</td>
                            <a class="btn btn-success center mb-2 mt-2" title="Mas detalles" type="button" :key="cita.CitaId" v-on:click="editar(cita.CitaId)" >Mas detalles<img src="@/assets/font-selection-editor.png" width="35px" alt=""></a>
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
import ModalCount from '@/components/ModalCount.vue';
import axios from 'axios';
export default {
    name: 'Inicio',
    components:{
        Header,
        Footer,
        ModalCount
    },
    data:function(){
        return {
            user:null,
            Listacitas:null,
            token:null,
            rol:null,
            totalp:null,
            totaln:null,
            totalu:null,
            nameuser:null,
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
        this.rol = localStorage.idrol;
        this.nameuser = localStorage.getItem('nameuser')
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
        let totalpacientes = "http://localhost/Apiproyect/pacientes?idusuario=" + this.user;
        axios.get(totalpacientes).then( data =>{
            console.log(data);
            this.totalp = data.data[0].total;
        });
        let totalusuarios = "http://localhost/Apiproyect/usuarios?idrol=" + this.rol;
        axios.get(totalusuarios).then( data =>{
            console.log(data);
            this.totalu = data.data[0].total;
        });
        let totalnotas = "http://localhost/Apiproyect/notas?idusuario=" + this.user;
        axios.get(totalnotas).then( data =>{
            console.log(data);
            this.totaln = data.data[0].total;
        });
    }
    
}
</script>