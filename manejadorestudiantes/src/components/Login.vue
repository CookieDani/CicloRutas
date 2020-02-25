<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="login card-panel black white-text center">
                        <h3>Login</h3>
                        <form>
                            <div class="input-field ">
                                <i class="material-icons prefix">email</i>
                                <input class="white-text" type="text" id='email' v-model="email">
                                <label class="white-text" for="email">Correo</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">lock</i>
                                <input class="white-text" type="password" id="password" v-model="password">
                                <label class="white-text" for="password">Contraseña</label>
                            </div>
                            <button v-on:click='login' class="btn btn-large white lighten-4 black-text">Ingreso</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    name:'login',
    data: function(){
        return {
            email:'',
            password:''
        }
    },
    methods:{
        login: function(e){
            firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(
                user =>{
                    
                    alert(`Haz ingresado al sistema como ${user.email}`);
                    this.$router.push('/');
                },
                err => {
                    alert(err.message);
                }
            );
            e.preventDefault()
        }
    }
}
</script>
