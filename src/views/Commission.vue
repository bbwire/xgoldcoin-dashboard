<template>
  <v-container fluid class="back-cover" grid-list-md>
    <v-card>
      <v-toolbar
        class="elevation-0 accent--text"
        light
      >
        <v-btn icon >
          <v-icon color="accent">menu</v-icon>
        </v-btn>

        <v-toolbar-title>
          Indirect Commission
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <template v-if="$vuetify.breakpoint.smAndUp">

          <!-- <v-btn color="accent" depressed @click.native="addMember">
            <v-icon>mdi-check</v-icon> Add member
          </v-btn> -->

          

          <v-btn icon>
            <v-icon color="accent">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-title>       
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
          :items-per-page="15"
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
    </v-card>

  </v-container>
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
          { text: 'Amount', sortable: true, value: 'amount' },
          { text: 'Time ago', sortable: true, value: 'created_at' },
          { text: 'Action', value: 'action', sortable: false }
        ],
        editedIndex: -1,
        form_data: {
          id: 0,
          first_name: '',
          last_name: '',
          sex: '',
          date_of_birth: '',
          phone: '',
          email: '',
          username: '',
          password: '',
          direction: ''
        },
        default_data: {
          id: 0,
          first_name: '',
          last_name: '',
          sex: '',
          date_of_birth: '',
          phone: '',
          email: '',
          username: '',
          password: '',
          direction: ''
        }
      }
    },
    // beforeCreate: function () {
    //   if (!this.$session.exists()) {
    //     this.$router.push('/login/')
    //   }
    // },
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
      ...mapState([
        'isLoading',
        'errorMessage',
        'successMessage',
        'rules',
        'rowsPerpage',
        'user',
        'sex',
        'directions',
        'countries',
        'cities'
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
    name: 'NewMember'
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
