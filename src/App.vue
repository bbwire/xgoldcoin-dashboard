<template>
  <v-app>
    <v-navigation-drawer
      dark
      width="250"
      permanent
      :clipped="false"
      app
      v-if="menu_display"
      class="blue-gradient-drawer"
    >
      <NavigationMenu />

      <!-- <template v-slot:append>
        <div class="pa-2">
          <v-btn block>Logout</v-btn>
        </div>
      </template> -->
    </v-navigation-drawer>
    <v-app-bar
      color="#efefef"
      class="elevation-0"
      light
      app
      v-if="menu_display"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Future Options Dashboard </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>people</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in menu_items"
            :key="item.name"
            @click="() => {}"
            :to="item.path"
          >
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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

export default {
  name: 'App',
  components: {
    // HelloWorld,
    NavigationMenu
  },
  data: () => ({
    uid: null,
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
      this.$store.dispatch('getClients')
      this.$store.dispatch('getCandidates')
      this.$store.dispatch('getUsers')
      this.$store.dispatch('getCountries')
      this.$store.dispatch('getCurrentUser', this.uid)
    } else {
      this.$store.dispatch('changeMenuDisplay', false)
    }
  },
  computed: {
    ...mapState([
      'isLoading',
      'menu_display',
      'user'
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
</style>
