<template>
  <v-container fluid class="back-cover">
   <v-card flat class="elevation-1">
    <v-toolbar
      color="accent"
      dark
      flat
      class="elevation-0"
    >
      <v-btn icon @click.native="back" >
          <v-icon >arrow_back</v-icon>
        </v-btn>

      <v-toolbar-title>{{single_client.name}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn> -->

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
          background-color="transparent"
        >
          <v-tabs-slider color="secondary"></v-tabs-slider>

          <v-tab key="details">
            Client Details
          </v-tab>

          <v-tab key="projects">
            Client Projects
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        key="details"
      >
        <v-card flat>
          <v-card-text>
            <ClientInfo />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item
        key="projects"
      >
        <v-card flat>
          <v-card-text >
            <ClientProjects />
          </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs-items>
  </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ClientProjects from './ClientProjects'
import ClientInfo from '../../components/clients/ClientInfo'
export default {
  components: {
    ClientProjects,
    ClientInfo
  },
  data () {
    return {
      tab: null,
      id: null,
      items: [
        'web', 'shopping', 'videos', 'images', 'news',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  created () {
    this.id = this.$route.params.id
    this.$store.dispatch('getSingleClient', this.id)
  },
  computed: {
    back () {
      return this.$router.go(-1)
    },
    ...mapState([
      'single_client'
    ])
  }
}
</script>

<style scoped>

</style>