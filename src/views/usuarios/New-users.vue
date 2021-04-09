<template>
        <div>
          <Header />
          <div class="container" id="formulario">
                <form action="" class="form-horizontal">
                    <div class="form-group">
                      <div class="card-header">
                        <h2 class="h2">Nuevo Usuario</h2>
                      </div>
                        <div class="form-group">
                            <label for="" class="control-label col-sm-2">Nombre</label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="nombre" id="nombre" v-model="form.nombre">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col">
                                <label for="" class="control-label col-sm-3">Usuario</label>
                                <div class="col-sm-12">
                                    <input type="email" class="form-control" name="correo" id="usuario" v-model="form.usuario">
                                </div>
                            </div>
                            <div class="col">
                                <label for="" class="control-label col-sm-5">Password</label>
                                <div class="col-sm-12">
                                    <input type="password" class="form-control" name="password" id="password" v-model="form.password">
                                </div>
                            </div> 
                        </div>
                        <div class="form-group row">
                            <div class="col">
                                <label for="" class="control-label col-sm-2">Telefono</label>
                                <div class="col-sm-12">
                                    <input type="tel" class="form-control" name="telefono" id="telefono" v-model="form.telefono">
                                </div>
                            </div>
                            <div class="col">
                                <label for="" class="control-label col-sm-2">Rol</label>
                                <div class="col-sm-12">
                                    <input type="number" class="form-control" name="idrol" id="idrol" v-model="form.idrol">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                      <button type="button" class="btn btn-primary mr-2" v-on:click="guardar()" >Guardar</button>
                      <button type="button" class="btn btn-dark margen" v-on:click="salir()" >Salir</button>
                    </div> 
                </form>
            </div>
          <!-- <Footer />   -->
        </div>
    
</template>
<script>
import Header from '@/components/Header.vue';
//import Footer from '@/components/Footer.vue';
import axios from 'axios';
export default {
  name:"Editar",
  components:{
    Header,
    //Footer
  },
  data:function(){
    return {
        form:{
            "nombre":"",
            "usuario" : "",
            "password": "", 
            "telefono" : "",
            "idrol":"",
            "token" : "" 
        },
    }
  },
  methods:{
      buscar(){
        //   axios.get("http://localhost/Apiproyect/pacientes?dpi="+ dpi)
        //   .then( data =>{
        //       console.log(data);
        //       this.formp.idpaciente = data.data[0].PacienteId;
        //       this.formp.nombre = data.data[0].Nombre;
        //       this.formp.direccion = data.data[0].Direccion;
        //       this.formp.telefono = data.data[0].Telefono;
        //       console.log(this.formp);
        //   })
      },
      salir(){
        this.$router.push("/usuarios/all-users");
      },
      guardar(){
          this.form.token = localStorage.token;
          axios.post("http://localhost/Apiproyect/usuarios", this.form)
          .then( data => {
            console.log(data);
                    this.makeToast("Listo","Usuario Creadi","success");
                    this.$router.push("/usuarios/all-users");
                }).catch( e =>{
                    console.log(e);
                     this.makeToast("Error","Error al guardar el usuario ","error", "danger");
                })
            console.log(this.form);
        
        },
        makeToast(titulo,texto,tipo) {
                this.toastCount++
                this.$bvToast.toast(texto, {
                title: titulo,
                variant: tipo,
                autoHideDelay: 5000,
                appendToast: true
                }); 
        }
  },
      
}
</script>
<style scoped>
 .left{
   text-align: left;
 };
 .margen{
   margin-left: 15px;
   margin-right: 15px;;
 }
</style>