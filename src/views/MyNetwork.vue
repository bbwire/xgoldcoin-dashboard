<template>
  <v-container fluid class="back-cover" grid-list-md>
    <v-card>
      <v-toolbar
        class="elevation-0 accent--text"
        light
      >
        <v-btn icon >
          <v-icon color="accent">menu</v-icon>
        </v-btn>

        <v-toolbar-title>
          My network
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <template v-if="$vuetify.breakpoint.smAndUp">

          <!-- <v-btn color="accent" depressed @click.native="addMember">
            <v-icon>mdi-check</v-icon> Add member
          </v-btn> -->

          

          <v-btn icon small>
            <v-icon color="accent">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="text-center">
          <v-avatar size="70">
              <img :src="user.photo"/>
          </v-avatar>
          <span class="d-block subtitle-1">{{user.username}}</span>
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
          password: ''
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
          password: ''
        }
      }
    },
    // beforeCreate: function () {
    //   if (!this.$session.exists()) {
    //     this.$router.push('/login/')
    //   }
    // },
    created () {
    //   this.$store.dispatch('getCountries')
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
        'countries',
        'cities'
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
