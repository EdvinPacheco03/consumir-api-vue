<template>
    <div>
        <Header/>

            <div class="container izquierda">

                <button class="btn btn-primary" v-on:click="nuevo()" >Nueva Cita</button>
                <br><br>

                <table class="table table-hover" id="tabla" v-if="cant !== 0">
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
                            <td data-th="Estado">{{ cita.Estado }}</td>
                            <td data-th="Fecha">{{ cita.Fecha }}</td>
                            <td data-th="Motivo">{{ cita.Motivo }}</td>
                            <td data-th="Nombre">{{ cita.Nombre }}</td>
                            <td data-th="Acciones"><a class="btn btn-success mb-2" title="Mas detalles" type="button" :key="cita.CitaId" v-on:click="editar(cita.CitaId)" >Mas detalles<img src="@/assets/font-selection-editor.png" width="35px" alt=""></a></td>
                        </tr>
                
                    </tbody>
                </table>
                    <div class="card mx-auto" v-if="cant === 0">
                        <div class="card-body">
                        <h1>Hola {{ username }}</h1>
                        <p clsss="lead">Aun no hay Notas que mostrar.</p>
                        <a href="/notas/new-notes" class="btn btn-success btn-block">Crear Una!</a>
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
    name:"All-dating",
    data(){
        return {
            Listacitas:null,
            pagina:1,
            user:null,
            token:null,
            username:null,
            cant:null,
            idrol:null
        }
    },
    components:{
        Header,
        Footer
    },
    methods:{
            editar(id){
                this.$router.push('/citas/edit-dating/' + id);
            },
            nuevo(){
                this.$router.push('/citas/new-dating');
            }
            
    },
    mounted:function(){
        this.user = localStorage.usuario;
        this.token = localStorage.token;
        this.username = localStorage.nameuser;
        this.idrol = localStorage.idrol;
        let direccion = "http://localhost/Apiproyect/citas?iduser=" + this.user + "&token=" + this.token;
        axios.get(direccion).then( data =>{
            if(data.data.status == "ok"){
                console.log(data);
                this.Listacitas = data.data.result.citas;
                this.cant = this.Listacitas.length;
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
<style  scoped>
    .izquierda{
        text-align: left;
    }
</style>