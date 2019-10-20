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
                  <label class="title">Crypto currency prices</label>
                  
                  <v-spacer></v-spacer>
                  <v-btn icon small>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                  
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <span v-if="coin_data.bitcoin">
                    <span class="headline font-weight-black d-block mb-5">BTC ${{coin_data.bitcoin.usd}}</span>
                    <span class="headline font-weight-black d-block">XGOLD ${{coin_data.xgoldcoin.usd}}</span>
                  </span>
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
                  <label class="title">Calendar</label>
                  <v-spacer></v-spacer>
                  <v-btn icon small>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider> 
                <v-card-text>
                  <v-calendar></v-calendar>
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
// import RecentClients from '../dashboard/RecentClients'
// import RecentCandidates from '../dashboard/RecentCandidates'
// import axios from 'axios'
export default {
  name: 'MainDashboad',
  components: {
    HomeSummaryCards,
    // RecentClients,
    // RecentCandidates
  },
  data () {
    return {
      date: new Date().toISOString().substr(0, 10),
      chart_data: {'2019-06-01': 2, '2019-06-02': 7, '2019-06-03': 10, '2019-06-04': 8, '2019-06-05': 4, '2019-06-06': 12, '2019-06-07': 8},
      data: [
        {name: 'Successful Validations', },
        {name: 'Failed Validations', data: {'2019-03-01': 4, '2019-03-02': 3, '2019-03-03': 5, '2019-03-04': 9, '2019-03-05': 2, '2019-03-06': 5, '2019-03-07': 10}}
      ],
    }
  },
  created () {
    this.$store.dispatch('getCoinPrices')
  },
  computed: {
    ...mapState([
      'user',
      'coin_data'
    ])
  },
  mounted () {
    // axios.get('https://api.coingecko.com/api/v3/simple/price?ids=xgoldcoin%2Cbitcoin&vs_currencies=usd')
    //   .then(response => {
    //     this.coin_data = response.data
    //   }).catch(error => {
    //     // eslint-disable-next-line
    //     console.log(error)
    //   })
  }
}
</script>

<style>

</style>
