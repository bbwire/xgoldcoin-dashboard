<template>
  <div>
    <v-card-text>
        <v-spacer></v-spacer>
          <!-- <el-input placeholder="Please search" prefix-icon="el-icon-search" v-model="search"></el-input> -->
          <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              outlined
              color="accent"
          ></v-text-field>
    </v-card-text>
    <v-data-table
        :headers="headers"
        :items="applications"
        class="elevation-0"
    >
        
    </v-data-table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data: () => ({
        headers: [
          { text: '#', sortable: true, value: 'index' },
          { text: 'Candidate', sortable: true, value: 'candidate.first_name' },
          { text: 'Email', sortable: true, value: 'email' },
          { text: 'Phone', sortable: true, value: 'role.name' },
          { text: 'Username', sortable: true, value: 'username' },
          { text: 'Action', value: 'action', sortable: false }
        ],
    }),
    created () {

    },
    computed: {
        ...mapState([
            'applications'
        ])
    }
}
</script>