<template>
    <div id='dashboard'> 
        <ul class="collection with-header">
        <li class="collection-header"><h4>First Names</h4></li>
        <li v-for="alumno in alumnos"
        v-bind:key="alumno.id" class="collection-item"> 
            <div class="chip">{{alumno.dept}}</div>
            {{alumno.employee_id}}:{{alumno.name}}
            <router-link class="secondary-content"
            v-bind:to="{name:'vista-alumno', params:{alumno_id: alumno.employee_id}}">
            <i class="fa fa-eye"></i>
            </router-link>
        </li>
        
        </ul>
            
        <div class="fixed-action-btn">
            <router-link to='/new' class="btn-floating btn-large blue">
            <i class="fa fa-plus"></i>

            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'dashboard',
    data (){
        return{
            alumnos:[]
        }
    },
    created (){
        db.collection('employees').orderBy('name').get().then(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                console.log(doc.data())
                const data = {
                    'id': doc.id,
                    'employee_id': doc.data().employee_id,
                    'name': doc.data().name,
                    'dept': doc.data().dept,
                    'position': doc.data().position
                }
                this.alumnos.push(data)
            })
        })
    }
}
</script>