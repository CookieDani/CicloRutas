<template>
    <div id='vista-alumno'> 
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{name}}</h4></li>
            <li class="collection-item">Employe id#: {{alumno_id}}</li>
            <li class="collection-item">Dept: {{dept}}</li>
            <li class="collection-item">Position: {{position}}</li>
        
        </ul>
        <router-link to='/' class='btn grey'>Back</router-link>
        <button @click="deleteAlumno" class='btn red'>Borrar</button>
         <div class="fixed-action-btn">
            <router-link v-bind:to="{name:'edit'}" class="btn-floating btn-large blue">
            <i class="fa fa-plus"></i>

            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'vista-alumno',
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
        deleteAlumno(){
            if(confirm('Estas seguro?')){
                db.collection('employees').where('employee_id','==',this.$route.params.alumno_id).get()
            .then(querySnapshot =>{
                querySnapshot.forEach(doc =>{
                    doc.ref.delete();
                    this.$router.push('/')
                })
            })
            }
        }
    }
}
</script>