<template>
    <div>
        <v-simple-table>
            <thead>
            <tr>
                <th class="text-left">First name</th>
                <th class="text-left">Last name</th>
                <th class="text-left">Phone</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in users" :key="item.id">
                <td>{{ item.first_name }}</td>
                <td>{{ item.last_name }}</td>
                <td>{{ item.phone }}</td>
            </tr>
            </tbody>
        </v-simple-table>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'recent-clients',
    data () {
        return {
            fixedHeader: false,
        }
    },
    computed: {
        ...mapState([
            'users'
        ])
    }
}
</script>

<style scoped>

</style>