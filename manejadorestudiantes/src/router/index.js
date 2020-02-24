import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NuevoAlumno from '@/components/NuevoAlumno'
import VistaAlumno from '@/components/VistaAlumno'
import EditarAlumno from '@/components/EditarAlumno'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'nuevo-alumno',
      component: NuevoAlumno
    },
    {
      path: '/edit/:alumno_id',
      name: 'editar-alumno',
      component: EditarAlumno
    },
    {
      path: '/:alumno_id',
      name: 'vista-alumno',
      component: VistaAlumno
    }
  ]
})
