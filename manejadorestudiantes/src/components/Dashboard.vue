<template>
    <div id='dashboard'> 
       
        <!-- <ul class="collection with-header">
        <li class="collection-header center"><h4>Estudiantes</h4></li> -->
        <!-- <input id="dls_search_input" onkeyup="search_table()" type="text" /> -->
        <div class="container" style="font-family:'Lora';">
             <h4 class="center" style="font-family:'Permanent Marker';">Estudiantes</h4>
        <div class="row">
            <div class="col s12">
            <div class="row">
                <div class="input-field col s12">
                <i class="material-icons prefix">search</i>
                <input type="text" id="busqueda" class="autocomplete" @keyup="busqueda">
                <label for="busqueda" >Buscar estudiante</label>
                </div>
            </div>
            </div>
        </div>
        </div>

        <table id="estudiantes" style="font-family:'Lora';" class="responsive-table centered">
        <thead >
          <tr>
              <th>Cedula</th>
              <th>Nombres</th>
              <th>Correo</th>
              <th>Fecha fin</th>
              <th>Fecha Inicio</th>
              <th>Horario 1</th>
              <th>Horario 2</th>
              <th>Nombres tutor</th>
              <th>Numero contacto</th>
              <th>Numero dias</th>
              <th>Pagado</th>
              <th></th>
          </tr>
        </thead>

        <tbody>
          <tr  v-for="alumno in alumnos"  v-bind:key="alumno.id">
            <td> <div class="chip">{{alumno.cedula}}</div></td>
            <td> {{alumno.nombre}} </td>
            <td>{{alumno.correo}}</td>
            <td>{{alumno.fecha_fin}}</td>
            <td>{{alumno.fecha_inicio}} </td>
            <td>{{alumno.horario1}}</td>
            <td>{{alumno.horario2}}</td>
            <td>{{alumno.nombres_tutor}}</td>
            <td>{{alumno.numero_contacto}}</td>
            <td>{{alumno.numero_dias}}</td>
            <td> <i v-if=" alumno.pagado" class=" material-icons">check</i>
                 <i v-if="!alumno.pagado"  class="material-icons">close</i> </td>
            
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
            <button class="btn-floating hoverable btn-large black" v-on:click="descargaRespaldo"><i class="fa fa-cloud-upload"></i></button>
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
           
            var estudiante = childData[childData.length-1]
            console.log(estudiante)
            const data = {
                'id': childKey,
                'cedula':estudiante.Cedula_estudiante,
                'nombre': estudiante.Nombres_del_Estudiante,
                'correo': estudiante.Correo,
                'fecha_fin':estudiante.Fecha_fin,
                'fecha_inicio': estudiante.Fecha_inicio,
                'horario1' : estudiante.Horario1 ,
                'horario2' : estudiante.Horario2,
                'nombres_tutor' : estudiante.Nombres_del_Tutor,
                'numero_contacto' : estudiante.Numero_de_contacto,
                'numero_dias' : estudiante.Numero_de_dias,
                'pagado' : estudiante.Pagado 
            }
            this.alumnos.push(data)
           
           
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
    },
    methods :{
        busqueda(){
            console.log('hola')
            let input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("busqueda");
            filter = input.value.toUpperCase();
            table = document.getElementById("estudiantes");
            tr = table.getElementsByTagName("tr");
           // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td");
                let hayValor = false
                for (let j = 0; j < td.length; j++) {
                    const element = td[j];
                    
                    if (element) {
                        txtValue = element.textContent || element.innerText;
                        console.log(txtValue)
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            hayValor = true
                        } 
                    }
                    if(hayValor){
                        tr[i].style.display = "";
                    }else{
                        tr[i].style.display = "none";
                    }
                }
                
            }
            
        },
        descargaRespaldo() {
            let csv = "";
            let csvdata, table, tr, td, thead, txtValue;
            table = document.getElementById("estudiantes");

            for (let i = 0; i < table.rows[0].cells.length-1; i++) {
                console.log(table.rows[0].cells[i])
                if(i>0){
                    csv += ';'
                }
                csv += table.rows[0].cells[i].textContent;
            }
            tr = table.getElementsByTagName("tr");
            for (let i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td");
                
                for (let j = 0; j < td.length-1; j++) {
                    const element = td[j];
                    
                    if (element) {
                        txtValue = element.textContent || element.innerText;
                        if( j > 0 ){
                            csv += ';'
                        }
                        csv += txtValue
                        
                    }
                   
                }
                csv += '\n'
            }
            console.log(csv)
            // csvdata.forEach((row) => {
            //         csv += row.join(',');
            //         csv += "\n";
            // });
        
            let anchor = document.createElement('a');
            anchor.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            anchor.target = '_blank';
            anchor.download = 'respaldo.csv';
            anchor.click();

        }
    }
}

</script>