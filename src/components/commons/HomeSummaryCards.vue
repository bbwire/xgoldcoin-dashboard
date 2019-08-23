<template>
  <div>
    <v-layout row wrap class="summary-cards">
      <v-flex xs12>
        <v-card ripple class="bright-blue-gradient" to="/clients/" dark color="indigo">
          <v-card-text primary-title center class="uppercase">
            <p class="headline">{{clients.length}}</p>
            <p>
              <v-icon >mdi-menu</v-icon> 
              Clients
            </p>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="secondary--text green-gradient" to="/candidates/" ripple dark >
          <v-card-text center class="uppercase">
            <p class="headline">{{candidates.length}}</p>
            <p>
              <v-icon >mdi-contacts</v-icon> 
              Candidates
            </p>
          </v-card-text>
        </v-card>
      </v-flex> 

      <v-flex xs12>
        <v-card dark class="blue-green-gradient" to="/users/" ripple color="secondary">
          <v-card-text center class="uppercase">
            <p class="headline">{{users.length}}</p>
            <p>
              <v-icon >mdi-account-multiple</v-icon> 
              Users
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
      
    </v-layout>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeSummaryCards',
  created () {
    //
  },
  computed: {
    ...mapState([
      'applications',
      'users',
      'projects',
      'candidates',
      'clients'
    ])
  }
}
</script>

<style>
  .summary-cards p {
    font-weight: bold;
    font-size: 16px;
  }

  /* .summary-cards
   .v-card {
    border-top: 5px solid !important;
    padding-bottom: 0px;
  } */

  .summary-cards .v-card__text {
    padding: 10px;
  }

  .green-gradient {
    background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  }

  .grey-gradient {
    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  .brown-gradient {
    background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
  }

  .blue-green-gradient {
    background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%);
  }

  .light-purple-gradient {
    background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  }

  .pale-green-gradient {
    background-image: linear-gradient(to top, #96fbc4 0%, #f9f586 100%);
  }

  .bright-blue-gradient {
    background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
  }
</style>
