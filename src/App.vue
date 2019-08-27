<template>
  <v-app>
    <v-navigation-drawer
      light
      width="240"
      :clipped="true"
      app
      v-model="drawer"
      v-if="menu_display"
      :mini-variant="miniVariant"
    >
      <NavigationMenu />

      <!-- <template v-slot:append>
        <div class="pa-2">
          <v-btn block>Logout</v-btn>
        </div>
      </template> -->
    </v-navigation-drawer>
    <v-app-bar
      color="accent"
      class="elevation-0"
      dark
      app
      clipped-left
      short
      v-if="menu_display"
    >
      <v-app-bar-nav-icon @click="miniVariant = !miniVariant"></v-app-bar-nav-icon>

      <v-toolbar-title>Future Options </v-toolbar-title>

      <v-spacer></v-spacer>

      <ToolbarExtras />
    </v-app-bar>

    <v-content>
      <router-view></router-view>
      <vue-progress-bar v-if="isLoading"></vue-progress-bar>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import NavigationMenu from './components/commons/NavigationMenu'
import ToolbarExtras from './components/dashboard/ToolbarExtras'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    NavigationMenu,
    ToolbarExtras
  },
  data: () => ({
    uid: null,
    drawer: true,
    miniVariant: false,
    items: [
      ['mdi-email', 'Inbox'],
      ['mdi-account-supervisor-circle', 'Supervisors'],
      ['mdi-clock-start', 'Clock-in'],
    ],
    menu_items: [
      {
        name: 'Settings',
        path: '/settings'
      },
      {
        name: 'Profile',
        path: '/profile'
      },
      {
        name: 'Logout',
        path: '/logout/'
      }
    ]
  }),
  created () {
    if (this.$session.exists()) {
      this.uid = this.$session.get('uid')
      this.$store.dispatch('changeMenuDisplay', true)
      this.$store.dispatch('getCandidates')
      this.$store.dispatch('getCountries')
      this.$store.dispatch('getCities')
      this.$store.dispatch('getCurrentUser', this.uid)
    } else {
      this.$store.dispatch('changeMenuDisplay', false)
    }
  },
  computed: {
    ...mapState([
      'isLoading',
      'menu_display',
      'user',
      'clipped'
    ])
  }
};
</script>

<style>
  .blue-gradient-drawer {
    background-image: linear-gradient(-225deg, #CBBACC 0%, #2580B3 100%);
  }

  .light-gradient-app-bar {
    background: linear-gradient(to bottom, #D5DEE7 0%, #E8EBF2 50%, #E2E7ED 100%), linear-gradient(to bottom, rgba(0,0,0,0.02) 50%, rgba(255,255,255,0.02) 61%, rgba(0,0,0,0.02) 73%), linear-gradient(33deg, rgba(255,255,255,0.20) 0%, rgba(0,0,0,0.20) 100%);
 background-blend-mode: normal,color-burn;
  }

  .theme--light.v-application {
    background: #efefef;
  }

  .button-gradient {
    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  }

  .space-top-20 {
    margin-top: 20px;
  }

  .space-top-10 {
    margin-top: 10px !important;
  }

  .bold {
    font-weight: bold;
  }

  .back-cover {
    background: #efefef;
    height: 100%;
  }

  .text-center {
    text-align: center !important;
  }

  .login-background-gradient {
    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    background-image: url('http://umbrtech.com/futureoptions/assets/img/hrslider.jpg');
    height: 100%;
  }
</style>
