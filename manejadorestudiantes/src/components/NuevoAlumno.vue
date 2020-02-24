<template>
    <div id='nuevo-alumno'> 
        <h3>Nuevo alumno</h3>
        <div class="row">
            <form @submit.prevent="guardarAlumno" class="col s12">
                <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="alumno_id" required>
                    <label>Id alumno</label>
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="name" required>
                    <label>Nombre</label>
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="dept" required>
                    <label>Department</label>
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="position" required>
                    <label>Position</label>
                </div>
            </div>
            <button type="submit" class="btn">Ingresar</button>
            <router-link to='/' class="btn grey">Atras</router-link>
            </form>
            
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'nuevo-empleado',
    data (){
        return{
            alumno_id: null,
            name: null,
            dept: null,
            position: null
        }
    },
    methods:{
        guardarAlumno(){
            db.collection('employees').add({
                employee_id:this.alumno_id,
                name: this.name,
                dept: this.dept,
                position: this.position
            }).then(docRef => this.$router.push('/'))
            .catch(error => console.log(error))
        }
    }
}
</script>