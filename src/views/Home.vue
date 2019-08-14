<template>
  <div class="back-cover">
    <main-dashboad ></main-dashboad>
    <!-- <page-redirecting v-else></page-redirecting> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MainDashboad from '@/components/commons/MainDashboad'
// import PageRedirecting from '@/components/commons/PageRedirecting'
export default {
  components: {
    MainDashboad,
    // PageRedirecting
  },
  name: 'Home',
  data () {
    return {
      show_content: false
    }
  },  
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/login/')
    }
  },
  created () {
    if (!this.$session.exists()) {
      this.show_content = false
    } else {
      this.show_content = true
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

<style>

</style>
