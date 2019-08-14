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
          Roles
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn color="error" @click.native="dialog = false" v-if="selected.length">
          <v-icon>delete</v-icon> Delete selected
        </v-btn>

        <v-btn color="accent" @click.native="dialog = true">
          <v-icon>add</v-icon> New role
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
          :items="roles"
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
            <td>{{ props.item.name }}</td>
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
          <v-btn icon @click="close" class="black--text">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div class="space-20"></div>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="form_data.name" :rules="[rules.required]" label="Name" placeholder="Name" clearable></v-text-field>
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
          { text: 'Name', sortable: true, value: 'name' },
          { text: 'Action', sortable: false }
        ],
        editedIndex: -1,
        form_data: {
          id: 0,
          name: null
        },
        default_data: {
          id: 0,
          name: null,
        }
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/logout/')
      }
    },
    created () {
      this.$store.dispatch('getRoles')
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
        return this.editedIndex === -1 ? 'New role' : 'Edit role'
      },
      ...mapState([
        'isLoading',
        'errorMessage',
        'successMessage',
        'rules',
        'roles',
        'rowsPerpage',
        'user'
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
      addRole () {
        if (this.$refs.form.validate()) {
          this.form_data.user_id = this.user.id
          this.$store.dispatch('addRole', this.form_data)
          this.close()
        }
      },
      updateRole (id) {
        if (this.$refs.form.validate()) {
          this.form_data.user_id = this.user.id
          this.$store.dispatch('updateRole', {id: id, data: this.form_data})
          this.close()
        }
      },
      deleteRole (id) {
        this.$store.dispatch('deleteRole', id)
        console.log('working...' + id)
      },
      checkAction: function (id) {
        if (id === 0) {
          this.addRole()
        } else {
          this.updateRole(id)
        }
        console.log('working...' + id) 
      },
      editItem (item) {
        this.editedIndex = this.roles.indexOf(item)
        this.form_data = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (id) {
        confirm('Are you sure you want to delete?') && this.deleteRole(id)
      }
    },
    mounted: function () {
      // this.getDevices()
    },
    name: 'Roles'
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
