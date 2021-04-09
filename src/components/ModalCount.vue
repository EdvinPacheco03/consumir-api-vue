<template>
  <div>
    <b-modal id="ModalCount" class="bg-secondary"  ref="modal" title="Modificar Datos de tu Cuenta">
      <form ref="form">
        <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required" >
          <b-form-input id="name-input" type="text" v-model="form.nombre" required ></b-form-input>
        </b-form-group>
        <b-form-group label="Usuario" label-for="usuario-input" invalid-feedback="Usuario is required">
          <b-form-input id="user-input" type="text" v-model="form.usuario" required ></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="password-input" invalid-feedback="Password is required">
          <b-form-input id="pass-input" type="password" v-model="form.password" required ></b-form-input>
        </b-form-group>
        <b-form-group label="Telefono" label-for="telefono-input" invalid-feedback="Phone is required">
          <b-form-input id="tel-input" type="tel" v-model="form.telefono" required ></b-form-input>
        </b-form-group>
        <div class="form-group">\
          <!-- <button type="button" class="btn btn-dark mr-2 Close" aria-label="Close">Cancelar
          </button> -->
          <center><button type="button" class="btn btn-primary" v-on:click="editar()" >Editar
          </button></center>
        </div> 
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
      name: "ModalCount",
    data() {
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
    methods: {
      editar(){
          axios.put("http://localhost/Apiproyect/usuarios",this.form)
          .then( data =>{
              console.log(data);
          })
      },
      salir(){
        this.$router.push("inicio");
      },
    },
    mounted:function(){
      this.datos = this.$route.params;
      this.idmodal = this.$route.params.idmodal;

      console.log(this.datos);
      if(localStorage.getItem("token") !== null){
        this.form.idusuario = localStorage.getItem("usuario");
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
<style>
  .modal-footer{
    display: none !important;
  }
</style>