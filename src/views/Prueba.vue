<template>
    <div>
        <Header />
        <div class="container">
            <b-button v-b-modal.ModalCount>Open Modal</b-button>
            
            <ModalCount />

            <div class="form-group">
                <button type="button" class="btn btn-primary" v-on:click="salir()" >Salir <img src="@/assets/signout.png" width="45px" alt=""></button>
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#miModal">
                    Crear Nuevo Usuario
                </button>
                <button class="btn btn-secondary" title="Editar" v-on:click="btnEditar(user)">
                    {{ rol }}
                </button>
            </div>
              

        </div>

        <Footer />
    </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ModalCount from '@/components/ModalCount.vue';
// import Modal from '@/components/ModalCount.vue'
// import { mdbContainer, mdbBtn, mdbModal, mdbModalHeader, mdbModalBody, mdbInput, mdbModalFooter, mdbModalTitle, mdbRow, mdbIcon } from 'mdbvue';
import axios from 'axios';
import swal from 'sweetalert';
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
    name: 'Prueba',
    components:{
        Header,
        Footer,
        ModalCount,
        // mdbContainer,
        // mdbBtn,
        // mdbModal,
        // mdbModalHeader,
        // mdbModalBody,
        // mdbInput,
        // mdbModalFooter,
        // mdbModalTitle,
        // mdbRow,
        // mdbIcon
    },
    data:function(){
        return {
            user:null,
            Listacitas:null,
            token:null,
            totalp:null,
            totaln:null,
            totalu:null,
            tokio:{
                "token": ""
            },
            elegant: false,
        }
    },
    methods:{
        ...mapActions(['userAdmin']),
        salir(){
            var enviar = {
            "token" : this.tokio.token
            };
            axios.delete("http://localhost/Apiproyect/token", { headers : enviar })
            .then( datos => {
                console.log(datos);
                localStorage.clear();
            this.$router.push('/');
            });
        },
        // editar(id){
        // this.$router.push('/citas/edit-dating/' + id);
        // },
        btnEditar: function(user) {
            console.log(user)
                swal.$fire({
                title: "Editar",
                html:
                '<div class="form-group"><div class="row"><label class="col-sm-3 col-form-label">Nombre</label><div class="col-sm-7"><input id="nombre" value="' +
                user +
                '" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Apellido</label><div class="col-sm-7"><input id="apellido" value="' +
                user +
                '" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Direccion</label><div class="col-sm-7"><input id="direccion" value="' +
                user +
                '" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Telefono</label><div class="col-sm-7"><input id="telefono" value="' +
                user +
                '" type="tel" class="form-control"></div></div></div>',
                focusConfirm: false,
                showCancelButton: true,
            }).then((result) => {
                console.log(result);
            });
        },
    },
    mounted:function(){
        this.user = localStorage.usuario;
        this.token = localStorage.token;
        // let direccion = "http://localhost/Apiproyect/citas?idusuario=" + this.user + "&token=" + this.token;
        // axios.get(direccion).then( data =>{
        //     if(data.data.status == "ok"){
        //         console.log(data);
        //         this.tokio.token = localStorage.token;
        //         this.Listacitas = data.data.result.citas;
        //         console.log(this.Listacitas);
        //     }else{
        //         let errors = "No estas Autorizado";
        //         console.log(errors);
        //         this.$router.push('/');
        //     }
        // });
        
    },
    computed: {
      ...mapState(['rol'])
    },
    
}
</script>
