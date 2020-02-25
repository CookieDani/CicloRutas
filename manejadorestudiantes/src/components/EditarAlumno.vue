<template>
    <div id='editar-alumno'> 
        <h3>Editar alumno</h3>
        <div class="row">
            <form @submit.prevent="actualizarAlumno" class="col s12">
                <div class="row">
                <div class="input-field col s12">
                    <input disabled type="text" v-model="alumno_id" required>
               
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="name" required>
                 
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="dept" required>
                  
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="position" required>
                </div>
            </div>
            <button type="submit" class="btn">Editar</button>
            <router-link to='/' class="btn grey">Atras</router-link>
            </form>
            
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'editar-alumno',
    data (){
        return{
            alumno_id:null,
            name:null,
            dept:null,
            position:null
        }
    },
    beforeRouteEnter(to, from, next){
        db.collection('employees').where('employee_id',
        '==', to.params.alumno_id
        ).get()
        .then(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                next(vm =>{
                    vm.alumno_id = doc.data().employee_id
                    vm.name = doc.data().name
                    vm.dept = doc.data().dept
                    vm.position = doc.data().position
                })
            })
        })
    },
    watch:{
        '$route':'fetchData'
    },
    methods: {
        fetchData(){
            db.collection('employees').where('employee_id','==',this.$route.params.alumno_id).get()
            .then(querySnapshot =>{
                querySnapshot.forEach(doc =>{
                    this.alumno_id = doc.data().employee_id
                    this.name = doc.data().name
                    this.dept = doc.data().dept
                    this.position = doc.data().position
                })
            })
        },
        actualizarAlumno(){
            db.collection('employees').where('employee_id','==',this.$route.params.alumno_id).get()
            .then(querySnapshot =>{
                querySnapshot.forEach(doc =>{
                    doc.ref.update({
                        employee_id: this.alumno_id,
                        name: this.name,
                        dept: this.dept,
                        position: this.position
                    })
                    .then( () =>{
                        this.$router.push({name:'vista-alumno', params:{alumno_id:this.alumno_id}})
                    })
                })
            })
        }
    }
}
</script>