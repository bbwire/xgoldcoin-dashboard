<template>
  <v-container grid-list-md fluid class="back-cover">
    <v-slide-y-transition mode="out-in">
      <v-layout row justify-center align-center>
        <v-flex md6 lg5 sm10 xs12 align-center>
          <!-- <div class="align-center img-align-center">
            <p class="uppercase title">
              Don't have an account yet?
              <v-btn color="primary" to="/register/">Register here</v-btn>
            </p>
          </div> -->
          <v-card-text></v-card-text>
          <v-card
            class="elevation-0"
          >

            <v-layout wrap>

              <!-- <v-flex md5 class="grey lighten-2">
                <v-card-title class="bold--text large__input--text text-sm-center text-xs-center text-lg-center text-md-center">
                  
                </v-card-title>
                <v-card-text class="accent--text darken-2">
                  <div class="space-top-20"></div>
                  <p class="uppercase subheading">
                    What can you do with your Account?
                  </p>

                  <div class="space-top-20"></div>

                  <p class="uppercase body-2">
                    <v-icon color="green">check</v-icon> Deposit Money
                  </p>
                  <p class="uppercase body-2">
                    <v-icon color="green">check</v-icon> Withdraw Money
                  </p>

                  <p class="uppercase body-2">
                    <v-icon color="green">check</v-icon> Money Transfer
                  </p>
                </v-card-text>

              </v-flex> -->

              <v-flex md12>
                <v-card-title class="bold--text large__input--text text-sm-center text-xs-center text-lg-center text-md-center">
                  <!-- <h3>Sign in</h3> -->
                </v-card-title>
                <!-- <v-divider></v-divider> -->
                <v-card-text>
                  <div class="space-top-20"></div>
                  <v-form ref="form" @keyup.native.enter="login" lazy-validation >
                    <v-text-field
                      label="Email or username"
                      placeholder="Enter email or username"
                      required
                      validate-on-blur
                      :rules="[rules.required]"
                      v-model="userdata.email"
                      clearable
                    ></v-text-field>

                    <v-text-field
                      label="Password"
                      placeholder="Password"
                      required
                      validate-on-blur
                      v-model="userdata.password"
                      :rules="[rules.required]"
                      :append-icon="show1 ? 'visibility_off' : 'visibility'"
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
                    ></v-text-field>
                    <div class="align-end">
                      <a :to="'#'" class="primary--text text-right">Forgot Password?</a>

                    </div>

                    <v-checkbox
                      v-model="checkbox"
                      label="Keep me signed in"
                      color="accent"
                      required
                    ></v-checkbox>
                  </v-form>
                </v-card-text>
                <v-card-title class="bold--text large__input--text text-sm-center text-xs-center text-lg-center text-md-center">
                  <!-- <h3>Sign in</h3> -->
                </v-card-title>
                <v-divider></v-divider>
                

                <v-card-actions>
                  <!-- <v-btn flat>Cancel</v-btn> -->
                  <v-spacer></v-spacer>
                  <v-btn color="accent" @click="login" :disabled="isLoading">Sign in</v-btn>
                  <v-progress-circular v-if="isLoading" :size="25" :width="2" indeterminate color="accent"></v-progress-circular>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>

      </v-layout>
    </v-slide-y-transition>
    <snack-bar v-if="successMessage" :color="'success'" :text="successMessage"></snack-bar>
    <snack-bar v-if="errorMessage" :color="'error'" :text="errorMessage"></snack-bar>
  </v-container>
</template>

<script>
  /* eslint-disable no-console */
  import service from '../services/UserService'
  import SnackBar from '../components/commons/SnackBar.vue'
  export default {
    components: {
      SnackBar
    },
    data () {
      return {
        show1: false,
        checkbox: false,
        password: 'Password',
        isLoading: false,
        rules: {
          required: value => !!value || 'Field required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        },
        userdata: {
          email: '',
          password: ''
        },
        errorMessage: '',
        successMessage: ''
      }
    },
    beforeCreate: function () {
      if (this.$session.exists()) {
        this.$router.push('/')
      } else {
        if (!window.location.hash) {
          window.location = window.location + '#loaded'
          window.location.reload()
        }
      }
    },
    methods: {
      onLogin: function () {
        this.$session.start()
        this.$session.set('uid', 1)
        location.reload()
      },
      login: function () {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          this.successMessage = ''
          this.errorMessage = ''
          let self = this
          service.userLogin(this.userdata).then(function (response) {
            if (response.data.error === true) {
              self.errorMessage = response.data.message
              self.isLoading = false
            } else {
              console.log(response)
              self.$session.start()
              self.$session.set('uid', response.data.data.id)
              // self.$router.push('/')
              self.successMessage = response.data.message
              self.isLoading = false
              self.userdata = {username: '', password: ''}
              location.reload()
            }
          }).catch(function (res) {
            self.errorMessage = 'Network error!'
            console.log(res)
            self.isLoading = false
          })
        }
      }
    }
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

  .img-align-center {
    text-align: center;
  }
</style>
