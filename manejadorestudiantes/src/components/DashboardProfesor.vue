<template>
    <div id='dashboard'> 
        <div class="container" style="font-family:'Lora';">
             <h4 class="center" style="font-family:'Permanent Marker';">Profesores</h4>
        <div class="row">
            <div class="col s12">
            <div class="row">
                <div class="input-field col s12">
                <i class="material-icons prefix">search</i>
                <input type="text" id="busqueda" class="autocomplete" @keyup="busqueda">
                <label for="busqueda" >Buscar profesor</label>
                </div>
            </div>
            </div>
        </div>
        </div>

        <table id="profesores" style="font-family:'Lora';" class="responsive-table centered">
        <thead >
          <tr>
              <th>Cedula</th>
              <th>Nombres</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Horarios</th>
          </tr>
        </thead>

        <tbody>
          <tr  v-for="profesor in profesores"  v-bind:key="profesor.id">
            <td>
                <router-link v-bind:to="{name:'vista-profesor', params:{profesor_id: profesor.id}}">
                 <div class="chip hide-on-med-and-down">{{profesor.cedula}}</div> 
                 <div class="show-on-medium-and-down hide-on-med-and-up">{{profesor.cedula}}</div> 
                 </router-link>
            </td>
            <td> {{profesor.nombre}} </td>
            <td>{{profesor.correo}}</td>
            <td>{{profesor.telefono}} </td>
            <td><div v-for="horario in profesor.horarios" v-bind:key="horario">
                    {{horario}}
                    
                  </div>
               
            </td>
<!--             
             <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Ver Horarios</a>
                <ul id='dropdown1' class='dropdown-content'>
                <li v-for="horario in profesor.horarios" v-bind:key="horario">
                    {{horario}}
                </li>
                
                </ul> -->
                  
            
          </tr>
     
        </tbody>
      </table>

         
            
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
    name: 'dashboard_profesor',
    data (){
        return{
            profesores:[]
        }
    },ready(){
         $('.dropdown-trigger').dropdown();
    },
    created (){
        
        db.ref('/instructores/').once('value').then(snapshot =>{
        snapshot.forEach( childSnapshot =>{
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
           
            const data = {
                'id': childKey,
                'cedula':childKey,
                'nombre': childData.Nombres_instructor,
                'correo': childData.Correo,
                'telefono': childData.Telefono,
                'horarios': childData.Horarios
            }
            this.profesores.push(data)
           
           
            // ...
        });
        })
        $('.dropdown-trigger').dropdown();
    },
    methods :{
        busqueda(){
       
            let input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("busqueda");
            filter = input.value.toUpperCase();
            table = document.getElementById("profesores");
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

            for (let i = 0; i < table.rows[0].cells.length; i++) {
                console.log(table.rows[0].cells[i])
                if(i>0){
                    csv += ';'
                }
                csv += table.rows[0].cells[i].textContent;
            }
            tr = table.getElementsByTagName("tr");
            for (let i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td");
                
                for (let j = 0; j < td.length; j++) {
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