<template>
        <div>
          <Header />
            
            <div class="title-box">
              <h2 class="h2">Modificar Usuario</h2>
            </div>
            <div class="container" id="formulario">
                <form action="" class="form-horizontal">
                    <div class="form-group">
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
                      <button type="button" class="btn btn-primary mr-2" v-on:click="editar()" >Editar
                      </button>
                      <button type="button" class="btn btn-danger manger mr-2" v-on:click="eliminar()" >eliminar
                      </button>
                      <button type="button" class="btn btn-dark margen"  v-on:click="salir()" >salir
                      </button>
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
          "idusuario":"",
          "nombre" : "",
          "usuario": "", 
          "password": "",
          "telefono": "",
          "idrol": "",
          "token" : "",
        },
    }
  },
  methods:{
      editar(){
          axios.put("http://localhost/Apiproyect/usuarios",this.form)
          .then( data =>{
              console.log(data);
          })
      },
      salir(){
        this.$router.push("/usuarios/all-users");
      },
      eliminar(){
        var enviar = {
            "idusuario" : this.form.idusuario,
            "token" : this.form.token
        };
        axios.delete("http://localhost/Apiproyect/usuarios", { headers : enviar})
        .then( datos => {
            console.log(datos);
           this.$router.push("/usuarios/all-users");
        });

      }
  },
  mounted:function(){
      if(localStorage.getItem("token") !== null){
        this.form.idusuario = this.$route.params.id;
        axios.get("http://localhost/Apiproyect/usuarios?iduser="+ this.form.idusuario)
        .then( data => {
          console.log(data);
          
          this.form.nombre = data.data[0].nombre;
          this.form.usuario = data.data[0].usuario;
          //this.form.password = data.data[0].password;
          this.form.telefono = data.data[0].telefono;
          this.form.idrol = data.data[0].idrol;
          this.form.token = localStorage.getItem("token");
          console.log(this.form);

        })
      }
     
  }  
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