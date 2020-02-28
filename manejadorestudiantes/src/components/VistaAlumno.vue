<template>
    <div id='vista-alumno' style="font-family:'Lora';" > 
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{nombres}}</h4></li>
            <li class="collection-item"><b>Cédula: </b>{{alumno_id}}</li>
            <li class="collection-item"><b>Correo</b> {{correo}}</li>
            <li class="collection-item"><b>Número contacto:</b> {{numero_contacto}}</li>
            <li class="collection-item"><b>Días a la semana:</b> {{numero_dias}}</li>
            <li v-if="pagado" class="collection-item"><b>Pagado:</b> <i v-if="pagado" class=" material-icons">check</i>
              <i v-if="!pagado"  class="material-icons">close</i> </li>
            <li class="collection-item"><b>Fecha fin:</b> {{fecha_fin}}</li>
            <li class="collection-item"><b>Fecha inicio:</b> {{fecha_inicio}}</li>
            <li class="collection-item"><b>Nombre tutor:</b> {{nombres_tutor}}</li>
            <li class="collection-item"><b>Horario 1:</b> {{horario1}}</li>
            <li class="collection-item"><b>Horario 2:</b> {{horario2}}</li>
        
        </ul>
        <router-link to='/' class='btn black' style="font-family:'Permanent Marker';" >Atras</router-link>
        <button @click="deleteAlumno" class='btn red' style="font-family:'Permanent Marker';" >Borrar</button>
         <div class="fixed-action-btn">
            <router-link v-bind:to="{name:'editar-alumno', params:{employee_id:alumno_id, }}" class="btn-floating btn-large blue">
            <i class="fa fa-pencil"></i>

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
            correo:null,
            fecha_fin:null,
            fecha_inicio:null,
            horario1:null,
            horario2:null,
            horario3:null,
            nombres:null,
            nombres_tutor:null,
            numero_contacto:null,
            numero_dias:null,
            pagado:null
        }
    },
    beforeRouteEnter(to, from, next){
        db.ref('/contactos/' + to.params.alumno_id).once('value').then( snapshot => {
            var childData = snapshot.val();
            childData.forEach(estudiante =>{
                console.log(estudiante)
                next( vm =>{
                    vm.alumno_id = estudiante.Cedula_estudiante,
                    vm.correo = estudiante.Correo,
                    vm.fecha_fin = estudiante.Fecha_fin,
                    vm.fecha_inicio =estudiante.Fecha_inicio,
                    vm.horario1 = estudiante.Horario1 ,
                    vm.horario2 = estudiante.Horario2,
                    vm.nombres = estudiante.Nombres_del_Estudiante,
                    vm.nombres_tutor = estudiante.Nombres_del_Tutor,
                    vm.numero_contacto = estudiante.Numero_de_contacto,
                    vm.numero_dias = estudiante.Numero_de_dias,
                    vm.pagado = estudiante.Pagado 
            })
            });
        });

        // db.collection('employees').where('employee_id',
        // '==', to.params.alumno_id
        // ).get()
        // .then(querySnapshot =>{
        //     querySnapshot.forEach(doc =>{
        //         next(vm =>{
        //             vm.alumno_id = doc.data().employee_id
        //             vm.name = doc.data().name
        //             vm.dept = doc.data().dept
        //             vm.position = doc.data().position
        //         })
        //     })
        // })
    },
    watch:{
        '$route':'fetchData'
    },
    methods: {
        fetchData(){
             db.ref('/contactos/' + to.params.alumno_id).once('value').then( snapshot => {
                var childData = snapshot.val();
                childData.forEach(estudiante =>{
                    this.alumno_id = estudiante.Cedula_estudiante,
                    this.correo = estudiante.Correo,
                    this.fecha_fin = estudiante.Fecha_fin,
                    this.fecha_inicio =estudiante.Fecha_inicio,
                    this.horario1 = estudiante.Horario1 ,
                    this.horario2 = estudiante.Horario2,
                    this.nombres = estudiante.Nombres_del_Estudiante,
                    this.nombres_tutor = estudiante.Nombres_del_Tutor,
                    this.numero_contacto = estudiante.Numero_de_contacto,
                    this.numero_dias = estudiante.Numero_de_dias,
                    this.pagado = estudiante.Pagado 
            
                });
                
            });
            // db.collection('employees').where('employee_id','==',this.$route.params.alumno_id).get()
            // .then(querySnapshot =>{
            //     querySnapshot.forEach(doc =>{
            //         this.alumno_id = doc.data().employee_id
            //         this.name = doc.data().name
            //         this.dept = doc.data().dept
            //         this.position = doc.data().position
            //     })
            // })
        },
        deleteAlumno(){
            if(confirm('Estas seguro?')){
                db.ref('/contactos/'+this.$route.params.alumno_id).remove()
                .then( snapshot =>{
                    this.$router.push('/')
                })
                // db.collection('employees').where('employee_id','==',this.$route.params.alumno_id).get()
                // .then(querySnapshot =>{
                // querySnapshot.forEach(doc =>{
                //     doc.ref.delete();
                //     this.$router.push('/')
                // })
                // })
            }
        }
    }
}
</script>