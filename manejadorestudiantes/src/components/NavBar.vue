<template>
    
    <nav>
        <div class="nav-wrapper black " style="font-family:'Permanent Marker';">
            <div class="row">
                
                <div class="col offset-l1 brand-logo">
                    <img  src="/static/logo_ciclo.png" height="62px">
                </div>
                <div class=" z-depth-0">
                
                <router-link to='/'
                class='brand-logo center hide-on-med-and-down' >Administración</router-link>
                 <button  data-target="mobile-demo" v-on:click='sidebar' class="white-text black btn sidenav-trigger  show-on-medium-and-down hide-on-med-and-up"><i class="material-icons">menu</i></button>
                    
                <ul class="right hide-on-med-and-down" style="font-family:'Lora, Sans Serif';">
                    <li v-if="isLoggedIn"><router-link to='/'>Estudiantes</router-link></li>
                    <li v-if="isLoggedIn"><router-link to='/profesores/'>Profesores</router-link></li>
                    <!-- <li v-if="!isLoggedIn"><router-link to='/login'>Login</router-link></li> -->
                    <li v-if="isLoggedIn"><button v-on:click='logout' class="btn red" style="font-family:'Lora';margin-right: 25px;';">Salir</button></li>
                </ul>
                <br>
                <ul class=" show-on-medium-and-down col s12 grey darken-1 " id="mobile-demo">

                        <div id='esto' class="row hide">
                            <li class='col s12 center' v-if="isLoggedIn"><router-link  to='/'>Estudiantes</router-link></li>
                            <li class='col s12 center' v-if="isLoggedIn"><router-link  to='/profesores/'>Profesores</router-link></li>
                            <!-- <li class='col s12 center' v-if="!isLoggedIn"><router-link   to='/login'>Login</router-link></li> -->
                            <li class='col s12 center' v-if="isLoggedIn"><button  v-on:click='logout' class="btn red " style="font-family:'Permanent Marker';">Salir</button></li>
                    
                        </div>
                    
                    
                </ul>
            </div>
            </div>
        

        </div>
        
    </nav>
    
</template>

<script>
import firebase from 'firebase'
var valor = false
export default {
    name:'navbar',
    data(){
        return{
            isLoggedIn:false,
            currentUser:false,
            valor:true
        }
    },
    created(){
        if(firebase.auth().currentUser){
            this.isLoggedIn = true
            this.currentUser = firebase.auth().currentUser.email
        }
        document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
        });
    },
    methods:{
        logout: function(){
            firebase
            .auth()
            .signOut()
            .then( () => {
                this.$router.push('/login');
            });
        },
        sidebar: function(){
            var elemento = document.getElementById("esto");
            if(valor){
                elemento.classList.add('hide');
            }else{
                elemento.classList.remove('hide');
            }
            valor = !valor
            
            
        }
    }
}
</script>

