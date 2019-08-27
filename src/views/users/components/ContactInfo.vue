<template>
  <v-container fluid grid-list-md>
    
        <v-form ref="form" lazy-validation>
        <v-layout wrap>

            <v-flex md4>
              <v-autocomplete
                  :items="countries"
                  v-model="client_contact_info.country_id"
                  label="Country"
                  placeholder="Select country"
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
                  v-model="client_contact_info.city_id"
                  label="City"
                  placeholder="Select city"
                  item-text="name"
                  item-value="id"
                  :rules="[rules.required]"
                  class="space-bottom"
                  outlined
              ></v-autocomplete>
            </v-flex>

            <v-flex md4>

              <v-text-field 
                  v-model="client_contact_info.street" 
                  :rules="[rules.required]" 
                  label="Street" 
                  placeholder="Kampala road" 
                  outlined 
                  clearable
              ></v-text-field>
            </v-flex>

            <v-flex md4>
              <v-text-field 
                  v-model="client_contact_info.telephone1" 
                  :rules="[rules.required]" 
                  label="Telephone1" 
                  placeholder="256414985674" 
                  outlined 
                  clearable
              ></v-text-field>
            </v-flex>

            <v-flex md4>
              <v-text-field 
                  v-model="client_contact_info.telephone2" 
                  label="Telephone2" 
                  placeholder="256414567890" 
                  outlined 
                  clearable
              ></v-text-field>
            </v-flex>

            <v-flex md4>
              <v-text-field
                  v-model="client_contact_info.fax_number" 
                  :rules="[rules.required]" 
                  label="Fax number"
                  placeholder="256414567890"
                  outlined
                  clearable
              ></v-text-field>
            </v-flex>

            <v-flex md4>
              <v-text-field
                v-model="client_contact_info.mobile_number" 
                :rules="[rules.required]" 
                label="Mobile number"
                placeholder="256774567890"
                outlined
                clearable
              ></v-text-field>
            </v-flex>

        </v-layout>

        <v-layout row>
            <v-flex >
            <v-btn color="accent" depressed @click.native="updateContactInfo">
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
        id: 0,
        search: '',
        pagination: {},
        selected: [],
        tab: null,
        uid: null,
      }
    },
    // beforeCreate: function () {
    //   if (!this.$session.exists()) {
    //     this.$router.push('/login/')
    //   }
    // },
    created () {
      this.uid = this.$session.get('uid')
      this.$store.dispatch('getCountries')
      this.$store.dispatch('getCities')
      this.$store.dispatch('getClientContactInfo', this.uid)
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
        'user',
        'sex',
        'countries',
        'cities',
        'client_contact_info'
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
      updateContactInfo () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('updateClientContacts', {id: this.user.id, data: this.client_contact_info})
          this.close()
        }
      },
    },
    mounted: function () {
      // this.getDevices()
    },
    name: 'ContactInfo'
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
