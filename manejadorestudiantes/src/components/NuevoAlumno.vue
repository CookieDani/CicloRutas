<template>
    <div id='nuevo-alumno'  style="font-family:'Lora';"> 
        <h3>Nuevo alumno</h3>
        <div class="row" >
            <form @submit.prevent="guardarAlumno" class="col s12">
                <div class="row">
                <div class="input-field col s12">
                    <input type="number" v-model="alumno_id" required>
                    
                    <label class="active" >Cédula</label>
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="nombres" required>
                    <label class="active" >Nombres estudiante</label>
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <input type="email" class="validate" v-model="correo" required>
                    <label class="active" >Correo</label>
                  
                </div>
            </div>
             <div class="row">
                <div class="input-field col s12">
                    <!-- <input type="text" v-model="numero_contacto" required> -->
                    <i class="material-icons prefix">phone</i>
                    <input id="icon_telephone" type="number" class="validate" required v-model="numero_contacto">
                    <label class="active" >Número contacto</label>
                </div>
            </div>
            <!-- <div class="row">
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
            </div> -->
            <div class="row">
                <div class="input-field col s12">
                    <select v-model="numero_dias" class="browser-default" @change="onChange($event)">
                      <option selected value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    <label class="active">Días a la semana</label>
                </div>
            </div>
            <div class="row">
                  <div class="input-field col s12">
                      
                    <select v-model="horario1" class="browser-default" >
                      <option disabled value="">Seleccione un horario</option>
                        <option v-for="profesor in profesores" v-bind:key="profesor.id_intructor" v-bind:value="profesor.value" >
                                {{ profesor.value }} 
                        </option>
                    </select>
                  
                    <label class="active">Horario 1</label>
                </div>
            </div>
        
            <div class="row">
                  <div id="horario2" class="input-field col s12 hide">
                      
                    <select  v-model="horario2" class="browser-default " @change="change2($evento)" >
                      <option disabled value="">Seleccione un horario</option>
                        <option v-for="profesor in profesores" v-bind:key="profesor.id_intructor" v-bind:value="profesor.value" >
                                {{ profesor.value }} 
                        </option>
                    </select>
                  
                    <label class="active">Horario 2</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="nombres_tutor" required>
                    <label class="active" >Nombre tutor</label>
                </div>
            </div>
           
            <div class="row">
                <div class="input-field col s12 ">
                    <input type="checkbox" id="pagado" v-model="pagado" >
                    <label class='black-text' for="pagado">{{ pagado }}</label>
                    <label class="active">Pagado</label>
                </div>
            </div>
           <br>
            <router-link to='/'  style="font-family:'Permanent Marker';" class="btn black">Atras</router-link>
            <button type="submit"   style="font-family:'Permanent Marker';" class="btn">Guardar</button>
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
            nombres:null,
            nombres_tutor:null,
            numero_contacto:null,
            numero_dias:null,
            pagado:false,
            profesores: null,
            opciones:[{'id_instructor':'Juan 123',
            'value':'Juan 123'}]
            
        }
    },
    beforeRouteEnter(to, from, next){
         db.ref('/instructores/').once('value').then(snapshot =>{
          next(vm => {    
            let auxiliar =[]
            let contador = 0
            snapshot.forEach( childSnapshot =>{
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log(childData)
            
                    
                    childData.Horarios.forEach( valor =>{
                    
                    const data = {
                        'id_intructor': childData.Nombres_instructor+': '+valor + (++contador),
                        'value': childData.Nombres_instructor+': '+valor 
                    }
                    console.log(data)
                    auxiliar.push(data)
                })
            })
            
            vm.profesores = auxiliar
            
        });
        })
    },
    methods:{
        pad(num, size) {
            var s = "000000000" + num;
            return s.substr(s.length-size);
        },
        guardarAlumno(){
            if(this.pagado){
                let h1 = new Date()
                let h2 = new Date();
                h2.setMonth( h2.getMonth() + 1 );
                
                this.horario1 = this.pad(h1.getDate(),2) + "/" + this.pad((h1.getMonth() + 1),2) + "/" +  h1.getFullYear()
                // console.log(this.horario1)
                this.horario2 = this.pad(h2.getDate(),2) + "/" + this.pad((h2.getMonth() + 1),2) + "/" +  h2.getFullYear()
                // console.log(this.horario2)
            }else{

            }
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
        },
        onChange(event) {
            console.log(event.target.value)
            console.log(this.numero_dias)

            var elemento = document.getElementById("horario2");
            if(event.target.value == 1){
                elemento.classList.add('hide');
            }else{
                elemento.classList.remove('hide');
            }
            
        },change2(evento){
            if(this.numero_dias ==2){

            }
        }
    },fetchData(){
            db.ref('/contactos/' + to.params.alumno_id).once('value').then( snapshot => {
                var estudiante = snapshot.val();
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
            
            })
            

        }
}
</script>