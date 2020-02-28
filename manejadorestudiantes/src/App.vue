<template>
  <div id="app">
    <Navbar :key ='$route.fullPath' />
    <div class="container">
      <router-view/>
    </div>
    <Footer />
    
  </div>
</template>

<script>
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import M from 'materialize-css'
export default {
  name: 'App',
  components:{
    Navbar,
    Footer
  },mounted () {
    M.AutoInit()
}
}

</script>


