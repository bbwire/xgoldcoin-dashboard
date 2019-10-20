<template>
    <div>
      
        <v-list-item two-line>
          <v-list-item-avatar size="48">
            <img :src="user.photo">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{user.first_name}} {{user.last_name}}</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
      
      <!-- <v-subheader>Menu</v-subheader>
      <v-divider></v-divider> -->
      <v-list nav dense>
        <!-- For user with all privileges -->
        <main-menu></main-menu>
      </v-list>
      

    </div>
</template>

<script>
import { mapState } from 'vuex'
import MainMenu from './MainMenu'
// import ClientMenu from './ClientMenu'
export default {
  components: {
    MainMenu,
    // ClientMenu
  },
  data () {
    return {
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Loans'
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

<style>

</style>
