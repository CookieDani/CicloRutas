<template>
    <div id='nuevo-alumno'> 
        <h3>Nuevo alumno</h3>
        <div class="row">
            <form @submit.prevent="guardarAlumno" class="col s12">
                <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="alumno_id" required>
                    
                    <label >Cédula</label>
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="nombres" required>
                    <label >Nombres estudiante</label>
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <input type="email" class="validate" v-model="correo" required>
                    <label >Correo</label>
                  
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <!-- <input type="text" v-model="numero_contacto" required> -->
                    <i class="material-icons prefix">phone</i>
                    <input id="icon_telephone" type="tel" class="validate" required v-model="numero_contacto">
                    <label >Número contacto</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="fecha_inicio" required>
                    <label >Fecha inicio</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="fecha_fin" required>
                    <label >Fecha fin</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="horario1" required>
                    <label >Horario 1</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="horario2" required>
                    <label>Horario 2</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="nombres_tutor" required>
                    <label >Nombre tutor</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="numero_dias" required>
                    <label>Dias a la semana</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="checkbox" id="pagado" v-model="pagado" required >
                    <label class='black-text' for="pagado">{{ pagado }}</label>
                    <label class="active">Pagado</label>
                </div>
            </div>
           <br>
            <router-link to='/' class="btn grey">Atras</router-link>
            <button type="submit" class="btn">Editar</button>
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
            pagado:false
        }
    },
    methods:{
        guardarAlumno(){
            db.ref('/contactos/'+this.alumno_id).set({
                Cedula_estudiante : this.alumno_id,
                Correo: this.correo,
                Fecha_fin : this.fecha_fin,
                Fecha_inicio : this.fecha_inicio,
                Horario1 : this.horario1,
                Horario2: this.horario2,
                Nombres_del_Estudiante: this.nombres,
                Nombres_del_Tutor: this.nombres_tutor,
                Numero_de_contacto: this.numero_contacto,
                Numero_de_dias: this.numero_dias,
                Pagado: this.pagado 
            })
            // db.collection('employees').add({
            //     employee_id:this.alumno_id,
            //     name: this.name,
            //     dept: this.dept,
            //     position: this.position
            // }).then(docRef => this.$router.push('/'))
            // .catch(error => console.log(error))
        }
    }
}
</script>