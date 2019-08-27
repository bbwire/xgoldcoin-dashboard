<template>
  <v-app id="inspire">
    <v-content 
      class="login-background-gradient client-back"
    >
      <v-container
        class="fill-height"
      >
        <v-row
          class="d-flex flex-row-reverse"
        >
          <v-col
            cols="12"
            sm="8"
            md="5"
          >
            <v-card class="elevation-12 text-center pa-8">
              <v-card-text>
                <span class="headline font-weight-black">Funture Options Client Sign up</span>
              </v-card-text>

              <v-card-text>
                Already have an account? <router-link to="/login">Login now</router-link>
              </v-card-text>

              <v-card-text>
                <v-form ref="form" @keyup.native.enter="register">

                  <v-text-field
                    label="Company name"
                    v-model="form_data.name"
                    type="text"
                    :rules="[rules.required]"
                    outlined
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    v-model="form_data.email"
                    type="text"
                    :rules="[rules.required, rules.email]"
                    outlined
                  ></v-text-field>

                  <v-text-field
                    label="Phone"
                    v-model="form_data.phone"
                    type="text"
                    :rules="[rules.required]"
                    outlined
                  ></v-text-field>

                  <v-text-field
                    label="Username"
                    v-model="form_data.username"
                    type="text"
                    :rules="[rules.required]"
                    outlined
                  ></v-text-field>

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
                </v-form>

                <!-- <v-layout justify-space-between>
                    <router-link to="/password/recovery">Forgot password</router-link>
                </v-layout> -->
              </v-card-text>
              <v-card-text>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" block @click="register" depressed :loading="isLoading">
                  Sign up now
                </v-btn>
              </v-card-text>

              <!-- <v-card-text>
                <span class="title">or sign in with</span>
              </v-card-text>

              <v-card-text>
                <v-btn color="indigo" tile large outlined class="mr-5" dark  depressed :loading="isLoading">
                  <v-icon>mdi-facebook</v-icon>
                  Facebook
                </v-btn>

                <v-btn color="error" tile outlined large dark depressed :loading="isLoading">
                  <v-icon>mdi-google</v-icon>
                  Google
                </v-btn>
              </v-card-text> -->
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <snack-bar v-if="successMessage" :color="'success'" :text="successMessage"></snack-bar>
    <snack-bar v-if="errorMessage" :color="'error'" :text="errorMessage"></snack-bar>
  </v-app>
</template>

<script>
  /* eslint-disable no-console */
  import { mapState } from 'vuex'
  import SnackBar from '../components/commons/SnackBar.vue'
  export default {
    components: {
      SnackBar
    },
    data () {
      return {
        show1: false,
        e1: true,
        checkbox: false,
        password: 'Password',
        form_data: {
          name: '',
          phone: '',
          email: '',
          username: '',
          password: ''
        },
      }
    },
    beforeCreate: function () {
      if (this.$session.exists()) {
        this.$router.push('/')
      }
    },
    computed: {
      ...mapState([
        'isLoading',
        'errorMessage',
        'successMessage',
        'user',
        'rules'
      ])
    },
    methods: {
      onLogin: function () {
        this.$session.start()
        this.$session.set('uid', 1)
        location.reload()
      },
      register: function () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('addClient', this.form_data)
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
