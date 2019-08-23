<template>
    <div>
        <v-simple-table fixedHeader="true">
            <thead>
            <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Phone</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in clients" :key="item.id">
                <td>{{ item.name }}</td>
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
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ]
        }
    },
    computed: {
        ...mapState([
            'clients'
        ])
    }
}
</script>

<style scoped>

</style>