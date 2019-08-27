<template>
  <v-container fluid grid-list-md>
    
        <v-form ref="form" lazy-validation>
          <v-layout wrap>
              <v-flex md4>
                <v-text-field 
                    v-model="user.username" 
                    :rules="[rules.required]" 
                    label="Username" 
                    placeholder="Username" 
                    outlined 
                    clearable
                ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-text-field 
                    v-model="user.email" 
                    :rules="[rules.required]" 
                    label="Email" 
                    placeholder="info@example.com" 
                    outlined 
                    clearable
                ></v-text-field>
              </v-flex>

              

              <v-flex md4>
                <!-- <v-file-input
                  accept="image/*"
                  label="Profile photo"
                  prepend-inner-icon="mdi-paperclip"
                  outlined
                  placeholder="Browse profile photo"
                  @change="handlePhotoUpload($event)"
                ></v-file-input> -->
                <label>Browse profile photo</label>
                <input type="file" @change="handlePhotoUpload($event)" accept="image/*" />
              </v-flex>

          </v-layout>

          <v-layout wrap>
              <v-flex >
              <v-btn color="accent" depressed @click.native="updateAccountInfo">
                  Save changes
              </v-btn>

              </v-flex>
          </v-layout>

          
        </v-form>

        <v-form >
          <v-layout row class="mt-10">

            <v-flex md4>
                <v-text-field
                    label="Current password"
                    v-model="password_data.current_password"
                    min="8"
                    :append-icon="cp ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (cp = !cp)"
                    :type="cp ? 'password' : 'text'"
                    @click:append="cp = !cp"
                    :rules="[rules.required]"
                    required
                    outlined
                  ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-text-field
                    label="New password"
                    v-model="password_data.password"
                    min="8"
                    :append-icon="np ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (np = !np)"
                    :type="np ? 'password' : 'text'"
                    @click:append="np = !np"
                    :rules="[rules.required]"
                    required
                    outlined
                  ></v-text-field>
              </v-flex>

              <v-flex >
                <v-btn color="accent" depressed @click.native="changePassword">
                    Change password
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
        cp: true,
        np: true,
        id: 0,
        tab: null,
        uid: null,
        password_data: {
          current_password: '',
          password: ''
        },
        form_data: {
          pic: null
        }
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
      reset () {
        this.form_data = Object.assign({}, this.default_data)
      },
      ...mapActions([
        // 'getRates'
      ]),
      handlePhotoUpload: function (event) {
        this.form_data.pic = event.target.files[0]
        console.log(this.form_data.pic)
      },
      updateAccountInfo () {
        if (this.$refs.form.validate()) {
          let formData = new FormData()
          formData.append('username', this.user.username)
          formData.append('email', this.user.email)
          formData.append('pic', this.form_data.pic)
          this.$store.dispatch('updateClient', {id: this.user.id, data: formData})
          this.close()
        }
      },
    },
    mounted: function () {
      // this.getDevices()
    },
    name: 'AccountInfo'
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
