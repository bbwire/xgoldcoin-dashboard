<template>
    <div>
        <h3>Company Information</h3>
        <div class="space-top-10"></div>
        <v-divider></v-divider>
        <div class="space-top-10"></div>
        <v-layout wrap>
            
            <v-flex md3>
                <label class="bold">Name: {{single_client.name}}</label>
            </v-flex>

            <v-flex md3>
                <label class="bold">Phone: {{single_client.phone}}</label>
            </v-flex>

            <v-flex md3>
                <label class="bold">Email: {{single_client.email}}</label>
            </v-flex>

            <v-flex md3>
                <label class="bold">Website url: {{single_client.website_url}}</label>
            </v-flex>
        </v-layout>

        <div class="space-top-20"></div>
        <h3>Cntact Information</h3>
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
        this.$store.dispatch('getSingleClient', this.id)
    },
    computed: {
        ...mapState([
            'single_client'
        ])
    }
}
</script>

<style scoped>

</style>