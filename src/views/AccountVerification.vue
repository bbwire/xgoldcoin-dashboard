<template>
  <v-app id="inspire"> 

    <v-container >   
      <message-alert v-if="successMessage" :type="'success'" :message="successMessage"></message-alert>
      <message-alert v-if="errorMessage" :type="'error'" :message="errorMessage"></message-alert>

      <v-overlay :value="overlay" v-if="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-container>
  </v-app>
</template>

<script>
  /* eslint-disable no-console */
  import { mapState } from 'vuex'
  import MessageAlert from '../components/commons/MessageAlert'
  export default {
    components: {
      MessageAlert
    },
    data () {
      return {
        token: null,
        overlay: true,
      }
    },
    created () {
        this.token = this.$route.params.token
        this.$store.dispatch('accountVerification', this.token)
    },
    computed: {
      ...mapState([
        'isLoading',
        'errorMessage',
        'successMessage',
      ])
    },
    methods: {
      //
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
