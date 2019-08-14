<template>
    <div>
      
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Brian Bwire</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
      
      <!-- <v-subheader>Menu</v-subheader>
      <v-divider></v-divider> -->
      <v-list shaped>
        <!-- For user with all privileges -->
        <main-menu></main-menu>
      </v-list>
      <v-subheader>Extras</v-subheader>
      <v-divider></v-divider>

      <v-list>
        <v-list-item
          to="/user/profile/"
        >
          <v-list-item-icon>
            <v-icon >mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
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
