<template>
    
    <nav>
        <div class="nav-wrapper black " style="font-family:'Permanent Marker';">
            <div class="row">
                <div class="col offset-s0 brand-logo">
                    <img  src="/static/logo_ciclo.jpeg" height="60px">
                </div>
                <div class="container z-depth-0">
                
                <router-link to='/'
                class='brand-logo center' >Administración</router-link>
                <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="right">
                    <li v-if="isLoggedIn"><router-link to='/'>Dashboard</router-link></li>
                    <li v-if="!isLoggedIn"><router-link to='/login'>Login</router-link></li>
                    <li v-if="isLoggedIn"><button v-on:click='logout' class="btn red" style="font-family:'Permanent Marker';">Salir</button></li>
                </ul>
            </div>
            </div>
            
           
        </div>
    </nav>
</template>

<script>
import firebase from 'firebase'
export default {
    name:'navbar',
    data(){
        return{
            isLoggedIn:false,
            currentUser:false
        }
    },
    created(){
        if(firebase.auth().currentUser){
            this.isLoggedIn = true
            this.currentUser = firebase.auth().currentUser.email
        }
    },
    methods:{
        logout: function(){
            firebase
            .auth()
            .signOut()
            .then( () => {
                this.$router.push('/login');
            });
        }
    }
}
</script>

