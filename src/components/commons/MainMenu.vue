<template>    
    <div>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        link
        :to="item.path"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          path: '/'
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Clients',
          path: '/clients/',
          items: [
            {
              title: 'Projects',
              path: '/client/projects'
            }
          ]
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Candidates',
          path: '/candidates/'
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Projects',
          path: '/projects/'
        },
        {
          icon: 'mdi-menu',
          title: 'Applications',
          path: '/applications/'
        },
        {
          icon: 'mdi-account',
          title: 'Users',
          path: '/users/'
        },
        {
          icon: 'mdi-settings',
          title: 'Settings',
          path: '/settings',
          items: [
            {
              icon: 'keyboard_arrow_right',
              title: 'Configurations',
              path: '/settings/configurations/'
            },
            {
              icon: 'keyboard_arrow_right',
              title: 'Roles',
              path: '/settings/roles/'
            },
            //
          ]
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Loans'
    }
  }
}
</script>

<style>

</style>
