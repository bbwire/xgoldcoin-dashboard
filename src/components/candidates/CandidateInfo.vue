<template>
    <div>
        <h3>Personal Information</h3>
        <div class="space-top-10"></div>
        <v-divider></v-divider>
        <div class="space-top-10"></div>
        <v-layout wrap>
            
            <v-flex md3>
                <label class="bold">First Name: {{single_candidate.first_name}}</label>
            </v-flex>

            <v-flex md3>
                <label class="bold">Last Name: {{single_candidate.last_name}}</label>
            </v-flex>

            <v-flex md3>
                <label class="bold">Phone: {{single_candidate.phone}}</label>
            </v-flex>

            <v-flex md3>
                <label class="bold">Email: {{single_candidate.email}}</label>
            </v-flex>
        </v-layout>

        <div class="space-top-20"></div>
        <h3>Professional Information</h3>
        <div class="space-top-10"></div>
        <v-divider></v-divider>
        <div class="space-top-10"></div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data: () => ({
        id: null,
    }),
    created () {
        this.id = this.$route.params.id
        this.$store.dispatch('getSingleCandidate', this.id)
    },
    computed: {
        ...mapState([
            'single_candidate'
        ])
    }
}
</script>

<style scoped>

</style>