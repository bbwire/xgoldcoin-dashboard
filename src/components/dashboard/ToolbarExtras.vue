<template>
    <div>
      <v-progress-circular v-if="isLoading" :size="28" :width="2" indeterminate color="white"></v-progress-circular>
      <v-btn icon>
        <v-icon>people</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.name"
            @click="() => {}"
            :to="item.path"
          >
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'toolbar-extras',
  data: () => ({
    items: [
      {
          name: 'Settings',
          path: '/settings'
      },
      {
          name: 'Profile',
          path: '/profile'
      },
      {
          name: 'Logout',
          path: '/logout/'
      }
    ]
  }),
  computed: {
    ...mapState([
      'isLoading'
    ])
  }
}
</script>