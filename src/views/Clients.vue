<template>
  <v-container fluid class="back-cover">
    <v-card >
      <v-toolbar
        class="elevation-0 accent--text"
        light
      >
        <v-btn icon >
          <v-icon color="accent">mdi-apps</v-icon>
        </v-btn>

        <v-toolbar-title>
          Clients
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <template v-if="$vuetify.breakpoint.smAndUp">
          <v-btn color="error" @click.native="dialog = false" v-if="selected.length">
            <v-icon>delete</v-icon> Delete selected
          </v-btn>
<!-- 
          <v-btn color="accent" class="button-gradient" depressed @click.native="dialog = true">
            <v-icon>mdi-plus</v-icon> New user
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
          :items="clients"
          :single-select="singleSelect"
          :search="search"
          item-key="id"
          show-select
          class="elevation-0"
          :loading="isLoading"
          loading-text="Loading data..."
        >

          <template v-slot:item.name="{ item }">
            <router-link :to="`/clients/details/${item.id}`" >{{item.name}}</router-link>
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" >
              mdi-pencil
            </v-icon>
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
      SnackBar
    },
    data () {
      return {
        dialog: false,
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
          { text: 'Name', sortable: true, value: 'name' },
          { text: 'Email', sortable: true, value: 'email' },
          { text: 'Phone', sortable: true, value: 'phone' },
          { text: 'Website url', sortable: true, value: 'website_url' },
          { text: 'Username', sortable: true, value: 'username' },
          { text: 'Action', value: 'action', sortable: false }
        ],
        editedIndex: -1,
        form_data: {
          id: 0,
          first_name: null,
          last_name: null,
          phone: null,
          email: null,
          username: null,
          password: null
        },
        default_data: {
          id: 0,
          first_name: null,
          last_name: null,
          phone: null,
          email: null,
          username: null,
          password: null
        }
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login/')
      }
    },
    created () {
      this.$store.dispatch('getClients')
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
        'clients',
        'rowsPerpage',
        'user',
        'sex'
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
        'getClients'
      ]),
      deleteClient (id) {
        this.$store.dispatch('deleteClient', id)
      },
      deleteItem (id) {
        confirm('Are you sure you want to delete?') && this.deleteClient(id)
      }
    },
    mounted: function () {
      // this.getDevices()
    },
    name: 'Clients'
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
