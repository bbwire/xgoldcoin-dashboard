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
          <v-icon >apps</v-icon>
        </v-btn>

      <v-toolbar-title>Bitcoin Transactions</v-toolbar-title>

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

          <v-tab key="deposit">
            Deposit
          </v-tab>

          <v-tab key="withdraw">
            Withdraw
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        key="deposit"
      >
        <v-card flat>
          <v-card-text>
            <BitcoinDeposits />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item
        key="withdraw"
      >
        <v-card flat>
          <v-card-text >
            <BitcoinWithdraw />
          </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs-items>
  </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import BitcoinDeposits from '../components/BitcoinDeposits'
import BitcoinWithdraw from '../components/BitcoinWithdraw'
export default {
    components: {
        BitcoinDeposits,
        BitcoinWithdraw
    },
    data () {
      return {
        tab: null,
        id: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    created () {
      this.$store.dispatch('getCoinPrices')
    },
    computed: {
      back () {
        return this.$router.go(-1)
      },
      ...mapState([
        'coin_data'
      ])
    },
    name: 'bitcoin-transactions'
}
</script>

<style scoped>

</style>