<template>
    <div id='editar-alumno'> 
        <h3>Editar alumno</h3>
        <div class="row">
            <form @submit.prevent="actualizarAlumno" class="col s12">
                <div class="row">
                <div class="input-field col s12">
                    <input disabled type="text" v-model="alumno_id" required>
                    
                    <label class="active">Id alumno</label>
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="nombres" required>
                    <label class="active">Nombres estudiante</label>
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <input type="email" class="validate" v-model="correo" required>
                    <label class="active">Correo</label>
                  
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <!-- <input type="text" v-model="numero_contacto" required> -->
                    <i class="material-icons prefix">phone</i>
                    <input id="icon_telephone" type="tel" class="validate" required v-model="numero_contacto">
                    <label class="active">Número contacto</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="fecha_inicio" required>
                    <label class="active">Fecha inicio</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="fecha_fin" required>
                    <label class="active">Fecha fin</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="horario1" required>
                    <label class="active">Horario 1</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="horario2" required>
                    <label class="active">Horario 2</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="nombres_tutor" required>
                    <label class="active">Nombre tutor</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="numero_dias" required>
                    <label class="active">Dias a la semana</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="checkbox" id="pagado" v-model="pagado" required >
                    <label for="pagado">{{ pagado }}</label>
                    <label class="active">Pagado</label>
                </div>
            </div>
           <br>
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
                console.log('Entro aqui')
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
            })
            
        
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
        actualizarAlumno(){
            // db.collection('employees').where('employee_id','==',this.$route.params.alumno_id).get()
            // .then(querySnapshot =>{
            //     querySnapshot.forEach(doc =>{
            //         doc.ref.update({
            //             employee_id: this.alumno_id,
            //             name: this.name,
            //             dept: this.dept,
            //             position: this.position
            //         })
            //         .then( () =>{
            //             this.$router.push({name:'vista-alumno', params:{alumno_id:this.alumno_id}})
            //         })
            //     })
            // })
        }
    }
}
</script>