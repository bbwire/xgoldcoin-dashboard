<template>
  <div>
    <v-container>
      <v-alert :value="true" v-if="logoutMessage" v-model="alert" outline color="success" dismissible icon="check_circle" transition="scale-transition">
        {{logoutMessage}}
      </v-alert>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Logout',
    data () {
      return {
        alert: true,
        title: 'Logout',
        logoutMessage: 'Redirecting please wait...',
        successMessage: ''
      }
    },
    methods: {
      logout: function () {
        this.$session.destroy()
        this.$store.dispatch('changeMenuDisplay', false)
        this.$router.push('/login/')
        // this.checksession()
        // location.reload()
      },
      checksession: function () {
        if (!this.$session.exists()) {
          this.$router.push({name: 'Login'})
        }
      }
    },
    mounted: function () {
      this.logout()
    }
  }
</script>
