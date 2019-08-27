<template>
  <v-container fluid grid-list-md>
    
        <v-form ref="form" lazy-validation>
        <v-layout wrap>
            <v-flex md4>
            <v-text-field 
                v-model="single_project.title" 
                :rules="[rules.required]" 
                label="Job title" 
                placeholder="Manager" 
                outlined 
                clearable
            ></v-text-field>
            </v-flex>
            <v-flex md4>
            <v-text-field 
                v-model="single_project.contact_person" 
                :rules="[rules.required]" 
                label="Contact person" 
                placeholder="John Deo" 
                outlined 
                clearable
            ></v-text-field>
            </v-flex>

            <v-flex md4>
            <v-text-field 
                v-model="single_project.contact_email" 
                :rules="[rules.required]" 
                label="Contact email" 
                placeholder="info@example.com" 
                outlined 
                clearable
            ></v-text-field>
            </v-flex>

            <v-flex md4>
            <v-text-field 
                v-model="single_project.contact_phone" 
                :rules="[rules.required]" 
                label="Telephone" 
                placeholder="256414567890" 
                outlined 
                clearable
            ></v-text-field>
            </v-flex>

            <v-flex md4>
            <v-textarea
                v-model="single_project.organisation_details" 
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
                v-model="single_project.industry"
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
                v-model="single_project.functional_area"
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
                v-model="single_project.organisation_level"
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
                v-model="single_project.job_type"
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
                v-model="single_project.experience_required"
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
                v-model="single_project.occupational_skills"
                label="Occupational skills"
                placeholder="Occupational skills"
                :rules="[rules.required]"
            ></v-textarea>
            </v-flex>

            <v-flex md4>
            <v-textarea
                outlined
                v-model="single_project.responsibilities"
                label="Responsibilities"
                placeholder="Responsibilities"
                :rules="[rules.required]"
            ></v-textarea>
            </v-flex>

            <v-flex md4>
            <v-textarea
                outlined
                v-model="single_project.how_to_apply"
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
            <v-autocomplete
                :items="countries"
                v-model="single_project.country_id"
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
              <v-autocomplete
                :items="cities"
                v-model="single_project.city_id"
                label="City/Town"
                placeholder="Kampala"
                item-text="name"
                item-value="id"
                :rules="[rules.required]"
                class="space-bottom"
                outlined
            ></v-autocomplete>
            </v-flex>

            <v-flex md4>
            <v-text-field 
            v-model="single_project.number_of_vacancies" 
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
                :return-value.sync="single_project.application_start"
                persistent
                full-width
                width="290px"
            >
                <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="single_project.application_start"
                    label="Application start"
                    readonly
                    v-on="on"
                    outlined
                ></v-text-field>
                </template>
                <v-date-picker v-model="single_project.application_start" scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="start_modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.sdialog.save(single_project.application_start)">OK</v-btn>
                </v-date-picker>
            </v-dialog>
            </v-flex>

            <v-flex md4>
            <v-dialog
                ref="dialog"
                v-model="deadline_modal"
                :return-value.sync="single_project.application_deadline"
                persistent
                full-width
                width="290px"
            >
                <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="single_project.application_deadline"
                    label="Application deadline"
                    readonly
                    v-on="on"
                    outlined
                ></v-text-field>
                </template>
                <v-date-picker v-model="single_project.application_deadline" scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="deadline_modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(single_project.application_deadline)">OK</v-btn>
                </v-date-picker>
            </v-dialog>
            </v-flex>

            <v-flex md4>
            <v-switch 
                v-model="single_project.is_head_hunting" 
                :label="`Is head hunting project`"
                :false-value="0"
                :true-value="1"
            ></v-switch>
            </v-flex>

        </v-layout>

        <v-layout row>
            <v-flex >
            <v-btn color="accent" depressed @click.native="updateProject">
                Save changes
            </v-btn>

            </v-flex>

        </v-layout>
        </v-form>
      <snack-bar v-if="successMessage" :color="'success'" :text="successMessage"></snack-bar>
      <snack-bar v-if="errorMessage" :color="'error'" :text="errorMessage"></snack-bar>

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
        id: 0,
        search: '',
        
      }
    },
    // beforeCreate: function () {
    //   if (!this.$session.exists()) {
    //     this.$router.push('/login/')
    //   }
    // },
    created () {
      this.id = this.$route.params.id
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
        'cities',
        'countries',
        'single_project',
        'industries',
        'experiences',
        'levels',
        'job_types',
      ])
    },
    methods: {
      close () {
        this.dialog = false
        setTimeout(() => {
          this.single_project = Object.assign({}, this.default_data)
          this.editedIndex = -1
        }, 300)
      },
      reset () {
        this.form_data = Object.assign({}, this.default_data)
      },
      ...mapActions([
        // 'getRates'
      ]),
      updateProject () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('updateProject', {id: this.id, data: this.single_project})
          this.close()
        }
      },
    },
    mounted: function () {
      // this.getDevices()
    },
    name: 'ProjectInfo'
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
