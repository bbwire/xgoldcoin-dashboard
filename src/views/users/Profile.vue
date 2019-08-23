<template>
  <v-container class="back-cover" fluid grid-list-md>
      <v-card flat>
        <v-toolbar
            class="elevation-0 accent--text"
            color="white"
            light
        >
            <v-btn icon>
            <v-icon color="accent">
                mdi-account
            </v-icon>
            </v-btn>

            <v-toolbar-title>{{user.first_name}} {{user.last_name}}</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn color="accent" @click.native="updateUserDummy" :disabled="isLoading">
            Save changes
            </v-btn>

            <!-- <v-progress-circular v-if="isLoading" :size="30" :width="2" indeterminate color="white"></v-progress-circular> -->

            <v-btn icon>
            <v-icon color="accent">mdi-dots-vertical</v-icon>
            </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout wrap>
            <v-flex md3>
              <v-card flat>
                <v-card-media>
                  <img :src="user.photo">
                </v-card-media>
              </v-card>
            </v-flex>
            <v-flex md9>
              <v-form ref="form" lazy-validation>
                <v-layout row wrap>
                <!--<div class="padding&#45;&#45;16">-->
                  <v-flex md6>
                      <v-text-field
                      v-model="user.first_name"
                      required
                      validate-on-blur
                      label="First name"
                      placeholder="First name"
                      :rules="[rules.required]"
                      clearable
                      class="space-bottom"
                      ></v-text-field>

                  </v-flex>

                  <v-flex md6>
                      <v-text-field
                      v-model="user.last_name"
                      required
                      validate-on-blur
                      label="Last name"
                      placeholder="Last name"
                      :rules="[rules.required]"
                      clearable
                      class="space-bottom"
                      ></v-text-field>

                  </v-flex>

                  <v-flex md6>
                      <v-autocomplete
                      :items="sex"
                      v-model="user.sex"
                      label="Sex"
                      placeholder="Sex"
                      item-text="name"
                      item-value="id"
                      :rules="[rules.required]"
                      class="space-bottom"
                      ></v-autocomplete>

                  </v-flex>

                  <v-flex md6>
                      <v-text-field
                      v-model="user.phone"
                      required
                      validate-on-blur
                      label="Phone"
                      placeholder="Phone"
                      :rules="[rules.required]"
                      clearable
                      class="space-bottom"
                      ></v-text-field>

                  </v-flex>

                  <v-flex md6>
                      <v-text-field
                      v-model="user.email"
                      required
                      validate-on-blur
                      label="Email"
                      placeholder="Email"
                      :rules="[rules.required]"
                      clearable
                      class="space-bottom"
                      ></v-text-field>

                  </v-flex>

                  <v-flex md6>
                    <v-menu
                      ref="menu"
                      :close-on-content-click="false"
                      v-model="menu"
                      :nudge-right="40"
                      :return-value.sync="user.date_of_birth"
                      lazy
                      persistent
                      transition="scale-transition"
                      full-width
                      min-width="290px"
                      >
                      <v-text-field
                          slot="activator"
                          v-model="user.date_of_birth"
                          label="Date of birth"
                          placeholder="Date of birth"
                          readonly
                          clearable
                      ></v-text-field>
                      <v-date-picker 
                        v-model="user.date_of_birth" 
                        no-title 
                        scrollable
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                      >
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(user.date_of_birth)">OK</v-btn>
                      </v-date-picker>
                      </v-menu>
                  </v-flex>

                  <v-flex md6>
                      <v-text-field
                      v-model="user.username"
                      required
                      validate-on-blur
                      label="Username"
                      placeholder="Username"
                      :rules="[rules.required]"
                      clearable
                      class="space-bottom"
                      ></v-text-field>

                  </v-flex>
                  <v-flex md4>
                      <!-- <v-text-field label="Select Image" @click='' v-model='image' prepend-icon='attach_file'></v-text-field> -->
                      <label class="bold" style="display: block;">Choose profile pic</label>
                      <input
                      type="file"
                      ref="image"
                      accept="image/*"
                      @change="handlePhotoUpload($event)"/>

                  </v-flex>
                </v-layout>
              </v-form>
              <div class="space-20"></div>
              <v-subheader>Change password </v-subheader>
              <v-form ref="passwordform" lazy-validation>
                <v-layout row>
                  <v-flex>
                    <v-text-field
                      v-model="password_data.old_password"
                      validate-on-blur
                      label="Current password"
                      placeholder="Current password"
                      :rules="[rules.required]"
                      :append-icon="show1 ? 'visibility_off' : 'visibility'"
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
                      clearable
                      class="space-bottom"
                    ></v-text-field>
                  </v-flex>

                  <v-flex>
                    <v-text-field
                      v-model="password_data.password"
                      validate-on-blur
                      label="New password"
                      placeholder="New password"
                      :rules="[rules.required]"
                      :append-icon="show2 ? 'visibility_off' : 'visibility'"
                      :type="show2 ? 'text' : 'password'"
                      @click:append="show2 = !show2"
                      clearable
                      class="space-bottom"
                    ></v-text-field>
                  </v-flex>

                  <v-flex>
                    <v-btn class="white--text" color="accent" @click.native="updatePassword" :disabled="isLoading">
                    Change password 
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    <snack-bar v-if="successMessage" :color="'success'" :text="successMessage"></snack-bar>
    <snack-bar v-if="errorMessage" :color="'error'" :text="errorMessage"></snack-bar>
  </v-container>
</template>

<script>
  /* eslint-disable */
  import { mapState } from 'vuex'
  import SnackBar from '@/components/commons/SnackBar.vue'
  export default {
    components: {
      SnackBar
    },
    data () {
      return {
        id: 0,
        show1: false,
        show2: false,
        date: null,
        menu: false,
        modal: false,
        uid: '',
        editeddata: {
          first_name: '',
          last_name: '',
          phone: '',
          email: '',
          role_id: '',
          photo: null,
          username: ''
        },
        password_data: {
          old_password: '',
          password: ''
        }
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login/')
      }
    },
    created () {
      this.id = this.$route.params.id
      this.uid = this.$session.get('uid')
    },
    computed: {
      back () {
        return this.$router.go(-1)
      },
      ...mapState([
        'isLoading',
        'errorMessage',
        'successMessage',
        'roles',
        'sex',
        'user',
        'rules'
      ])
    },
    methods: {
      updateUserDummy () {
        console.log('working...')
      },
      updateUser: function () {
        if (this.$refs.form.validate()) {
          let formData = new FormData()
          formData.append('first_name', this.user.first_name)
          formData.append('last_name', this.user.last_name)
          formData.append('email', this.user.email)
          formData.append('phone', this.user.phone)
          formData.append('date_of_birth', this.user.date_of_birth)
          formData.append('sex', this.user.sex)
          formData.append('username', this.user.username)
          this.$store.dispatch('updateUser', {id: this.uid, data: formData})
        }
      },
      updatePassword () {
        if (this.$refs.passwordform.validate()) {
          this.$store.dispatch('updatePassword', {id: this.uid, data: this.password_data})
        }
      },
      handlePhotoUpload: function (event) {
        // this.files.append('photo', this.$refs.photo.files[0])
        this.editeddata.photo = event.target.files[0]
        console.log(this.editeddata.photo)
      }
    },
    mounted: function () {

    },
    name: 'Profile'
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

.space-100 {
  margin-top: 100px !important;
}
  .space-50 {
     margin-top: 50px;
   }

.space-20 {
  margin-top: 20px;
}
</style>
