<template>
    <div>
        <Header />
            <div class="container" id="formulario">
                

                <form action="" class="form-horizontal">
                    <div class="card-header">
                        <h2 class="h2">Nuevo Paciente</h2>
                    </div>
                    <div class="form-group">
                       <label for="" class="control-label col-sm-2 mt-3">Nombre</label>
                       <div class="col-sm-12">
                          <input type="text" class="form-control" name="nombre" id="nombre" v-model="form.nombre">
                       </div>
                    </div>
                    <div class="form-group">
                       <label for="" class="control-label col-sm-2">Direccion</label>
                       <div class="col-sm-12">
                          <input type="text" class="form-control" name="direccion" id="direccion" v-model="form.direccion">
                       </div>
                    </div>
                    <div class="form-group row">
                        <div class="col">
                            <label for="" class="control-label col-sm-3">Correo</label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="correo" id="correo" v-model="form.correo">
                            </div>
                        </div>
                        <div class="col">
                            <label for="" class="control-label col-sm-2">DPI</label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="dni" id="dni" v-model="form.dni">
                            </div>
                        </div> 
                    </div>
                    <div class="form-group row">
                         <div class="col">
                            <label for="" class="control-label col-sm-2">Genero</label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="genero" id="genero" v-model="form.genero">
                            </div>
                          </div>
                         <div class="col">
                              <label for="" class="control-label col-sm-2">Telefono</label>
                              <div class="col-sm-12">
                                  <input type="tel" class="form-control" name="telefono" id="telefono" v-model="form.telefono">
                              </div>
                        </div>
                    </div>
                    <div class="form-group row ">
                        <div class="col">
                              <label for="" class="control-label col-sm-2">Fecha nacimiento</label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="fechanacimineto" id="telefono" v-model="form.fechaNacimiento">
                            </div>
                        </div>
                    </div>


                    <div class="form-group">
                      <button type="button" class="btn btn-primary mr-2" v-on:click="guardar()" >Guardar</button>
                      <button type="button" class="btn btn-dark margen" v-on:click="salir()"  >Salir</button>
                    </div> 
                </form>


            </div>
        <!-- <Footer /> -->

    </div>
</template>
<script>
import Header from '@/components/Header.vue'
//import Footer from '@/components/Footer.vue'
import axios from 'axios';
export default {
    name:"Nuevo",
    data:function(){
        return {
            form:{
                "nombre" : "",
                "direccion": "", 
                "dni" : "",
                "correo":"",
                "genero" : "",
                "telefono" : "",
                "fechaNacimiento" : "",
                "idusuario": "",
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
            axios.post("http://localhost/Apiproyect/pacientes",this.form)
            .then(data =>{
                console.log(data);
                this.makeToast("Listo","Paciente creado","success");
                this.$router.push("/pacientes/dashboard");
            }).catch( e =>{
                console.log(e);
                 this.makeToast("Error","Error al guardar al paciente ", "danger");
            })
        },
        salir(){
            this.$router.push("/pacientes/dashboard");
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