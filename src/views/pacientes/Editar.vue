<template>
        <div>
          <Header />
            <div class="title-box">
              <h2 class="h2">Modificar Paciente</h2>
            </div>
            <div class="container"  id="formulario">
                <form action="" class="form-horizontal">
                    <div class="form-group">
                       <label for="" class="control-label col-sm-2"><b>Nombre</b></label>
                       <div class="col-sm-12">
                          <input type="text" class="form-control" name="nombre" id="nombre" v-model="form.nombre">
                       </div>
                    </div>
                    <div class="form-group">
                       <label for="" class="control-label col-sm-2"><b>Direccion</b></label>
                       <div class="col-sm-12">
                          <input type="text" class="form-control" name="direccion" id="direccion" v-model="form.direccion">
                       </div>
                    </div>
                    <div class="form-group row">
                        <div class="col">
                            <label for="" class="control-label col-sm-3"><b>Correo</b></label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="correo" id="correo" v-model="form.correo">
                            </div>
                        </div>
                        <div class="col">
                          <label for="" class="control-label col-sm-5"><b>codigo Postal</b></label>
                          <div class="col-sm-12">
                              <input type="text" class="form-control" name="codigopostal" id="codigopostal" v-model="form.codigoPostal">
                          </div>
                        </div> 
                    </div>
                    <div class="form-group row">
                         <div class="col">
                            <label for="" class="control-label col-sm-2"><b>Genero</b></label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="genero" id="genero" v-model="form.genero">
                            </div>
                          </div>
                         <div class="col">
                              <label for="" class="control-label col-sm-2"><b>Telefono</b></label>
                              <div class="col-sm-12">
                                  <input type="text" class="form-control" name="telefono" id="telefono" v-model="form.telefono">
                              </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="control-label col-sm-2"><b>Fecha nacimiento</b></label>
                       <div class="col-sm-12">
                          <input type="text" class="form-control" name="fechanacimineto" id="telefono" v-model="form.fechaNacimiento">
                       </div>
                    </div>


                    <div class="form-group">
                      <button type="button" class="btn btn-primary" v-on:click="editar()" >Editar</button>
                      <button type="button" class="btn btn-danger margen" v-on:click="eliminar()" >Eliminar</button>
                      <button type="button" class="btn btn-dark margen" v-on:click="salir()"  >Salir</button>
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
          "pacienteId":"",
          "nombre" : "",
          "direccion": "", 
          "dni" : "",
          "correo":"",
          "codigoPostal" :"",
          "genero" : "",
          "telefono" : "",
          "fechaNacimiento" : "",
          "token" : "" 
        }
    }
  },
  methods:{
      editar(){
          axios.put("http://localhost/Apiproyect/pacientes",this.form)
          .then( data =>{
              console.log(data);
          })
      },
      salir(){
        this.$router.push("/pacientes/dashboard");
      },
      eliminar(){
        var enviar = {
            "pacienteId" : this.form.pacienteId,
            "token" : this.form.token
        };
        axios.delete("http://localhost/Apiproyect/pacientes", { headers : enviar})
        .then( datos => {
            console.log(datos);
           this.$router.push("/pacientes/dashboard");
        });

      }
  },
  mounted:function(){
      if(localStorage.getItem("token") !== null){
        this.form.pacienteId = this.$route.params.id;
        axios.get("http://localhost/Apiproyect/pacientes?id="+ this.form.pacienteId)
        .then( datos => {
          
          this.form.nombre = datos.data[0].Nombre;
          this.form.direccion = datos.data[0].Direccion;
          this.form.dni = datos.data[0].DNI;
          this.form.correo = datos.data[0].Correo;
          this.form.codigoPostal = datos.data[0].CodigoPostal;
          this.form.genero = datos.data[0].Genero;
          this.form.telefono = datos.data[0].Telefono;
          this.form.fechaNacimiento = datos.data[0].FechaNacimiento;
          this.form.token = localStorage.getItem("token");
          console.log(this.form);

        });
      }else{
        let errors = "No estas Autorizado";
        console.log(errors);
        this.$router.push('/');
      }
     
  }  
}
</script>
<style scoped>
.margen{
   margin-left: 15px;
   margin-right: 15px;;
 }
</style>