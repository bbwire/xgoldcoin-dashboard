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
          Clients
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn color="error" @click.native="dialog = false" v-if="selected.length">
          <v-icon>delete</v-icon> Delete selected
        </v-btn>

        <v-btn color="accent" @click.native="dialog = true">
          <v-icon>add</v-icon> New client
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
          :items="clients"
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
            <td><router-link :to="`/client/${props.item.id}`">{{ props.item.name }}</router-link></td>
            <td>{{ props.item.sex }}</td>
            <td>{{ props.item.phone }}</td>
            <td>{{ props.item.email }}</td>
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
            <v-text-field v-model="form_data.name" :rules="[rules.required]" label="Name" placeholder="Name" clearable></v-text-field>
           <v-text-field v-model="form_data.phone" :rules="[rules.required]" label="Phone" placeholder="Phone" clearable></v-text-field>
            <v-text-field v-model="form_data.email" label="Email" placeholder="Email" clearable></v-text-field>
            <v-autocomplete
                :items="sex"
                v-model="form_data.sex"
                label="Sex"
                placeholder="Sex"
                item-text="name"
                item-value="id"
                :rules="[rules.required]"
                class="space-bottom"
            ></v-autocomplete>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              :return-value.sync="user.date_of_birth"
              lazy
              persistent
              transition="scale-transition"
              full-width
              min-width="290px"
              >
              <v-text-field
                  slot="activator"
                  v-model="form_data.date_of_birth"
                  label="Date of birth"
                  placeholder="Date of birth"
                  readonly
                  clearable
              ></v-text-field>
              <v-date-picker 
                v-model="form_data.date_of_birth" 
                no-title 
                scrollable
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
              >
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(form_data.date_of_birth)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-text-field v-model="form_data.referee" :rules="[rules.required]" label="Referee" placeholder="Referee" clearable></v-text-field>
            <v-text-field v-model="form_data.next_of_kin" :rules="[rules.required]" label="Next of kin" placeholder="Next of kin" clearable></v-text-field>
            <v-text-field v-model="form_data.occupation" :rules="[rules.required]" label="Occupation" placeholder="Occupation" clearable></v-text-field>
            <v-text-field v-model="form_data.residence" :rules="[rules.required]" label="Residence" placeholder="Residence" clearable></v-text-field>
            <v-text-field v-model="form_data.place_of_birth" :rules="[rules.required]" label="Place of birth" placeholder="Place of birth" clearable></v-text-field>
            <label class="bold" style="display: block;">Choose client pic</label>
            <input
              type="file"
              ref="image"
              accept="image/*"
              @change="handlePhotoUpload($event)"
            />
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-4">
          <v-btn color="errorpassword darken-1" flat @click.native="close">Cancel</v-btn>
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
        menu: false,
        id: 0,
        search: '',
        pagination: {},
        selected: [],
        tab: null,
        uid: null,
        headers: [
          { text: '#', sortable: true, value: 'index' },
          { text: 'Name', sortable: true, value: 'name' },
          { text: 'Sex', sortable: true, value: 'sex' },
          { text: 'Email', sortable: true, value: 'email' },
          { text: 'Phone', sortable: true, value: 'phone' },
          { text: 'Action', sortable: false }
        ],
        editedIndex: -1,
        form_data: {
          id: 0,
          name: null,
          residence: null,
          place_of_birth: null,
          phone: null,
          sex: null,
          email: null,
          occupation: null,
          next_of_kin: null,
          referee: null,
          photo: null,
        },
        default_data: {
          id: 0,
          name: null,
          residence: null,
          place_of_birth: null,
          phone: null,
          sex: null,
          email: null,
          occupation: null,
          next_of_kin: null,
          referee: null,
          photo: null,
        }
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/logout/')
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
      formTitle () {
        return this.editedIndex === -1 ? 'New client' : 'Edit client'
      },
      ...mapState([
        'isLoading',
        'errorMessage',
        'successMessage',
        'rules',
        'clients',
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
        // 'getRates'
      ]),
      addClient () {
        if (this.$refs.form.validate()) {
          let formData = new FormData();
          formData.append('name', this.form_data.name)
          formData.append('sex', this.form_data.sex)
          formData.append('date_of_birth', this.form_data.date_of_birth)
          formData.append('phone', this.form_data.phone)
          formData.append('email', this.form_data.email)
          formData.append('residence', this.form_data.residence)
          formData.append('referee', this.form_data.referee)
          formData.append('next_of_kin', this.form_data.next_of_kin)
          formData.append('occupation', this.form_data.occupation)
          formData.append('place_of_birth', this.form_data.place_of_birth)
          formData.append('pic', this.form_data.photo)
          this.$store.dispatch('addClient', formData)
          this.close()
        }
      },
      handlePhotoUpload: function (event) {
        // this.files.append('photo', this.$refs.photo.files[0])
        this.form_data.photo = event.target.files[0]
        console.log(this.form_data.photo)
      },
      updateClient (id) {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('updateClient', {id: id, data: this.form_data})
          this.close()
        }
      },
      deleteClient (id) {
        this.$store.dispatch('deleteClient', id)
        console.log('working...' + id)
      },
      checkAction: function (id) {
        if (id === 0) {
          this.addClient()
        } else {
          this.updateClient(id)
        }
        console.log('working...' + id)
      },
      editItem (item) {
        this.editedIndex = this.clients.indexOf(item)
        this.form_data = Object.assign({}, item)
        this.dialog = true
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
