<template>
  <v-container fluid class="back-cover">
   <v-card flat class="elevation-1">
    <v-toolbar
      color="white"
      light
      flat
      class="elevation-1"
    >
      <v-btn icon >
          <v-icon >person</v-icon>
        </v-btn>

      <v-toolbar-title>Profile</v-toolbar-title>

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

          <v-tab key="company">
            Company info
          </v-tab>

          <v-tab key="contact">
            Contact info
          </v-tab>

          <v-tab key="account">
            Account
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        key="company"
      >
        <v-card flat>
          <v-card-text>
            <CompanyInfo />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item
        key="contact"
      >
        <v-card flat>
          <v-card-text >
            <ContactInfo />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item
        key="account"
      >
        <v-card flat>
          <v-card-text >
            <AccountInfo />
          </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs-items>
  </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CompanyInfo from './components/CompanyInfo'
import ContactInfo from './components/ContactInfo'
import AccountInfo from './components/AccountInfo'
export default {
    components: {
        CompanyInfo,
        ContactInfo,
        AccountInfo
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