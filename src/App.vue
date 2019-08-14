<template>
  <v-app>
    <v-navigation-drawer
      dark
      width="250"
      permanent
      :clipped="false"
      app
      v-if="drawer"
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
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
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
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import NavigationMenu from './components/commons/NavigationMenu'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    NavigationMenu
  },
  data: () => ({
    drawer: true,
    items: [
      ['mdi-email', 'Inbox'],
      ['mdi-account-supervisor-circle', 'Supervisors'],
      ['mdi-clock-start', 'Clock-in'],
    ],
  }),
};
</script>

<style scoped>
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
</style>
