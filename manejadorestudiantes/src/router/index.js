import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NuevoAlumno from '@/components/NuevoAlumno'
import VistaAlumno from '@/components/VistaAlumno'
import EditarAlumno from '@/components/EditarAlumno'
import Dashboard_Profesor from '@/components/DashboardProfesor'
import Login from '@/components/Login'
import firebase from "firebase"
Vue.use(Router)

let router =  new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profesores/',
      name: 'dashboard_profesor',
      component: Dashboard_Profesor,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'nuevo-alumno',
      component: NuevoAlumno,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:alumno_id',
      name: 'editar-alumno',
      component: EditarAlumno,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:alumno_id',
      name: 'vista-alumno',
      component: VistaAlumno,
      meta: {
        requiresAuth: true
      }
    },,{
      path: '/profesores/new',
      name: 'nuevo-profesor',
      component: NuevoAlumno,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profesores/edit/:profesor_id',
      name: 'editar-profesor',
      component: EditarAlumno,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profesores/:profesor_id',
      name: 'vista-profesor',
      component: VistaAlumno,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// Nav Guards

router.beforeEach((to,from,next)=> {
  // 
  if(to.matched.some(record => record.meta.requiresAuth)){
    // Chequea si no esta logueado
    if(!firebase.auth().currentUser){

      // Ir a login
      next({
        path:'/login',
        query:{
          redirect:to.fullPath
        }
      });
    } else {
      // ir a la ruta buscada
      next();
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)){
    // Chequea si esta logueado
    if(firebase.auth().currentUser){

      // Ir a login
      next({
        path:'/',
        query:{
          redirect:to.fullPath
        }
      });
    } else {
      // ir a la ruta buscada
      next();
    }
  }else{
    // ir a la ruta buscada
    next()
  }
});

export default router;