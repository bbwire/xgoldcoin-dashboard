<template>
  <div >
    <v-container fluid class="back-cover" grid-list-md>
          <home-summary-cards></home-summary-cards>
    </v-container>

    <div class="space-top-20-neg"></div>
    <v-container fluid class="back-cover" grid-list-md>
      <v-layout row wrap >
        <v-flex md6>
          <v-layout wrap>
            <v-flex md12>

              <v-card >
                <v-card-title color="white" class="accent--text" >
                  <label class="title">Current projects</label>
                  <v-spacer></v-spacer>
                  <v-btn depressed color="accent" to="/projects" >
                    View all
                  </v-btn>
                  <v-btn icon small>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <recent-clients></recent-clients>
                </v-card-text>
              </v-card>

            </v-flex>
            
            <!-- <v-flex md12>
              <v-date-picker
                v-model="date"
                full-width
                landscape
              ></v-date-picker>
            </v-flex> -->

          </v-layout>
        </v-flex>
        <v-flex md6>
          <v-layout wrap>

            <v-flex sm12>
              <v-card>
                <v-card-title color="white" class="accent--text">
                  <label class="title">Closed projects</label>
                  <v-spacer></v-spacer>
                  <v-btn depressed color="accent" to="/projects" >
                    View all
                  </v-btn>
                  <v-btn icon small>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider> 
                <v-card-text>
                  <RecentCandidates />
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HomeSummaryCards from '../commons/HomeSummaryCards'
import RecentClients from '../dashboard/RecentClients'
import RecentCandidates from '../dashboard/RecentCandidates'
export default {
  name: 'MainDashboad',
  components: {
    HomeSummaryCards,
    RecentClients,
    RecentCandidates
  },
  data () {
    return {
      date: new Date().toISOString().substr(0, 10),
      chart_data: {'2019-06-01': 2, '2019-06-02': 7, '2019-06-03': 10, '2019-06-04': 8, '2019-06-05': 4, '2019-06-06': 12, '2019-06-07': 8},
      data: [
        {name: 'Successful Validations', },
        {name: 'Failed Validations', data: {'2019-03-01': 4, '2019-03-02': 3, '2019-03-03': 5, '2019-03-04': 9, '2019-03-05': 2, '2019-03-06': 5, '2019-03-07': 10}}
      ]
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
