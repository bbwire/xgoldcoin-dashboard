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
        :items="projects"
        class="elevation-0"
    >
        
    </v-data-table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'client-projects',
    data: () => ({
        headers: [
          { text: '#', sortable: true, value: 'index' },
          { text: 'Title', sortable: true, value: 'title' },
          { text: 'Contact person', sortable: true, value: 'contact_person' },
          { text: 'Email', sortable: true, value: 'email' },
          { text: 'Phone', sortable: true, value: 'phone' },
          { text: 'Deadline', sortable: true, value: 'application_end_date' },
          { text: 'Status', sortable: true, value: 'status' },
          { text: 'Action', value: 'action', sortable: false }
        ],
    }),
    created () {

    },
    computed: {
        ...mapState([
            'projects'
        ])
    }
}
</script>