<template>
  <v-container fluid class="back-cover" grid-list-md>
    <v-card>
      <v-toolbar
        class="elevation-0 accent--text"
        light
      >
        <v-btn icon @click.native="back" >
          <v-icon color="accent">arrow_back</v-icon>
        </v-btn>

        <v-toolbar-title>
          New Project
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <template v-if="$vuetify.breakpoint.smAndUp">

          <v-btn color="accent" class="button-gradient" depressed @click.native="addProject">
            <v-icon>mdi-check</v-icon> Save project
          </v-btn>

          

          <v-btn icon>
            <v-icon color="accent">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-layout wrap>
              <v-flex md4>
                <v-text-field 
                  v-model="form_data.title" 
                  :rules="[rules.required]" 
                  label="Job title" 
                  placeholder="Manager" 
                  outlined 
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field 
                  v-model="form_data.contact_person" 
                  :rules="[rules.required]" 
                  label="Contact person" 
                  placeholder="John Deo" 
                  outlined 
                  clearable
                ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-text-field 
                  v-model="form_data.contact_email" 
                  :rules="[rules.required]" 
                  label="Contact email" 
                  placeholder="info@example.com" 
                  outlined 
                  clearable
                ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-text-field 
                  v-model="form_data.contact_phone" 
                  :rules="[rules.required]" 
                  label="Telephone" 
                  placeholder="256414567890" 
                  outlined 
                  clearable
                ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-textarea
                  v-model="form_data.organisation_details" 
                  :rules="[rules.required]" 
                  label="Organisation details"
                  placeholder="Organisation details"
                  auto-grow
                  outlined
                  rows="2"
                  clearable
                ></v-textarea>
              </v-flex>

              <v-flex md4>
                <v-autocomplete
                  :items="industries"
                  v-model="form_data.industry"
                  label="Industry"
                  placeholder="Select industry"
                  item-text="name"
                  item-value="name"
                  :rules="[rules.required]"
                  class="space-bottom"
                  outlined
                ></v-autocomplete>
              </v-flex>

              <v-flex md4>
                <v-autocomplete
                  :items="industries"
                  v-model="form_data.functional_area"
                  label="Functional area"
                  placeholder="Functional area"
                  item-text="name"
                  item-value="name"
                  :rules="[rules.required]"
                  class="space-bottom"
                  outlined
                ></v-autocomplete>
              </v-flex>

            </v-layout>

            <v-divider></v-divider>
            <div class="space-top-20"></div>

            <span class="headline">Job Description</span>

            <div class="space-top-20"></div>
            <v-divider></v-divider>
            <div class="space-top-20"></div>
            <v-layout wrap row>

              <v-flex md4>
                <v-autocomplete
                  :items="levels"
                  v-model="form_data.organisation_level"
                  label="Organisation level"
                  placeholder="Organisation level"
                  item-text="name"
                  item-value="name"
                  :rules="[rules.required]"
                  class="space-bottom"
                  outlined
                ></v-autocomplete>
              </v-flex>

              <v-flex md4>
                <v-autocomplete
                  :items="job_types"
                  v-model="form_data.job_type"
                  label="Type of job"
                  placeholder="Type of job"
                  item-text="name"
                  item-value="name"
                  :rules="[rules.required]"
                  class="space-bottom"
                  outlined
                ></v-autocomplete>
              </v-flex>

              <v-flex md4>
                <v-autocomplete
                  :items="experiences"
                  v-model="form_data.experience_required"
                  label="Experience required"
                  placeholder="Experience required"
                  item-text="name"
                  item-value="name"
                  :rules="[rules.required]"
                  class="space-bottom"
                  outlined
                ></v-autocomplete>
              </v-flex>

              <v-flex md4>
                <v-textarea
                  outlined
                  v-model="form_data.occupational_skills"
                  label="Occupational skills"
                  placeholder="Occupational skills"
                  :rules="[rules.required]"
                ></v-textarea>
              </v-flex>

              <v-flex md4>
                <v-textarea
                  outlined
                  v-model="form_data.responsibilities"
                  label="Responsibilities"
                  placeholder="Responsibilities"
                  :rules="[rules.required]"
                ></v-textarea>
              </v-flex>

              <v-flex md4>
                <v-textarea
                  outlined
                  v-model="form_data.how_to_apply"
                  label="How to apply"
                  placeholder="How to apply"
                ></v-textarea>
              </v-flex>

              </v-layout>

            <v-divider></v-divider>
            <div class="space-top-20"></div>

            <span class="headline">Job Location</span>

            <div class="space-top-20"></div>
            <v-divider></v-divider>
            <div class="space-top-20"></div>
            <v-layout wrap row>
              
              <v-flex md4>
              <v-text-field 
                v-model="form_data.city" 
                :rules="[rules.required]" 
                label="City/Town" 
                outlined 
                placeholder="City/Town" 
                clearable
              ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-autocomplete
                  :items="countries"
                  v-model="form_data.country_id"
                  label="Country"
                  placeholder="Country"
                  item-text="name"
                  item-value="id"
                  :rules="[rules.required]"
                  class="space-bottom"
                  outlined
                ></v-autocomplete>
              </v-flex>

              <v-flex md4>
              <v-text-field 
                v-model="form_data.vacancies" 
                :rules="[rules.required]" 
                label="Number of vacancies" 
                outlined 
                placeholder="Number of vacancies" 
                clearable
              ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-dialog
                  ref="sdialog"
                  v-model="start_modal"
                  :return-value.sync="form_data.application_start"
                  persistent
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="form_data.application_start"
                      label="Application start"
                      readonly
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="form_data.application_start" scrollable>
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="start_modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.sdialog.save(form_data.application_start)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>

              <v-flex md4>
                <v-dialog
                  ref="dialog"
                  v-model="deadline_modal"
                  :return-value.sync="form_data.application_deadline"
                  persistent
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="form_data.application_deadline"
                      label="Application deadline"
                      readonly
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="form_data.application_deadline" scrollable>
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="deadline_modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(form_data.application_deadline)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>

              <v-flex md4>
                <v-switch 
                  v-model="form_data.is_head_hunting" 
                  :label="`Is head hunting project`"
                  :false-value="0"
                  :true-value="1"
                ></v-switch>
              </v-flex>

            </v-layout>

            <v-layout row>
              <v-flex >
                <v-btn color="accent" class="button-gradient" depressed @click.native="addProject">
                  <v-icon>mdi-check</v-icon> Save project
                </v-btn>

              </v-flex>

              <v-flex >

                <v-btn color="error" depressed @click.native="reset">
                  <v-icon>mdi-close</v-icon> Reset form
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
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
        deadline_modal: false,
        show1: false,
        singleSelect: false,
        id: 0,
        search: '',
        pagination: {},
        selected: [],
        tab: null,
        uid: null,
        editedIndex: -1,
        form_data: {
          id: 0,
          title: null,
          contact_person: '',
          contact_phone: '',
          contact_email: '',
          organisation_details: '',
          industry: '',
          functional_area: '',
          organisation_level: '',
          job_type: '',
          experience_required: '',
          occupational_skills: '',
          responsibilities: '',
          how_to_apply: '',
          town: '',
          country_id: null,
          number_of_vacancies: null,
          application_start: '',
          application_deadline: '',
          is_head_hunting: 1,
        },
        default_data: {
          id: 0,
          title: null,
          contact_person: '',
          contact_phone: '',
          contact_email: '',
          organisation_details: '',
          industry: '',
          functional_area: '',
          organisation_level: '',
          job_type: '',
          experience_required: '',
          occupational_skills: '',
          responsibilities: '',
          how_to_apply: '',
          town: '',
          country_id: null,
          number_of_vacancies: null,
          application_start: '',
          application_deadline: '',
          is_head_hunting: 0,
        }
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login/')
      }
    },
    created () {
      this.$store.dispatch('getCountries')
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
        'users',
        'roles',
        'rowsPerpage',
        'user',
        'sex',
        'industries',
        'experiences',
        'levels',
        'job_types',
        'countries'
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
      addProject () {
        if (this.$refs.form.validate()) {
          this.form_data.user_id = this.user.id
          this.$store.dispatch('addProject', this.form_data)
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
