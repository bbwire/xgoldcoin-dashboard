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
          Loans
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn color="error" @click.native="dialog = false" v-if="selected.length">
          <v-icon>delete</v-icon> Delete selected
        </v-btn>

        <v-btn color="accent" @click.native="dialog = true">
          <v-icon>add</v-icon> New loan
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
          :items="loans"
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
            <td><router-link :to="`/loan/schedule/${props.item.id}`">{{ props.item.client.name }}</router-link></td>
            <td>{{ props.item.client.phone }}</td>
            <td>{{ props.item.client.email }}</td>
            <td>{{ props.item.principal }}</td>
            <td>{{ props.item.interest_rate }}</td>
            <td>{{ props.item.duration }}</td>
            <td>{{ props.item.installments }}</td>
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
            <v-autocomplete
                :items="clients"
                v-model="form_data.client_id"
                label="Client"
                placeholder="Client"
                item-text="name"
                item-value="id"
                :rules="[rules.required]"
                class="space-bottom"
            ></v-autocomplete>
            <v-autocomplete
                :items="id_types"
                v-model="form_data.identification_type"
                label="Identification type"
                placeholder="Identification type"
                item-text="name"
                item-value="value"
                :rules="[rules.required]"
                class="space-bottom"
            ></v-autocomplete>
            <v-text-field v-model="form_data.id_number" :rules="[rules.required]" label="Id Number" placeholder="Id Number" clearable></v-text-field>
            <v-text-field v-model="form_data.principal" :rules="[rules.required]" label="Principal" placeholder="Principal" clearable></v-text-field>
            <v-text-field v-model="form_data.interest_rate" :rules="[rules.required]" label="Interest" placeholder="Interest" clearable></v-text-field>
            <v-text-field v-model="form_data.installments" :rules="[rules.required]" label="Installments" placeholder="Installments" clearable></v-text-field>
            <v-text-field v-model="form_data.duration" :rules="[rules.required]" label="Duration" placeholder="Duration" clearable></v-text-field>
            
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
          { text: 'Name', sortable: true, value: 'client.name' },
          { text: 'Email', sortable: true, value: 'client.email' },
          { text: 'Phone', sortable: true, value: 'client.phone' },
          { text: 'Principal', sortable: true, value: 'principal' },
          { text: 'Interest rate', sortable: true, value: 'interest_rate' },
          { text: 'Duration', sortable: true, value: 'duration' },
          { text: 'Installments', sortable: true, value: 'installments' },
          { text: 'Action', sortable: false }
        ],
        editedIndex: -1,
        form_data: {
          id: 0,
          client_id: null,
          identification_type: null,
          id_number: null,
          principal: null,
          interest_rate: null,
          duration: null,
          installments: null,
        },
        default_data: {
          id: 0,
          client_id: null,
          identification_type: null,
          id_number: null,
          principal: null,
          interest_rate: null,
          duration: null,
          installments: null,
        },
        id_types: [
          {
            name: 'National ID',
            vaue: 'National ID'
          },
          {
            name: 'Passport',
            value: 'Passport'
          },
          {
            name: 'Driving Permit',
            value: 'Driving Permit'
          }
        ]
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/logout/')
      }
    },
    created () {
      this.$store.dispatch('getLoans')
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
        'loans',
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
      addLoan () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('addLoan', this.form_data)
          this.close()
        }
      },
      updateLoan (id) {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('updateLoan', {id: id, data: this.form_data})
          this.close()
        }
      },
      deleteLoan (id) {
        this.$store.dispatch('deleteLoan', id)
        console.log('working...' + id)
      },
      checkAction: function (id) {
        if (id === 0) {
          this.addLoan()
        } else {
          this.updateLoan(id)
        }
        console.log('working...' + id)
      },
      editItem (item) {
        this.editedIndex = this.loans.indexOf(item)
        this.form_data = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (id) {
        confirm('Are you sure you want to delete?') && this.deleteLoan(id)
      }
    },
    mounted: function () {
      // this.getDevices()
    },
    name: 'Loans'
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
