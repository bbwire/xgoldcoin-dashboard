<template>
  <div>
      
      <v-card-title>  
          <v-btn color="accent" depressed @click="dialog = true">Withdraw Bitcoins</v-btn>    
          <v-spacer></v-spacer>
          <!-- <el-input placeholder="Please search" prefix-icon="el-icon-search" v-model="search"></el-input> -->
          <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              outlined
              color="accent"
          ></v-text-field>
      </v-card-title>
      <v-card-text>

        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="users"
          :single-select="singleSelect"
          :search="search"
          item-key="id"
          show-select
          class="elevation-0"
          :loading="isLoading"
          loading-text="Loading data..."
        >

          <template v-slot:item.action="{ item }">
            <!-- <v-icon small class="mr-2" @click="editItem(item)" >
              mdi-pencil
            </v-icon> -->
            <v-icon small @click="deleteItem(item)" >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
          
      </v-card-text>
      <snack-bar v-if="successMessage" :color="'success'" :text="successMessage"></snack-bar>
      <snack-bar v-if="errorMessage" :color="'error'" :text="errorMessage"></snack-bar>
    

    <v-dialog v-model="dialog" max-width="500px" persistent scrollable>
      <v-card>
        <v-card-title class="accent--text">
          <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="close" class="accent--text">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div class="space-20"></div>
          <v-form ref="form" lazy-validation>
              <v-text-field 
                v-model="form_data.amount" 
                :rules="[rules.required]" 
                label="Amount (USD)" 
                outlined clearable
                @change="calculateAmount(form_data.amount)"
              ></v-text-field>

              <v-text-field 
                v-model="coin_data.bitcoin.usd" 
                readonly :rules="[rules.required]" 
                label="Bitcoin price" 
                outlined 
              ></v-text-field>
              
              <v-text-field 
                v-model="form_data.btc_amount" 
                readonly :rules="[rules.required]" 
                label="Bitcoin Amount" 
                placeholder="Bitcoin Amount" 
                outlined 
              ></v-text-field>

              <v-text-field 
                v-model="form_data.balance" 
                readonly :rules="[rules.required]" 
                label="Available balance" 
                outlined 
              ></v-text-field>

              <v-text-field 
                v-model="form_data.charge" 
                readonly :rules="[rules.required]" 
                label="Withdraw charge" 
                outlined 
              ></v-text-field>
              
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-4">
          <v-btn color="error darken-1" depressed dark @click.native="close">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" depressed dark @click.native="checkAction(form_data.id)">Deposit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  /* eslint-disable no-console */
  import { mapActions, mapState } from 'vuex'
  import SnackBar from '@/components/commons/SnackBar.vue'
  export default {
    components: {
      SnackBar,
    },
    data () {
      return {
        dialog: false,
        start_modal: false,
        e1: true,
        show1: false,
        singleSelect: false,
        id: 0,
        search: '',
        pagination: {},
        selected: [],
        tab: null,
        uid: null,
        headers: [
          { text: '#', sortable: true, value: 'index' },
          { text: 'Amount(USD)', sortable: true, value: 'amount' },
          { text: 'Amount(BTC)', sortable: true, value: 'btc_amount' },
          { text: 'Time ago', sortable: true, value: 'created_at' },
          { text: 'Action', value: 'action', sortable: false }
        ],
        editedIndex: -1,
        form_data: {
          id: 0,
          amount: '',
          btc_price: '',
          btc_amount: ''
        },
        default_data: {
          id: 0,
          amount: '',
          btc_price: '',
          btc_amount: ''
        }
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login/')
      }
    },
    created () {
    //   this.$store.dispatch('getCountries')
    },
    computed: {
      back () {
        return this.$router.go(-1)
      },
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
      page () {
        return this.$route.params['page'] ? this.$route.params['page'] : 1
      },
      formTitle () {
        return this.editedIndex === -1 ? 'Withdraw Bitcoins' : 'Edit deposit'
      },
      ...mapState([
        'isLoading',
        'errorMessage',
        'successMessage',
        'rules',
        'rowsPerpage',
        'user',
        'coin_data',
      ])
    },
    methods: {
      close () {
        this.dialog = false
        setTimeout(() => {
          this.form_data = Object.assign({}, this.default_data)
          this.editedIndex = -1
        }, 300)
      },
      reset () {
        this.form_data = Object.assign({}, this.default_data)
      },
      ...mapActions([
        // 'getRates'
      ]),
      calculateAmount (amount) {
        let result = amount / this.coin_data.bitcoin.usd
        this.form_data.btc_amount = result
      },
      addMember () {
        if (this.$refs.form.validate()) {
          this.form_data.leader_id = this.user.id
          this.$store.dispatch('addClient', this.form_data)
          
        }
      },
    },
    mounted: function () {
      // this.getDevices()
    },
    name: 'XgoldDeposit'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
