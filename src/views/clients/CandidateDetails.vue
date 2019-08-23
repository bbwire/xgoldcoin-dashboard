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

      <v-toolbar-title>{{single_candidate.first_name}} {{single_candidate.last_name}}</v-toolbar-title>

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
            Candidate information
          </v-tab>

          <v-tab key="applications">
            Candidate applications
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
            <CandidateInfo />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item
        key="applications"
      >
        <v-card flat>
          <v-card-text >
            <ClientApplications />
          </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs-items>
  </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ClientApplications from '../candidates/CandidateApplications'
import CandidateInfo from '../../components/candidates/CandidateInfo'
export default {
    components: {
        ClientApplications,
        CandidateInfo
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
      this.$store.dispatch('getSingleCandidate', this.id)
    },
    computed: {
      back () {
        return this.$router.go(-1)
      },
      ...mapState([
        'single_candidate'
      ])
    }
}
</script>

<style scoped>

</style>