<template>
    <div>
        <Header/>

            <div class="container izquierda">

                <button class="btn btn-primary" v-on:click="nuevo()" >Nueva Nota</button>
                <br><br>

                <div class="row">
                    <div v-for="nota in Listanotas" :key="nota.idnotas" class="col-md-3">
                        <div class="card">
                        <div class="card-body">
                            <h4 class="card-title d-flex justify-content-between align-items-center">
                            {{ nota.titulo }}
                            </h4>
                            <p>{{ nota.descripcion }} </p>
                            <!-- DELETE REQUEST -->
                            <div class="form-group">
                                <button type="button" v-on:click="editar(nota.idnotas)" class="btn btn-success btn-block btn-sm">Mas Detalles</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="card mx-auto" v-if="cant === 0">
                        <div class="card-body">
                        <h1>Hola {{ username }}</h1>
                        <p clsss="lead">Aun no hay Notas que mostrar.</p>
                        <a href="/notas/new-notes" class="btn btn-success btn-block">Crear Una!</a>
                        </div>
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
    name:"All-notes",
    data(){
        return {
            Listanotas:null,
            pagina:1,
            user:null,
            token:null,
            username:null,
            cant:null
        }
    },
    components:{
        Header,
        Footer
    },
    methods:{
            editar(id){
                this.$router.push('/notas/edit-notes/' + id);
            },
            nuevo(){
                this.$router.push('/notas/new-notes');
            }
            
    },
    
    mounted:function(){
        this.user = localStorage.usuario;
        this.token = localStorage.token;
        this.username = localStorage.nameuser;
        let direccion = "http://localhost/Apiproyect/notas?iduser=" + this.user + "&token=" + this.token;
        axios.get(direccion).then( data =>{
            if(data.data.status == "ok"){
                console.log(data);
                this.Listanotas = data.data.result.notas;
                this.cant = this.Listanotas.length;
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