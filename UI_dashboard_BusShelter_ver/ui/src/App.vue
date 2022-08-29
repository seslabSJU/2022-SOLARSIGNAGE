<template>
  <div id="app">
    <header><Navbar/></header>
      
    
    
    <auth-layout v-if="isAuth"></auth-layout>
    
      <div class="admin-container" v-else>
        
        
        <!--<Sidebar :navItems="nav" v-if='this.$route.name !== "choosingDevicePage"'/> -->
    
        <div id="right-panel" class="right-panel">
          
          <div class="content pb-0">
              <transition enter-active-class="animated fadeIn">
                <router-view></router-view>
              </transition>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Navbar from './views/components/Navbar';

import nav from './nav'
//import Header from './components/Header.vue'
//import Sidebar from './components/Sidebar.vue'
import AuthLayout from './layouts/AuthLayout.vue';

export default {
  name:'app',
  data () {
    return {
      nav: nav.items,
      showNavigation:false
    }
  },

  watch: {
        
        onDashboardDisplayed(value){
          this.showNavigation = value
        }
  },

  components: {
    AuthLayout,
    Navbar
    //AuthLayout,
    //Header,-
    //Sidebar
  },
  computed: {
    name(){
       return this.$route.name
    },
    list() {
      return this.$route.matched
    },
    isAuth () {
      return this.$route.path.match('auth')
    }
  },

  methods:{
    /* showRouterName: function(){
        console.log("Name of Routerrr =", this.$route.name)
     },*/

    /*changeNavigationValue: function(){
        this.showNavigation = true
    }*/

  },
  
  mounted: function(){
            //this.showRouterName()

  }


}
</script>

<style lang="scss">
@import url('./assets/css/font-awesome.min.css');
@import url('./assets/css/themify-icons.css');
@import url('./assets/css/pe-icon-7-filled.css');
@import url('./assets/css/flag-icon.min.css');
@import url('./assets/css/cs-skin-elastic.css');

@import "./assets/scss/style";
@import "./assets/scss/dropdown.scss";


button{
    cursor: pointer;
}

</style>
