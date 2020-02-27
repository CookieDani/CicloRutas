<template>
    <div id='dashboard'> 
       
        <!-- <ul class="collection with-header">
        <li class="collection-header center"><h4>Estudiantes</h4></li> -->
        <!-- <input id="dls_search_input" onkeyup="search_table()" type="text" /> -->
        <div class="container">
             <h4 class="center">Estudiantes</h4>
        <div class="row">
            <div class="col s12">
            <div class="row">
                <div class="input-field col s12">
                <i class="material-icons prefix">search</i>
                <input type="text" id="busqueda" class="autocomplete">
                <label for="busqueda">Buscar estudiante</label>
                </div>
            </div>
            </div>
        </div>
        </div>

        <table class="responsive-table centered">
        <thead >
          <tr>
              <th>Cédula</th>
              <th>Nombres</th>
              <th>Correo</th>
              <th>Fecha fin</th>
              <th></th>
          </tr>
        </thead>

        <tbody>
          <tr  v-for="alumno in alumnos"  v-bind:key="alumno.id">
            <td> <div class="chip">{{alumno.cedula}}</div></td>
            <td> {{alumno.nombre}} </td>
            <td>{{alumno.correo}}</td>
            <td>{{alumno.fecha_fin}}</td>
            <td>
                <router-link class="secondary-content "
                v-bind:to="{name:'vista-alumno', params:{alumno_id: alumno.cedula}}">
                <i class="fa fa-eye"></i>
                </router-link>
            </td>
            
          </tr>
     
        </tbody>
      </table>

        <!-- <li v-for="alumno in alumnos"
        v-bind:key="alumno.id" class="collection-item"> 
            <div class="chip">{{alumno.cedula}}</div>
            {{alumno.nombre}} 
            {{alumno.correo}}
            <router-link class="secondary-content"
            v-bind:to="{name:'vista-alumno', params:{alumno_id: alumno.cedula}}">
            <i class="fa fa-eye"></i>
            </router-link>
        </li> -->
        
        <!-- </ul> -->
            
        <div class="fixed-action-btn ">
            <router-link to='/new' class="btn-floating hoverable btn-large blue">
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
        
        db.ref('/contactos/').once('value').then(snapshot =>{
        snapshot.forEach( childSnapshot =>{
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            childData.forEach(estudiante =>{
                console.log(estudiante)
                const data = {
                    'id': childKey,
                    'cedula':estudiante.Cedula_estudiante,
                    'nombre': estudiante.Nombres_del_Estudiante,
                    'correo': estudiante.Correo,
                    'fecha_fin':estudiante.Fecha_fin

                }
                this.alumnos.push(data)
            }
            );
           
            // ...
        });
        })
        // db.ref('/contactos/').once('value').then(snapshot => {
        // var username = (snapshot.val())
        // console.log(username)
        // const data = {
        //             'id': snapshot.id,
        //             // 'employee_id': doc.data().employee_id,
        //             // 'name': doc.data().name,
        //             // 'dept': doc.data().dept,
        //             // 'position': doc.data().position
        //         }
        // this.alumnos.push(data)
        // });
    
        // db.collection('contactos').orderBy('Apellido_estudiante').get().then(querySnapshot =>{
        //     querySnapshot.forEach(doc =>{
        //         console.log(doc.data())
        //         const data = {
        //             'id': doc.id,
        //             // 'employee_id': doc.data().employee_id,
        //             // 'name': doc.data().name,
        //             // 'dept': doc.data().dept,
        //             // 'position': doc.data().position
        //         }
        //         this.alumnos.push(data)
        //     })
        // })
    }
}

</script>