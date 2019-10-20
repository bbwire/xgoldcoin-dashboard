<template>
  <v-container fluid class="back-cover" grid-list-md>
    <v-card>
      <v-toolbar
        class="elevation-0 accent--text"
        light
      >
        <v-btn icon >
          <v-icon color="accent">person</v-icon>
        </v-btn>

        <v-toolbar-title>
          New Member
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <template v-if="$vuetify.breakpoint.smAndUp">

          <v-btn color="accent" depressed @click.native="addMember">
            <v-icon>mdi-check</v-icon> Add member
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
                  v-model="form_data.first_name" 
                  :rules="[rules.required]" 
                  label="First name" 
                  placeholder="John" 
                  outlined 
                  clearable
                ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-text-field 
                  v-model="form_data.last_name" 
                  :rules="[rules.required]" 
                  label="Last name" 
                  placeholder="Doe" 
                  outlined 
                  clearable
                ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-autocomplete
                :items="sex"
                v-model="form_data.sex"
                label="Sex"
                placeholder="Sex"
                item-text="name"
                item-value="name"
                :rules="[rules.required]"
                class="space-bottom"
                 outlined
              ></v-autocomplete>
              </v-flex>

              <v-flex md4>
                <v-text-field 
                  v-model="form_data.email" 
                  :rules="[rules.required]" 
                  label="Email" 
                  placeholder="info@example.com" 
                  outlined 
                  clearable
                ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-text-field 
                  v-model="form_data.phone" 
                  :rules="[rules.required]" 
                  label="Phone" 
                  placeholder="256706567890"
                  outlined 
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
                  v-model="form_data.username" 
                  :rules="[rules.required]" 
                  label="Username" 
                  placeholder="John" 
                  outlined 
                  clearable
                ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-text-field
                    label="Password"
                    v-model="form_data.password"
                    min="8"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    @click:append="e1 = !e1"
                    :rules="[rules.required]"
                    required
                    outlined
                  ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-autocomplete
                :items="directions"
                v-model="form_data.direction"
                label="Position"
                placeholder="Position"
                item-text="name"
                item-value="name"
                :rules="[rules.required]"
                class="space-bottom"
                 outlined
              ></v-autocomplete>
              </v-flex>

            </v-layout>
            
          </v-form>

          <v-card outlined class="pa-4 mt-5">
            <div class="mb-3 title">Buy a package</div>
            <v-form ref="package-form" lazy-validation>
              <v-layout wrap>
                <v-flex md4>
                  <v-text-field 
                    v-model="form_data.first_name" 
                    :rules="[rules.required]" 
                    label="Username" 
                    placeholder="John" 
                    outlined 
                    clearable
                  ></v-text-field>
                </v-flex>

                <v-flex md4>
                  <v-text-field 
                    v-model="form_data.last_name" 
                    :rules="[rules.required]" 
                    label="Full name" 
                    placeholder="John Doe" 
                    outlined 
                    clearable
                    readonly
                  ></v-text-field>
                </v-flex>

                <v-flex md4>
                  <v-autocomplete
                  :items="packages"
                  v-model="form_data.package_id"
                  label="Package"
                  placeholder="Package"
                  item-text="name"
                  item-value="id"
                  :rules="[rules.required]"
                  class="space-bottom"
                  outlined
                  @change="getPackage(form_data.package_id)"
                ></v-autocomplete>
                </v-flex>

              </v-layout>
              
            </v-form>

            <v-layout row align-content-end>
              <v-flex md5 class="" >
              <v-simple-table v-if="form_data.package_id">
                <thead>
                  <tr>
                    <th class="text-left">XGOLD</th>
                    <th class="text-left">BTC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <td>{{ (10 / 100) * single_package.amount }}</td>
                    <td>{{ (90 / 100) * single_package.amount }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
              </v-flex>
            </v-layout>
            
          </v-card>
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
        'rowsPerpage',
        'user',
        'sex',
        'directions',
        'countries',
        'packages',
        'single_package'
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
      getPackage (id) {
        this.$store.dispatch('getSinglePackage', id)
      }
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
