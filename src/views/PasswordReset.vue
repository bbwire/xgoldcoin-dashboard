<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height login-background-gradient"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Reset password</v-toolbar-title>
                <div class="flex-grow-1"></div>
                
                <v-btn
                  icon
                  target="_blank"
                  v-on="on"
                >
                  <v-icon>mdi-apps</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                    <p>
                        Enter new password to reset
                    </p>
                  <v-text-field
                    label="New password"
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

                  <v-text-field
                    label="Confirm password"
                    v-model="form_data.cpassword"
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
                    <router-link to="/login">Go to login</router-link>
                </v-layout> --> 
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" @click="recovery" depressed :loading="isLoading">
                  Reset now
                </v-btn>
              </v-card-actions>
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
        form_data: {
          email: '',
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
      recovery: function () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('passwordRecovery', this.form_data)
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

  .login-background-gradient {
    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    height: 100%;
  }
</style>
