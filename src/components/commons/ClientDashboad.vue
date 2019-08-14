<template>
  <div >
    <v-container fluid class="back-cover" grid-list-md>
      <v-layout row wrap >
        <v-flex md7>
          <v-layout wrap>
            <v-flex md12>

              <v-card flat class="elevation-0">
                <v-card-title color="white" class="accent--text" >
                  <h3><v-icon color="accent">bar_chart</v-icon> Statistics</h3>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <column-chart xtitle="Days" ytitle="Transactions" :data="chart_data" :download="true"></column-chart>
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
        <v-flex md5>
          <v-layout wrap>

            <v-flex sm12>
              <v-card flat class=" elevation-0">
                <v-card-title color="white" class="accent--text">
                  <h3><v-icon color="accent">attach_money</v-icon> Credits</h3>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <!-- <pie-chart :data="surveyors_count" :download="true" :donut="true"></pie-chart> -->
                  <h3>Coming soon...</h3>
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
export default {
  name: 'MainDashboad',
  components: {
    HomeSummaryCards
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
