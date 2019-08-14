<template>
  <v-container fluid class="back-cover">
    <v-card flat>
      <v-toolbar
        prominent
        class="elevation-0 accent--text"
        color="white"
        light
      >
        <v-btn icon >
          <v-icon color="accent">apps</v-icon>
        </v-btn>

        <v-toolbar-title>
          Users
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn color="error" @click.native="dialog = false" v-if="selected.length">
          <v-icon>delete</v-icon> Delete selected
        </v-btn>

        <v-btn color="accent" @click.native="dialog = true">
          <v-icon>add</v-icon> New user
        </v-btn>

        

        <v-btn icon>
          <v-icon color="accent">more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-title>       
          <v-spacer></v-spacer>
          <!-- <el-input placeholder="Please search" prefix-icon="el-icon-search" v-model="search"></el-input> -->
          <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              placeholder="Search"
              single-line
              color="accent"
          ></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="users"
          item-key="id"
          select-all
          :search="search"
          class="elevation-0"
          :loading="isLoading"
          :rows-per-page-items="rowsPerpage"
        >
          <template v-slot:items="props">
            <td>
              <v-checkbox
                v-model="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td>{{ props.index+1 }}</td>
            <td>{{ props.item.first_name }} {{ props.item.last_name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.phone }}</td>
            <td>{{ props.item.username }}</td>
            <td >
              <v-btn icon small @click.native="editItem(props.item)">
                <v-icon small color="success"> edit </v-icon>
              </v-btn>
              <v-btn icon small @click.native="deleteItem(props.item.id)">
                <v-icon small color="error"> delete </v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>

      </v-card-text>
      <snack-bar v-if="successMessage" :color="'success'" :text="successMessage"></snack-bar>
      <snack-bar v-if="errorMessage" :color="'error'" :text="errorMessage"></snack-bar>
    </v-card>

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
              <v-text-field v-model="form_data.first_name" :rules="[rules.required]" label="First name" placeholder="First name" clearable></v-text-field>
              <v-text-field v-model="form_data.last_name" :rules="[rules.required]" label="Last name" placeholder="Last name" clearable></v-text-field>
              <v-text-field v-model="form_data.phone" :rules="[rules.required]" label="Phone" placeholder="Phone" clearable></v-text-field>
              <v-text-field v-model="form_data.email" :rules="[rules.email]" label="Email" placeholder="Email" clearable></v-text-field>
              
              <v-text-field v-model="form_data.username" :rules="[rules.required]" label="Username" placeholder="Username" clearable></v-text-field>
              <v-text-field 
                v-model="form_data.password" 
                :rules="[rules.required]" 
                label="Password" 
                placeholder="Password" 
                clearable
                :append-icon="show1 ? 'visibility_off' : 'visibility'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                v-if="form_data.id === 0"
              ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-4">
          <v-btn color="error darken-1" flat @click.native="close">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="checkAction(form_data.id)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        id: 0,
        search: '',
        pagination: {},
        selected: [],
        tab: null,
        uid: null,
        headers: [
          { text: '#', sortable: true, value: 'index' },
          { text: 'Name', sortable: true, value: 'first_name' },
          { text: 'Email', sortable: true, value: 'email' },
          { text: 'Phone', sortable: true, value: 'role.name' },
          { text: 'Username', sortable: true, value: 'username' },
          { text: 'Action', sortable: false }
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
        this.$router.push('/logout/')
      }
    },
    created () {
      this.$store.dispatch('getUsers')
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
        return this.editedIndex === -1 ? 'New user' : 'Edit user'
      },
      ...mapState([
        'isLoading',
        'errorMessage',
        'successMessage',
        'rules',
        'users',
        'roles',
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
        'getRates'
      ]),
      addUser () {
        if (this.$refs.form.validate()) {
          this.form_data.user_id = this.user.id
          this.$store.dispatch('addUser', this.form_data)
          this.close()
        }
      },
      updateUser (id) {
        if (this.$refs.form.validate()) {
          this.form_data.user_id = this.user.id
          this.$store.dispatch('updateUser', {id: id, data: this.form_data})
          this.close()
        }
      },
      deleteUser (id) {
        this.$store.dispatch('deleteUser', id)
        console.log('working...' + id)
      },
      checkAction: function (id) {
        if (id === 0) {
          this.addUser()
        } else {
          this.updateUser(id)
        }
        console.log('working...' + id)
      },
      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.form_data = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (id) {
        confirm('Are you sure you want to delete?') && this.deleteUser(id)
      }
    },
    mounted: function () {
      // this.getDevices()
    },
    name: 'Users'
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
