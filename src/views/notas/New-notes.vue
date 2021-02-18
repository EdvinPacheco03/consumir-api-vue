<template>
    <div>
        <Header />
            <div class="container">
                <div class="col-md-4 mx-auto">
                    <div class="card text-center">
                        <div class="card-header">
                        <h3>Nueva Nota</h3>
                        </div>
                        <div class="card-body">
                        <form action="" >
                            <div class="form-group">
                                <label for="" class="control-label">Titulo</label>
                                <input type="text" name="titulo" id="nombre" class="form-control" placeholder="Titulo" v-model="form.titulo" autofocus/>
                            </div>
                            <div class="form-group">
                                <label for="" class="control-label">Descripcion</label>
                                <textarea name="descripcion" id="descripcion" class="form-control" placeholder="Descripcion" v-model="form.descripcion"></textarea>
                            </div>
                            <div class="form-group">
                            <button class="btn btn-primary col-sm-4 mr-2" type="button" v-on:click="guardar()" >
                                Guardar
                            </button>
                            <button type="button" class="btn btn-dark margen col-sm-4" v-on:click="salir()"  >Salir</button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
            </div>
        <!-- <Footer /> -->

    </div>
</template>
<script>
import Header from '@/components/Header.vue'
//import Footer from '@/components/Footer.vue'
import axios from 'axios';
export default {
    name:"New-note",
    data:function(){
        return {
            form:{
                "titulo" : "",
                "descripcion": "",
                "idusuario" : "",
                "token" : "" 
            }
        }
    },
    components:{
        Header,
        //Footer
    },
    methods:{
        guardar(){
            this.form.token = localStorage.getItem("token");
            this.form.idusuario = localStorage.getItem("usuario");
            console.log(this.form);
            axios.post("http://localhost/Apiproyect/notas",this.form)
            .then(data =>{
                console.log(data);
                this.makeToast("Listo","Nota creada","success");
                this.$router.push("/notas/all-notes");
            }).catch( e =>{
                console.log(e);
                 this.makeToast("Error","Error al guardar la nota ","error", "danger");
            })
        },
        salir(){
            this.$router.push("/notas/all-notes");
        },
        makeToast(titulo,texto,tipo) {
            this.toastCount++
            this.$bvToast.toast(texto, {
            title: titulo,
            variant: tipo,
            autoHideDelay: 5000,
            appendToast: true
            })
        }
        
    }
}
</script>
<style scoped>
.left{
    text-align:  left;
}
</style>