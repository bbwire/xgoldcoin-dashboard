<template>
  <v-container fluid class="back-cover">
    <v-card flat>
      <v-toolbar
        prominent
        class="elevation-0 accent--text"
        color="white"
        light
      >
        <v-btn icon @click.native="back" >
          <v-icon color="accent">arrow_left</v-icon>
        </v-btn>

        <v-toolbar-title>
          Loan Schedule
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- <v-btn color="error" @click.native="dialog = false" v-if="selected.length">
          <v-icon>delete</v-icon> Delete selected
        </v-btn> -->

        <v-btn icon>
          <v-icon color="accent">more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-title>       
          <v-spacer></v-spacer>
          <!-- <el-input placeholder="Please search" prefix-icon="el-icon-search" v-model="search"></el-input> -->
          <!-- <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              placeholder="Search"
              single-line
              color="accent"
          ></v-text-field> -->
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="loan_schedule"
          item-key="id"
          :search="search"
          class="elevation-0"
          :loading="isLoading"
          :rows-per-page-items="rowsPerpage"
        >
          <template v-slot:items="props">
            <td>{{ props.index+1 }}</td>
            <td>{{ props.item.payment }}</td>
            <td>{{ props.item.interest }}</td>
            <td>{{ props.item.principal }}</td>
            <td>{{ props.item.balance }}</td>
            <!-- <td >
              <v-btn icon small @click.native="editItem(props.item)">
                <v-icon small color="success"> edit </v-icon>
              </v-btn>
              <v-btn icon small @click.native="deleteItem(props.item.id)">
                <v-icon small color="error"> delete </v-icon>
              </v-btn>
            </td> -->
          </template>
        </v-data-table>

      </v-card-text>
      <snack-bar v-if="successMessage" :color="'success'" :text="successMessage"></snack-bar>
      <snack-bar v-if="errorMessage" :color="'error'" :text="errorMessage"></snack-bar>
    </v-card>

  </v-container>
</template>

<script>
  /* eslint-disable no-console */
  import { mapActions, mapState } from 'vuex'
  import SnackBar from '@/components/commons/SnackBar.vue'
  export default {
    components: {
      SnackBar
    },
    data () {
      return {
        dialog: false,
        show1: false,
        menu: false,
        id: 0,
        search: '',
        pagination: {},
        selected: [],
        tab: null,
        uid: null,
        headers: [
          { text: 'Installment', sortable: true, value: 'index' },
          { text: 'Payment', sortable: true, value: 'client.name' },
          { text: 'Interest', sortable: true, value: 'client.email' },
          { text: 'Principal', sortable: true, value: 'client.phone' },
          { text: 'Balance', sortable: true, value: 'principal' },
        ],
      }
    },
    // beforeCreate: function () {
    //   if (!this.$session.exists()) {
    //     this.$router.push('/logout/')
    //   }
    // },
    created () {
      this.$store.dispatch('getLoanSchedule', this.$route.params.id)
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
        return this.editedIndex === -1 ? 'New loan application' : 'Edit loan application'
      },
      ...mapState([
        'isLoading',
        'errorMessage',
        'successMessage',
        'rules',
        'clients',
        'loan_schedule',
        'roles',
        'rowsPerpage',
        'user',
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
      ...mapActions([
        // 'getRates'
      ]),
    },
    mounted: function () {
      // this.getDevices()
    },
    name: 'LoanSchedule'
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
