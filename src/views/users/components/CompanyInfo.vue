<template>
  <v-container fluid grid-list-md>
    
        <v-form ref="form" lazy-validation>
        <v-layout wrap>
            <v-flex md4>
            <v-text-field 
                v-model="user.name" 
                :rules="[rules.required]" 
                label="Company name" 
                placeholder="Company name" 
                outlined 
                clearable
            ></v-text-field>
            </v-flex>

            <v-flex md4>
              <v-autocomplete
                :items="industries"
                v-model="user.industry"
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
            <v-text-field 
                v-model="user.contact_person" 
                :rules="[rules.required]" 
                label="Contact person" 
                placeholder="John Deo" 
                outlined 
                clearable
            ></v-text-field>
            </v-flex>

            <v-flex md4>
            <v-text-field 
                v-model="user.designation" 
                :rules="[rules.required]" 
                label="Designation" 
                placeholder="Manager" 
                outlined 
                clearable
            ></v-text-field>
            </v-flex>

            <v-flex md4>
            <v-text-field 
                v-model="user.website_url" 
                :rules="[rules.required]" 
                label="Website url" 
                placeholder="example.com" 
                outlined 
                clearable
            ></v-text-field>
            </v-flex>

        </v-layout>

        <v-layout row>
            <v-flex >
            <v-btn color="accent" depressed @click.native="updateCompanyInfo">
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
      // this.$store.dispatch('getCountries')
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
        'user',
        'industries',
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
      updateCompanyInfo () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('updateClient', {id: this.user.id, data: this.user})
          this.close()
        }
      },
    },
    mounted: function () {
      // this.getDevices()
    },
    name: 'CompanyInfo'
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
