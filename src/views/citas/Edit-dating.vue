<template>
        <div>
          <Header />
          <div class="container" id="formulario">
                <form action="" class="form-horizontal">
                    <!-- Datos para obtener el paciente -->
                     <div class="form-group border">
                        <div class="col">
                            <h4 class="text-muted">Informacion del Paciente</h4>
                        </div>
                        <div class="form-group row">
                          <div class="col">
                            <input type="hidden" class="form-control" name="idpaciente" id="idpaciente" v-model="formp.idpaciente">
                                <label for="" class="control-label col-sm-3">DPI</label>
                                <div class="col-sm-12">
                                    <input type="text" class="form-control" name="dpi" id="dpi" v-model="form.dpiP" v-on:keyup="buscar()">
                                </div>
                          </div>
                          <div class="col">
                            <label for="" class="control-label col-sm-5">Nombre</label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="nombre" id="nombre" v-model="formp.nombre" readonly>
                            </div>
                          </div> 
                        </div>
                        <div class="form-group row">
                            <div class="col">
                                <label for="" class="control-label col-sm-2">Direccion</label>
                                <div class="col-sm-12">
                                    <input type="text" class="form-control" name="direccion" id="direccion" v-model="formp.direccion" readonly>
                                </div>
                            </div>
                            <div class="col">
                                <label for="" class="control-label col-sm-2">Telefono</label>
                                <div class="col-sm-12">
                                    <input type="text" class="form-control" name="telefono" id="telefono" v-model="formp.telefono" readonly>
                                </div>
                            </div>
                        </div>
                    </div> 
                  <!-- Datos para la Cita -->
                    <div class="col">
                            <h4 class="text-muted">Informacion de la Cita</h4>
                          </div>
                    <div class="form-group">
                       <label for="" class="control-label col-sm-2">Fecha</label>
                       <div class="col-sm-12">
                          <input type="date" class="form-control" name="fecha" id="fecha" v-model="form.fecha">
                       </div>
                    </div>
                    <div class="form-group row">
                        <div class="col">
                          <label for="" class="control-label col-sm-5">Horario de Inicio</label>
                          <div class="col-sm-12">
                              <input type="time" class="form-control" name="horaI" id="horaI" v-model="form.horarioIn">
                          </div>
                        </div> 
                        <div class="col">
                            <label for="" class="control-label col-sm-3">Horario Fin</label>
                            <div class="col-sm-12">
                                <input type="time" class="form-control" name="horaF" id="horaF" v-model="form.horarioFn">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="control-label col-sm-2">Motivo</label>
                        <div class="col-sm-12">
                            <input type="text" class="form-control" name="motivo" id="motivo" v-model="form.motivo">
                        </div>
                    </div>
                    <div class="form-group">
                      <button type="button" class="btn btn-primary mr-2" v-on:click="editar()" >Editar</button>
                      <button type="button" class="btn btn-danger mr-2" v-on:click="eliminar()" >Eliminar</button>
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
        formp:{
          "idpaciente":"",
          "nombre" : "",
          "direccion": "", 
          "telefono" : "" 
        },
        form:{
            "idcita": "",
            "dpiP":"",
            "fecha" : "",
            "idpaciente": "",
            "horarioIn": "", 
            "horarioFn" : "",
            "motivo":"",
            "token" : "" 
        },
    }
  },
  methods:{
      buscar(){
          let dpi = document.getElementById("dpi").value;
          console.log(dpi);
          axios.get("http://localhost/Apiproyect/pacientes?dpi="+ dpi)
          .then( data =>{
              console.log(data);
              this.formp.idpaciente = data.data[0].PacienteId;
              this.formp.nombre = data.data[0].Nombre;
              this.formp.direccion = data.data[0].Direccion;
              this.formp.telefono = data.data[0].Telefono;
              console.log(this.formp);
          })
      },
      editar(){
          console.log(this.form);
          this.form.idpaciente = document.getElementById("idpaciente").value;
          axios.put("http://localhost/Apiproyect/citas",this.form)
          .then( data =>{
              console.log(data);
          })
      },
      salir(){
        this.$router.push("/citas/all-dating");
      },
      eliminar(){
        var enviar = {
            "idcita" : this.form.idcita,
            "token" : this.form.token
        };
        axios.delete("http://localhost/Apiproyect/citas", { headers : enviar})
        .then( datos => {
            console.log(datos);
           this.$router.push("/citas/all-dating");
        });

      }
  },
  mounted:function(){
      if(localStorage.getItem("token") !== null){
        this.form.idcita = this.$route.params.id;
        axios.get("http://localhost/Apiproyect/citas?id="+ this.form.idcita)
        .then( datos => {
          console.log(datos)
          this.form.dpiP = datos.data[0].DNI;
          this.form.fecha = datos.data[0].Fecha;
          this.form.horarioIn = datos.data[0].HoraInicio;
          this.form.horarioFn = datos.data[0].HoraFin;
          this.form.motivo = datos.data[0].Motivo;
          this.form.idusuario = datos.data[0].id_usuario;
          this.form.token = localStorage.getItem("token");
          console.log(this.form);

        })
      }else{
        let errors = "No estas Autorizado";
        console.log(errors);
        this.$router.push('/');
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