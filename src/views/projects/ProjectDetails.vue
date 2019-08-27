<template>
  <v-container fluid class="back-cover">
   <v-card flat class="elevation-1">
    <v-toolbar
      color="white"
      light
      flat
      class="elevation-1"
    >
      <v-btn icon @click.native="back" >
          <v-icon >arrow_back</v-icon>
        </v-btn>

      <v-toolbar-title>Project details</v-toolbar-title>

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
          <v-tabs-slider color="accent"></v-tabs-slider>

          <v-tab key="details">
            Edit project info
          </v-tab>

          <v-tab key="applications">
            Applications
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
            <ProjectInfo />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item
        key="applications"
      >
        <v-card flat>
          <v-card-text >
            <ProjectApplications />
          </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs-items>
  </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ProjectApplications from './components/ProjectApplications'
import ProjectInfo from './components/ProjectInfo'
export default {
    components: {
        ProjectApplications,
        ProjectInfo
    },
    data () {
      return {
        tab: null,
        id: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    created () {
      this.id = this.$route.params.id
      this.$store.dispatch('getSingleProject', this.id)
    },
    computed: {
      back () {
        return this.$router.go(-1)
      },
      ...mapState([
        'single_project'
      ])
    },
    name: 'project-details'
}
</script>

<style scoped>

</style>