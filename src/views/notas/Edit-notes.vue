<template>
        <div>
          <Header />
          <div class="col-md-4 mx-auto">
            <div class="card">
              <div class="card-header">
                <h3>Editar Notas</h3>
              </div>
              <div class="card-body">
                <form>
                  <div class="form-group">
                    <input type="text" name="titulo" id="titulo" class="form-control" v-model="form.titulo"/>
                  </div>
                  <div class="form-group">
                    <textarea name="descripcion" id="descripcion" class="form-control" v-model="form.descripcion"></textarea>
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
            </div>
          </div>
          <!-- <Footer />   -->
        </div>
    
</template>
<script>
import Header from '@/components/Header.vue';
//import Footer from '@/components/Footer.vue';
import axios from 'axios';
export default {
  name:"Edit-notes",
  components:{
    Header,
    //Footer
  },
  data:function(){
    return {
        form:{
          "idnotas":"",
          "titulo" : "",
          "descripcion": "", 
          "token" : "" 
        }
    }
  },
  methods:{
      editar(){
          axios.put("http://localhost/Apiproyect/notas",this.form)
          .then( data =>{
              console.log(data);
          })
      },
      salir(){
        this.$router.push("/notas/all-notes");
      },
      eliminar(){
        var enviar = {
            "idnotas" : this.form.idnotas,
            "token" : this.form.token
        };
        axios.delete("http://localhost/Apiproyect/notas", { headers : enviar})
        .then( datos => {
            console.log(datos);
           this.$router.push("/notas/all-notes");
        });

      }
  },
  mounted:function(){
      this.form.idnotas = this.$route.params.id;
      axios.get("http://localhost/Apiproyect/notas?id="+ this.form.idnotas)
      .then( datos => {
        console.log(datos)
        this.form.descripcion = datos.data[0].descripcion;
        this.form.titulo = datos.data[0].titulo;
        this.form.token = localStorage.getItem("token");
        console.log(this.form);

      })
     
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